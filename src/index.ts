
import { configDB } from "./data/configDB";
import { createClient } from "./discord/base";
import { log } from "./settings";
import ck from "chalk";

configDB().then(() => {
    log.info(`${ck.greenBright("Banco de dados configurado")}`);

    const client = createClient();
    client.start();

    process.on("uncaughtException", log.error);
    process.on("unhandledRejection", log.error);
}).catch(error => {
    console.error("Ocorreu um erro:", error);
 });


