import { Session } from "@biscuitland/core";
import { CONSTANTS } from "@/utilities/env";
import { DefaultRestAdapter } from "@biscuitland/rest";

const token = CONSTANTS.token;
const rest = new DefaultRestAdapter({
	token,
	maxRetryCount: CONSTANTS.maxRestHitRetries,
});

export class IlviwynClient extends Session {
	constructor() {
		super({ token, rest });
	}
}
