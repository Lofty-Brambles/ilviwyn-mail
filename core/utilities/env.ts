import { catches, ConfigError } from "@/errors";
import "dotenv/config";

interface ENVTypes {
	dev: string;
	prod: string;
}

class EnvVars {
	@catches
	private getVariables(key: string) {
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

	public token = this.getVariables("BOT_TOKEN");

	public maxRestHitRetries = 5;
}

export const CONSTANTS = new EnvVars();
