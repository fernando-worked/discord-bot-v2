import { Component } from "@/discord/base";

new Component({
    customId: "btn_cancel_pontos",
    cache: "cached",
    type: "Button",
    async run(interaction) {
        interaction.reply({ephemeral: true, content: "Clicou em Cancelar"});

        // do things...
    },
});