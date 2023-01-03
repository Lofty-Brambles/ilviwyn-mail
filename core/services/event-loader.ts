import { Event, ListenRunType } from "@/models/events";
import { DynamicLoader } from "./dynamic-loader";
import { CONSTANTS } from "@/utilities/env";

import type { IlviwynClient } from "@/models/ilviwyn";
import { catches } from "@/errors/catches";

export class EventLoader extends DynamicLoader<typeof Event> {
	constructor() {
		super(CONSTANTS.eventPath);
	}

	@catches
	public async registerEvents(bot: IlviwynClient): Promise<void> {
		await this.load(true);

		for (const event of this.classCache.values()) {
			if (ListenRunType.once === event.type)
				bot.events.once(event.name, event.handle(bot));
			else if (ListenRunType.multiple === event.type)
				bot.events.on(event.name, event.handle(bot));
		}
	}
}
