import type { Command } from "@/models/commands.js";
import { DynamicLoader } from "./dynamic-loader.js";
import { CONSTANTS } from "@/utilities/env.js";

import { logger } from "@/utilities/logger.js";
import { join } from "path";

export class CommandLoader extends DynamicLoader<typeof Command> {
	constructor() {
		super(CONSTANTS.commandPath);
	}

	private _postLoadHook(): void {
		const classArray = Array.from(this.classCache.entries());
		classArray.forEach(([name, command]) => {
			if (CONSTANTS.applicationCommandRegex.test(name)) return;

			command.name = command.name.toLowerCase();
			name = name.toLowerCase();

			logger.warn(
				{ at: join(this.dirPath, command.category, command.name) },
				`The command has a name with a capital letter! It will be renames as ${command.name}.`,
			);
		});
		this.classCache = new Map(classArray);
	}

	public override async load(ignoreCache?: boolean): Promise<void> {
		await super.load(ignoreCache);
		logger.info("All the commands were successfully loaded!");
		this._postLoadHook();
	}
}
