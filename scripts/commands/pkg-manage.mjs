import { stat } from "node:fs/promises";
import { exec } from "node:child_process";

export default async function pkg(action, scope, ...rest) {
	try {
		await stat(scope);
	} catch {
		console.log("❌ | The route does not exist.");
		return;
	}

	const process = exec(
		`cd ${scope} && pnpm ${action} ${rest.join(" ")} && cd ${Array.from(
			{
				length: scope.split("/").length,
			},
			(_) => "..",
		).join("/")}`,
	);
	process.stdout.on("data", (data) => console.log(data.replace(/\.{2}\s+/g, "• ")));
	process.stdout.on("end", () => {
		console.log("✅ | The packages are installed/removed!");
	});
}
