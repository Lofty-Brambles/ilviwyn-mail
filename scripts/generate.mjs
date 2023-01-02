import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { getRoot, getTemplateFile } from "./utils/get-template.mjs";
import { customReplacer } from "./utils/custom-replace.mjs";

const parser = () => {
	const [cmd, ...rest] = process.argv.slice(2);
	return { cmd, rest };
};

const generateCommand = ({ category, name }) => {
	if (category === undefined || name === undefined)
		throw new Error(
			"The command has to be of the following format:\n » pnpm gen command [category] [command name]",
		);

	const COMMAND_TEMP_NAME = "command.ts.dat";
	const getCmdTemplate = getTemplateFile(COMMAND_TEMP_NAME);

	if (getCmdTemplate === undefined)
		throw new Error("Oh no... The command template doesn't exist!");

	const route = join(getRoot(), "core", "commands", category);
	const replacement = { "#{COMMAND}": `${name}` };

	if (!existsSync(route)) mkdirSync(route);

	const replacedData = customReplacer(getCmdTemplate.data, replacement);
	writeFileSync(join(route, `${name}.ts`), replacedData);
};

const generateEvent = ({ name }) => {
	if (name === undefined)
		throw new Error(
			"The command has to be of the following format:\n » pnpm gen event [event name]",
		);

	const EVENT_TEMP_NAME = "event.ts.dat";
	const getEventTemplate = getTemplateFile(EVENT_TEMP_NAME);

	if (getEventTemplate === undefined)
		throw new Error("Oh no... The event template doesn't exist!");

	const route = join(getRoot(), "core", "events", `${name}.ts`);
	const replacement = { "#{EVENT}": `${name}` };

	const replacedData = customReplacer(getEventTemplate.data, replacement);
	writeFileSync(route, replacedData);
};

const manager = ({ cmd, rest }) => {
	if (/(cmd|command)/i.test(cmd)) {
		const category = rest.shift();
		const name = rest.shift();
		generateCommand({ category, name });
		return;
	}

	if (/(e|event)/i.test(cmd)) {
		const name = rest.shift();
		generateEvent({ name });
		return;
	}

	throw new Error(
		"The command has to be of the following format:\n » pnpm gen [command] [category] [name]",
	);
};

try {
	manager(parser());
} catch (e) {
	console.log(e);
}
