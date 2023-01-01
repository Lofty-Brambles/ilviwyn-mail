import { logger } from "@/utilities/logger";

import { TypedError } from "./customs/typed-error";

export const catches = (target: any, _: string, desc: any): void => {
	const method = desc.value;

	desc.value = (...args: any) => {
		try {
			return method.apply(target, args);
		} catch (e) {
			if (e instanceof TypedError) {
				logger.error(e, e.type);
				return;
			}
			logger.error(e);
		}
	};
};
