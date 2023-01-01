export abstract class TypedError extends Error {
	public abstract type: string;
	constructor(message: string) {
		super(message);
	}
}
