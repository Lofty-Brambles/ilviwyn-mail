import { Session } from "@biscuitland/core";
import { CORE_INFO } from "@/config";

class Ilviwyn extends Session {
	constructor() {
		super({ token: CORE_INFO.current().token });
	}
}

export const ilviwyn = new Ilviwyn();
