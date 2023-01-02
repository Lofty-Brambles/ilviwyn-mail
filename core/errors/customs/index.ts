import { TypedError } from "./typed-error";

export class ConfigError extends TypedError {
	public type = "ConfigError";
	constructor(message: string) {
		super(message);
	}
}

export class LoaderError extends TypedError {
	public type = "LoaderError";
	constructor(message: string) {
		super(message);
	}
}

export class NotFoundError extends TypedError {
	public type = "NotFoundError";
	constructor(message: string) {
		super(message);
	}
}
