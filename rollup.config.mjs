import glob from "fast-glob";
import { extname as ext, relative } from "path";
import { fileURLToPath } from "url";

import { swc } from "rollup-plugin-swc3";

export default {
	input: Object.fromEntries(
		glob
			.sync("core/*")
			.map((path) => [
				relative("core", path.slice(0, path.length - ext(path).length)),
				fileURLToPath(new URL(path, import.meta.url)),
			]),
	),
	output: {
		dir: "dist",
		banner: `/*
	=-=-=-= Ilviwyn-mail: Yet another modmail =-=-=-=
*/`,
		plugins: [swc()],
	},
};
