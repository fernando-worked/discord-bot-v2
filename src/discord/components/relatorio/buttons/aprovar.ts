import { UserDataDb } from "@/data/getUserData";
import { RoleRow, getAllRoles } from "@/data/getAllRoles";
import { Component } from "@/discord/base";
import { atualizarRelatorio } from "@/functions/relatorio/atualizar";
import { EmbedBuilder } from "discord.js";
import { aprovarRelatorio } from "@/functions/relatorio/aprovarRelatorio";


new Component({
    customId: "btn_aprovar_relatorio",
    type: "Button", cache: "cached",
    async run(interaction) {

        aprovarRelatorio(interaction);

    }, 
});