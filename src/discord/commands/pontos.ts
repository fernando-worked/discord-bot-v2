import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ComponentType, UserSelectMenuBuilder } from "discord.js";
import { Command } from "../base";

new Command({
    name: "pontos", dmPermission,
    description: "Sistema de pontuação do servidor",
    type: ApplicationCommandType.ChatInput,
    options:[
        {
            name: "menu",
            description: "Menu interativo para adicionar pontos",
            type: ApplicationCommandOptionType.Subcommand,
        }
    ],
    async run(interaction){
        const { options } = interaction;

        switch(options.getSubcommand()){
        case "menu":
            const buttonEnviar = new ButtonBuilder({
                customId: "btn_submit_pontos",
                label: "Enviar",
                emoji: "✅",
                style: ButtonStyle.Primary
            });

            const buttonCancelar = new ButtonBuilder({
                customId: "btn_cancel_pontos",
                label: "Cancelar",
                emoji: "❌",
                style: ButtonStyle.Primary,
            });

            const rowBtn = new ActionRowBuilder<ButtonBuilder>({components: [buttonEnviar, buttonCancelar]});

            const respSlc = new UserSelectMenuBuilder({
                customId: "slc_responsavel",
                minValues: 1,
                maxValues: 1,
                type: ComponentType.UserSelect,
                placeholder: "Selecione o usuário responsável",
            });

            const rowResponsavelSlc = new ActionRowBuilder<UserSelectMenuBuilder>({
                components: [respSlc],
            });

            const usersSlc = new UserSelectMenuBuilder({
                customId: "slc_membros",
                minValues: 1,
                maxValues: 10,
                type: ComponentType.UserSelect,
                placeholder: "Selecione os usuários para aplicar a pontuação",
            });

            const rowMembrosSlc = new ActionRowBuilder<UserSelectMenuBuilder>({
                components: [usersSlc],
            });

            interaction.reply({
                ephemeral: true,
                content: "Preencha para adicionar pontos",
                components:[rowResponsavelSlc, rowMembrosSlc, rowBtn] 
            });
            break;
        }
    },
    
    
});