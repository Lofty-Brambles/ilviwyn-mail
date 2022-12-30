import {
	GUILD_APPLICATION_COMMANDS,
	type DiscordApplicationCommand,
} from "@biscuitland/api-types";
import { Session, type UpsertDataApplicationCommands } from "@biscuitland/core";
import { CONSTANTS } from "@/utilities/env";
import { DefaultRestAdapter } from "@biscuitland/rest";
import { catches } from "@/errors";

const token = CONSTANTS.token;
const rest = new DefaultRestAdapter({
	token,
	maxRetryCount: CONSTANTS.maxRestHitRetries,
});

export class IlviwynClient extends Session {
	constructor() {
		super({ token, rest });
	}

	@catches
	public upsertApplicationCommandsOnGuild(
		options: UpsertDataApplicationCommands[],
	): Promise<DiscordApplicationCommand[]> {
		const route = GUILD_APPLICATION_COMMANDS(
			this.applicationId,
			CONSTANTS.baseGuildId,
		);

		const dataToBeSent = (o: UpsertDataApplicationCommands) => {
			if (!this.isContextApplicationCommand(o)) return o;
			return {
				name: o.name,
				type: o.type,
			};
		};

		return this.rest.put<DiscordApplicationCommand[]>(
			route,
			options.map((o) => dataToBeSent(o)),
		);
	}
}
