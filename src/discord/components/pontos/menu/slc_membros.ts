import { Component } from "@/discord/base";

new Component({
    customId: "slc_membros",
    cache: "cached",
    type: "UserSelect",
    async run(interaction) {
        interaction.reply({ephemeral: true, content: "Membros selecionados!"});

        // do things...
    },
});