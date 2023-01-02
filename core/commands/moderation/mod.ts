import {
	ApplicationCommandOptionTypes,
	BitwisePermissionFlags,
	DiscordApplicationCommandOption,
} from "@biscuitland/api-types";
import type { CommandInteraction } from "@biscuitland/core";
import type { IlviwynClient } from "@/models/ilviwyn.js";
import { Command } from "@/models/commands.js";

export default class mod extends Command {
	public name = "mod";
	public description = "Opens up a moderation panel for someone";

	public UserPermissions = BitwisePermissionFlags.MODERATE_MEMBERS;

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

	public interaction(
		bot: IlviwynClient,
		int: CommandInteraction,
	): void | Promise<void> {
		console.log(bot, int); // test
	}
}
