import {
	ApplicationCommandOptionTypes,
	BitwisePermissionFlags,
	DiscordApplicationCommandOption,
} from "@biscuitland/api-types";
import type { CommandInteraction } from "@biscuitland/core";
import type { IlviwynClient } from "@/models/ilviwyn";
import { Command } from "@/models/commands";

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

	public interaction(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		bot: IlviwynClient,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		int: CommandInteraction,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
	): void | Promise<void> {}
}
