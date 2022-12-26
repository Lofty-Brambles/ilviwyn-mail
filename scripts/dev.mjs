#!/usr/bin/env node

import { fork } from "child_process";
import ch from "chokidar";

const WATCH_DIR = "dist/";
const RUN_FILE = "./dist/lib/main.js";

const RESTARTS_PER_DAY = 1_000;
/* An estimated time of development per day.
   Doesn't need to be accurate, just an estimate as a cooldown. Too frequent reloads can hit ratelimits on your token.
   In case you do hit ratelimits, you can regenerate your dev bot token and restart dev mode.

   This calculates the bot rebuild/restart timer - by default, it restarts every half-a-minute.
*/
DEV_AVERAGE_TIME = 8; // hours

let onCooldown = false;

const watchman = ch.watch(WATCH_DIR);

let chProcess = fork(RUN_FILE);
watchman.on("all", () => {
	if (onCooldown) return;

	chProcess.kill();
	chProcess = fork(RUN_FILE);

	onCooldown = true;

	setTimeout(() => {
		onCooldown = false;
	}, Math.floor((DEV_AVERAGE_TIME * 3_600_000) / RESTARTS_PER_DAY));
});
