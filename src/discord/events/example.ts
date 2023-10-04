import { teste } from "@/data/teste";
import { log } from "@/settings";
import { Event } from "@discord/base";
import { sleep } from "@magicyan/discord";
import ck from "chalk";
import { Client } from "discord.js";

export let cliente: Client<true>;

new Event({
    name: "ready", once: true, 
    async run(client) {

        cliente = client;

        await sleep(2000);
        log.success(ck.green("Everything is working correctly!"));
        teste("fernando123");


    },
});