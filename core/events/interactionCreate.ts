import type {
	CommandInteraction,
	Events,
	Interaction,
} from "@biscuitland/core";
import { Event, ListenRunType } from "@/models/events";
import type { IlviwynClient } from "@/models/ilviwyn";

export default class interactionCreate extends Event {
	public name: keyof Events = "interactionCreate";
	public description = "Loading of slash commands";
	public type: ListenRunType = ListenRunType.multiple;

	private async _cmd(
		bot: IlviwynClient,
		int: CommandInteraction,
	): Promise<void> {
		const cmd = await bot.commandLoader.get(int.commandName);
		await cmd.interaction(bot, int);
	}

	public handle = (bot: IlviwynClient): Events[keyof Events] => {
		return async (int: Interaction) => {
			if (int.isCommand()) await this._cmd(bot, int);
		};
	};
}
