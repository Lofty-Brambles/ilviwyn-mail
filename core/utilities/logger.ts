import pino from "pino";

export const logger = pino(
	{},
	pino.destination({
		dest: "logs/root.log",
	}),
);
