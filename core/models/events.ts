import type { Events } from "@biscuitland/core";
import type { IlviwynClient } from "./ilviwyn";

export enum ListenRunType {
	once = "once",
	multiple = "on",
}

type Handlers = Events[keyof Events];

interface EventType {
	name: keyof Events;
	description: string;
	type: ListenRunType;

	handle: (bot: IlviwynClient) => Handlers;
}

export abstract class Event implements EventType {
	public abstract name: keyof Events;
	public abstract description: string;
	public abstract type: ListenRunType;

	public abstract handle: (bot: IlviwynClient) => Handlers;
}
