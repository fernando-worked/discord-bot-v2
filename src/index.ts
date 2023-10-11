import { sleep } from "@magicyan/discord";
import { configDB } from "./data/teste";
import { createClient } from "./discord/base";
import { log } from "./settings";

const preConfig = async () =>{
    await configDB();
    sleep(20000);
};

preConfig();

const client = createClient();
client.start();

process.on("uncaughtException", log.error);
process.on("unhandledRejection", log.error);
