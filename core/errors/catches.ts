import { logger } from "@/utilities/logger";

import { ConfigError } from "./index";

export const catches = (target: any, _: string, desc: any) => {
	const method = desc.value;

	desc.value = (...args: any) => {
		try {
			return method.apply(target, args);
		} catch (e) {
			if (e instanceof ConfigError) logger.error(e.message, e);
		}
	};
};
