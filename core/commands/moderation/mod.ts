import {
	ApplicationCommandOptionTypes,
	BitwisePermissionFlags,
	DiscordApplicationCommandOption,
} from "@biscuitland/api-types";
import type {
	CommandInteraction,
	InteractionApplicationCommandCallbackData as ReturnData,
} from "@biscuitland/core";
import type { IlviwynClient as Client } from "@/models/ilviwyn.js";
import { Command } from "@/models/commands.js";
import { catches } from "@/errors/index.js";

export default class mod extends Command {
	public name = "mod";
	public description = "Opens up a moderation panel for someone";

	public userPermissions = BitwisePermissionFlags.MODERATE_MEMBERS;

	public options: DiscordApplicationCommandOption[] = [
		{
			type: ApplicationCommandOptionTypes.User,
			name: "user",
			description: "the user to moderate",
			required: true,
		},
		{
			type: ApplicationCommandOptionTypes.String,
			name: "reason",
			description: "the reason to moderate the user",
			autocomplete: true,
		},
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	private _response(bot: Client, int: CommandInteraction): ReturnData {
		return {
			embeds: [
				{
					title: "Moderation Menu",
				},
			],
		};
	}

	@catches
	public async interaction(
		bot: Client,
		int: CommandInteraction,
	): Promise<void> {
		int.respondWith(this._response(bot, int));
	}
}
