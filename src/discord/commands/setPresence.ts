import { settings } from "@/settings";
import { brBuilder, createEmbedAuthor, hexToRgb } from "@magicyan/discord";
import { ActivityType, ApplicationCommandType, EmbedBuilder, hyperlink } from "discord.js";
import { Command } from "../base";

new Command({
    name: "presence", dmPermission,
    description: "Example command",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const { user } = interaction.client;

        user.setPresence({activities: [{name: "Ready or Not", type: ActivityType.Playing}], status:"online",});

        interaction.reply({ephemeral: true, content: "Status alterado!"});
    },
});