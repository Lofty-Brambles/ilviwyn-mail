import { readdir } from "fs/promises";

console.log(await readdir("./core"));
