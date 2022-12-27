import chalk from "chalk";

const { cyan, grey, yellow, red, green: gre, magenta: mag } = chalk;

export class Logger {
	private getTime() {
		const t = new Date();
		const pad = (num: number) => `${num}`.padStart(2, "0");
		return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(
			t.getDate(),
		)} ${pad(t.getHours())}-${pad(t.getMinutes())}-${pad(t.getSeconds())}`;
	}
	private fmtMessage(message: string) {
		return message.indexOf("\n") === -1
			? message
			: `\n${message.split("\n").join("\n    ")}`;
	}

	public log(message: string) {
		const msg = this.fmtMessage(message);
		console.log(`${cyan(`[${this.getTime()} ${grey("LOG")}]`)} ${msg}`);
	}
	public warn(message: string) {
		const msg = this.fmtMessage(message);
		console.log(`${cyan(`[${this.getTime()} ${yellow("WARN")}]`)} ${msg}`);
	}
	public error(message: string) {
		const msg = this.fmtMessage(message);
		console.log(`${cyan(`[${this.getTime()} ${red("ERROR")}]`)} ${msg}`);
	}
	public success(message: string) {
		const msg = this.fmtMessage(message);
		console.log(`${cyan(`[${this.getTime()} ${gre("SUCCESS")}]`)} ${msg}`);
	}
	public debug(message: string) {
		const msg = this.fmtMessage(message);
		console.log(`${cyan(`[${this.getTime()} ${mag("DEBUG")}]`)} ${msg}`);
	}
}

export const logger = new Logger();
