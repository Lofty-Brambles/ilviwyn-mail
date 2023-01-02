import type { Events } from "@biscuitland/core";

export enum ListenRunType {
	once = "once",
	multiple = "on",
}

export abstract class Event {
	public abstract name: keyof Events;
	public abstract description: string;
	public abstract type: ListenRunType;

	public abstract handle: Events[keyof Events];
}
