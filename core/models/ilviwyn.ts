import {
	GatewayIntents,
	GUILD_APPLICATION_COMMANDS,
	type DiscordApplicationCommand,
} from "@biscuitland/api-types";
import { Session, type UpsertDataApplicationCommands } from "@biscuitland/core";
import { DefaultRestAdapter } from "@biscuitland/rest";
import { CONSTANTS } from "@/utilities/env";
import { logger } from "@/utilities/logger.js";

import { CommandLoader } from "@/services/command-loader.js";
import { EventLoader } from "@/services/event-loader.js";

const token = CONSTANTS.token;
const rest = new DefaultRestAdapter({
	token,
	maxRetryCount: CONSTANTS.maxRestHitRetries,
});

const intents = GatewayIntents.Guilds | GatewayIntents.GuildBans;

export class IlviwynClient extends Session {
	public isConnected = false;
	private _commandLoader = new CommandLoader();
	private _eventLoader = new EventLoader();

	constructor() {
		super({ token, rest, intents });
	}

	private async _load(): Promise<void> {
		this._commandLoader.load(true);

		this._eventLoader.registerEvents(this);
	}

	override async start(): Promise<void> {
		if (this.isConnected) return;

		await this._load();

		logger.info("--- Booting up! 🚀 ---");
		super.start();
	}

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
