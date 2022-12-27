#!/usr/bin/env node

const run = async () => {
	const [cmd, ...args] = process.argv.slice(2);

	if (/(i(nstall)?|rm|remove)/.test(cmd)) {
		const { default: pkg } = await import("./commands/pkg-manage.mjs");
		await pkg(cmd, ...args);
	}
};

run();
