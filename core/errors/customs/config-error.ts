export class ConfigError extends Error {
	public type = "ConfigError";
	constructor(message: string) {
		super(message);
	}
}
