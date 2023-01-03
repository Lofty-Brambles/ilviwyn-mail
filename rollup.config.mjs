import glob from "fast-glob";
import { extname as ext, relative } from "path";
import { fileURLToPath } from "url";

import { swc, defineRollupSwcOption } from "rollup-plugin-swc3";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
	external: [/node_modules/],
	input: Object.fromEntries(
		glob
			.sync("core/**/*")
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
	},
	plugins: [
		nodeResolve(),
		swc(
			defineRollupSwcOption({
				minify: true,
				module: { type: "es6", strictMode: true },
			}),
		),
	],
};
