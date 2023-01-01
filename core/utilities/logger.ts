import { pino } from "pino";
import prettifier from "pino-pretty";

export const logger = pino(
	{ prettifier },
	pino.destination({
		dest: "logs/root.log",
	}),
);
