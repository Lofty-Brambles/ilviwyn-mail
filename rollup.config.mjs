import glob from "fast-glob";
import path from "path";
import { fileURLToPath } from "url";

import { swc } from "rollup-plugin-swc3";

export default [
	{
		input: Object.fromEntries(
			glob
				.sync("plugins/**/{index,main}.{js,ts}", {
					ignore: ["plugins/example"],
					deep: 2,
				})
				.map((route) => [
					route.slice(0, route.length - path.extname(route).length),
					fileURLToPath(new URL(route, import.meta.url)),
				]),
		),
		output: {
			dir: "dist",
			plugins: [swc()],
		},
	},
	{
		input: {
			"core/main": fileURLToPath(
				new URL("core/main.ts"),
				import.meta.url,
			),
		},
		output: {
			dir: "dist",
			banner: `/*
	=-=-=-= Ilviwyn-mail: Yet another modmail =-=-=-=
*/`,
			plugins: [swc()],
		},
	},
];
