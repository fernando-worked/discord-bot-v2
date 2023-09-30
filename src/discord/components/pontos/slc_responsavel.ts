import { Component } from "@/discord/base";

new Component({
    customId: "slc_responsavel",
    cache: "cached",
    type: "UserSelect",
    async run(interaction) {
        interaction.reply({ephemeral: true, content: "Responsável selecionado!"});

        // do things...
    },
});