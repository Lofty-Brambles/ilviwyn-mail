import { config } from "dotenv";

config();

interface CoreInfo {
	token: string;
}

export const CORE_INFO = {
	prod: { token: process.env.PROD_BOT_TOKEN },
	dev: { token: process.env.DEV_BOT_TOKEN },
	current() {
		const info = process.env.DEV ? this.dev : this.prod;

		let undefinedKeys = "";
		Object.entries(info).map(([prop, val]) => {
			if (val === undefined) undefinedKeys += `${prop}, `;
		});

		if (undefinedKeys !== "")
			throw new Error(
				`These details aren't provided: ${undefinedKeys.slice(0, -2)}`,
			);

		return info as CoreInfo;
	},
};
