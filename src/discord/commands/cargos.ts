import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, InteractionResponse, ModalBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { Command } from "../base";

export let interacaoPontos: Promise<InteractionResponse<true>>;

new Command({
    name: "cargos", dmPermission,
    description: "Sistema de pontuação do servidor",
    type: ApplicationCommandType.ChatInput,
    options:[
        {
            name: "set",
            description: "Menu interativo para adicionar pontos",
            type: ApplicationCommandOptionType.Subcommand,
        }
    ],
    async run(interaction){

        if(interaction.user.id != interaction.guild.ownerId) return interaction.reply({
            ephemeral: false,
            content: "Você está fuçando onde não deveria...",
        });

        const { options } = interaction;

        switch(options.getSubcommand()){
        case "set":

            break;
        }
    },
    
    
});

