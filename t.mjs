import glob from "fast-glob";
import path from "path";
import { fileURLToPath } from "url";

console.log(
	glob
		.sync("plugins/**/{index,main}.{js,ts}", {
			ignore: ["plugins/example"],
			deep: 2,
		})
		.map((route) => [
			route.slice(0, route.length - path.extname(route).length),
			fileURLToPath(new URL(route, import.meta.url)),
		]),
);
