import type {
	DiscordApplicationCommandOption,
	Localization,
} from "@biscuitland/api-types";
import type {
	CommandInteraction,
	CreateApplicationCommand,
	PermissionResolvable,
} from "@biscuitland/core";
import type { IlviwynClient } from "@/models/ilviwyn";

export abstract class Command {
	public abstract name: string;
	public abstract description: string;

	constructor(public category: string) {}

	public enabled = true;
	protected dmEnabled = false;

	public nameLocalizations?: Localization;
	public descriptionLocalizations?: Localization;
	public usage?: string;
	public cooldown?: number;

	protected ownerOnly = false;
	protected managerOnly = false;
	public abstract UserPermissions: PermissionResolvable;

	public options?: DiscordApplicationCommandOption[];
	public abstract interaction(
		bot: IlviwynClient,
		int: CommandInteraction,
	): void | Promise<void>;

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
			...(this.UserPermissions && {
				default_member_permissions: this.UserPermissions,
			}),
		};
	}
}
