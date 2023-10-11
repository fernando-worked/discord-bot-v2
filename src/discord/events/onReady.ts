import { registerVerify } from "@/functions/verificaCargos";
import { log } from "@/settings";
import { Event } from "@discord/base";
import { sleep } from "@magicyan/discord";
import ck from "chalk";
import { Client } from "discord.js";
export let meuBot: Client<true>;

new Event({
    name: "ready", once: true, 
    async run(client) {
        await sleep(2000);
        log.success(ck.green("Everything is working correctly!"));

        meuBot = client;

        registerVerify();

    },
});