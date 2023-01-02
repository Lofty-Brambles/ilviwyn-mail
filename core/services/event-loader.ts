import { Event, ListenRunType } from "@/models/events.js";
import { DynamicLoader } from "./dynamic-loader.js";
import { CONSTANTS } from "@/utilities/env.js";

import type { IlviwynClient } from "@/models/ilviwyn.js";
import { catches } from "@/errors/catches.js";

export class EventLoader extends DynamicLoader<typeof Event> {
	constructor() {
		super(CONSTANTS.eventPath);
	}

	@catches
	public async registerEvents(bot: IlviwynClient): Promise<void> {
		await this.load(true);

		for (const event of this.classCache.values()) {
			if (ListenRunType.once === event.type)
				bot.events.once(event.name, event.handle);
			else if (ListenRunType.multiple === event.type)
				bot.events.on(event.name, event.handle);
		}
	}
}
