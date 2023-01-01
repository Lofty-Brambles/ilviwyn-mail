import { existsSync } from "fs";
import { lstat, readdir } from "fs/promises";

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { catches, LoaderError, NotFoundError } from "@/errors";
import { logger } from "@/utilities/logger.js";

type Newable = abstract new (...args: never[]) => unknown;

type LoadedClass<T extends Newable> = InstanceType<T>;

type fetchProps = {
	name: string;
	dir?: string;
};

export class DynamicLoader<T extends Newable> {
	public dirPath: string;
	public classCache: LoadedClass<T>[] = [];

	constructor(aliasedPath: string) {
		const __dirname = dirname(fileURLToPath(import.meta.url));
		const gotPath = aliasedPath.slice(2);
		this.dirPath = join(__dirname, "..", gotPath);
	}

	@catches
	private async _fetcher({ name, dir }: fetchProps): Promise<LoadedClass<T>> {
		const path = dir
			? `file://${this.dirPath}/${dir}/${name}`
			: `file://${this.dirPath}/${name}`;

		const file = new (await import(path))();
		const instance = (
			dir ? file.default(dir) : file.default()
		) as LoadedClass<T>;

		logger.info(`Handler was loaded successfully from ${path}`);
		return instance;
	}

	@catches
	private async _handleDirs(path: string): Promise<[string[], fetchProps[]]> {
		const nested = await readdir(path);
		const dirs: string[] = [];
		const classes: fetchProps[] = [];

		const isDir = async (path: string) => (await lstat(path)).isDirectory();

		const handleNested = async (member: string) => {
			if (await isDir(join(path, member))) dirs.push(member);
			if (member.endsWith(".js")) classes.push({ name: member });
		};

		await Promise.all(nested.map(handleNested));

		return [dirs, classes];
	}

	@catches
	private async _importClasses(): Promise<LoadedClass<T>[]> {
		if (!existsSync(this.dirPath))
			throw new LoaderError(
				"The provided path for loading, does not exist.",
			);

		const handleNestedFetch = async (dir: string) => {
			const path = join(this.dirPath, dir);
			const [, classes] = await this._handleDirs(path);
			return classes.map((p): fetchProps => ({ ...p, dir }));
		};

		let [dirs, classes] = await this._handleDirs(this.dirPath);

		if (dirs.length !== 0)
			classes = (await Promise.all(dirs.map(handleNestedFetch))).flat();

		return Promise.all(classes.map(this._fetcher));
	}

	public async load(ignoreCache?: boolean): Promise<LoadedClass<T>[]> {
		const skip = ignoreCache ?? false;

		if (skip && this.classCache.length === 0)
			this.classCache = await this._importClasses();
		return this.classCache;
	}

	@catches
	public async get(name: string) {
		const file = this.classCache.find((n) => n.name === name)?.file;

		if (file === undefined)
			throw new NotFoundError("The provided class does not exist!");
		return file;
	}
}
