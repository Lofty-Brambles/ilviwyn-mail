import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const getRoot = () => {
	let dir = dirname(fileURLToPath(import.meta.url));
	while (!existsSync(join(dir, "package.json"))) dir = dirname(dir);
	return dir;
};

export const getTemplateFile = (name) => {
	const route = join(getRoot(), "scripts", "templates", name);
	return existsSync(route)
		? { data: readFileSync(route, "utf-8"), path: route }
		: undefined;
};
