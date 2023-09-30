import { Component } from "@/discord/base";

new Component({
    customId: "btn_submit_pontos",
    cache: "cached",
    type: "Button",
    async run(interaction) {
        interaction.reply({ephemeral: true, content: "Clicou no Submit"});

        // do things...
    },
});