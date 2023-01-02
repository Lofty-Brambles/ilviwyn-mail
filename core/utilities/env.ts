import { catches, ConfigError } from "@/errors";
import "dotenv/config";

interface ENVTypes {
	dev: string;
	prod: string;
}

class EnvVars {
	@catches
	private _getVariables(key: string): string {
		const env = process.env.DEV ? "development" : "production";
		const gottenKey =
			env === "development"
				? process.env[`DEV_${key}`]
				: process.env[`PROD_${key}`];

		if (gottenKey === undefined)
			throw new ConfigError(
				`${key} is not defined for ${env} environment. Please add it to the .env file to continue`,
			);

		return gottenKey;
	}

	private _getOptVariables(key: string): string | undefined {
		return process.env.key;
	}

	public token = this._getVariables("BOT_TOKEN");
	public baseGuildId = this._getVariables("BASE_GUILD_ID");

	public maxRestHitRetries = 5;
	public applicationCommandRegex =
		/^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/;

	public commandPath = this._getOptVariables("COMMANDS_DIR") ?? "@/commands";
	public eventPath = this._getOptVariables("EVENTS_DIR") ?? "@/events";
}

export const CONSTANTS = new EnvVars();
