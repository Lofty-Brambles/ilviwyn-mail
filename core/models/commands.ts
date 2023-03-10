import type {
	DiscordApplicationCommandOption,
	Localization,
} from "@biscuitland/api-types";
import type {
	CommandInteraction,
	CreateApplicationCommand,
	PermissionResolvable,
} from "@biscuitland/core";
import type { IlviwynClient } from "@/models/ilviwyn.js";
import { catches } from "@/errors/index.js";

interface CommandType {
	name: string;
	description: string;
	category: string;

	enabled: boolean;
	dmEnabled: boolean;

	nameLocalizations?: Localization;
	descriptionLocalizations?: Localization;
	usage?: string;
	cooldown?: number;

	ownerOnly: boolean;
	managerOnly: boolean;
	userPermissions: PermissionResolvable;
	options?: DiscordApplicationCommandOption[];

	interaction(
		bot: IlviwynClient,
		int: CommandInteraction,
	): void | Promise<void>;
	getSlashOptions(): CreateApplicationCommand;
}

export abstract class Command implements CommandType {
	public abstract name: string;
	public abstract description: string;

	constructor(public category: string) {}

	public enabled = true;
	public dmEnabled = false;

	public nameLocalizations?: Localization;
	public descriptionLocalizations?: Localization;
	public usage?: string;
	public cooldown?: number;

	public ownerOnly = false;
	public managerOnly = false;
	public abstract userPermissions: PermissionResolvable;

	public options?: DiscordApplicationCommandOption[];
	public abstract interaction(
		bot: IlviwynClient,
		int: CommandInteraction,
	): void | Promise<void>;

	@catches
	public getSlashOptions(): CreateApplicationCommand {
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
			...(this.userPermissions && {
				default_member_permissions: this.userPermissions,
			}),
		};
	}
}
