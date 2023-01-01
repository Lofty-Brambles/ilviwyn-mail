import type {
	BitwisePermissionFlags,
	DiscordApplicationCommandOption,
	GatewayIntents,
	Localization,
} from "@biscuitland/api-types";
import type {
	CommandInteraction,
	CreateApplicationCommand,
} from "@biscuitland/core";
import type { IlviwynClient } from "@/models/ilviwyn";

export abstract class Command {
	public abstract name: string;
	public abstract description: string;

	constructor(public category: string) {}

	public enabled = true;
	protected dmEnabled = false;

	public abstract nameLocalizations?: Localization;
	public abstract descriptionLocalizations?: Localization;
	public abstract usage?: string;
	public abstract cooldown?: number;

	protected ownerOnly = false;
	protected managerOnly = false;
	public abstract UserPermissions: (keyof typeof BitwisePermissionFlags)[];
	public abstract BotIntents: (keyof typeof GatewayIntents)[];

	public abstract options?: DiscordApplicationCommandOption[];
	public abstract interaction: (
		int: CommandInteraction,
		bot: IlviwynClient,
	) => void | Promise<void>;

	public getSlashRegistryOptions(): CreateApplicationCommand {
		return {
			name: this.name,
			description: this.description,
			dm_permission: this.dmEnabled,
			...(this.options && { options: this.options }),
			...(this.nameLocalizations && {
				name_localizations: this.nameLocalizations,
			}),
			...(this.descriptionLocalizations && {
				description_localizations: this.descriptionLocalizations,
			}),
		};
	}
}
