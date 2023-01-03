import { APPLICATION_COMMANDS } from "@biscuitland/api-types";
import { IlviwynClient } from "@/models/ilviwyn.js";
import { CONSTANTS } from "@/utilities/env.js";
import { logger } from "@/utilities/logger.js";

const basicIlviwyn = new IlviwynClient();
await basicIlviwyn.basicStart();
const cmdsIterable = basicIlviwyn.commandLoader.classCache.values();
const slashCommands = Array.from(cmdsIterable).map((c) => c.getSlashOptions());

const route = APPLICATION_COMMANDS(CONSTANTS.token);

try {
	logger.info(`Starting to deploy ${slashCommands.length} commands.`);
	await basicIlviwyn.rest.put(route, slashCommands);
	logger.info(
		slashCommands,
		`Successfully deployed all ${slashCommands.length} commands.`,
	);
} catch (e) {
	logger.error(e, "An error occured during the deployment of the commands.");
}
