import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, InteractionResponse, ModalBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { Command } from "../base";

export let interacaoPontos: Promise<InteractionResponse<true>>;

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

        if(interaction.user.id != interaction.guild.ownerId) return interaction.reply({
            ephemeral: false,
            content: "Você está fuçando onde não deveria...",
        });

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
                maxValues: 20,
                type: ComponentType.UserSelect,
                placeholder: "Selecione os usuários para aplicar a pontuação",
            });

            const rowMembrosSlc = new ActionRowBuilder<UserSelectMenuBuilder>({
                components: [usersSlc],
            });

            const tipoSlc = new StringSelectMenuBuilder({
                customId: "slc_tipo",
                minValues: 1,
                maxValues: 1,
                type: ComponentType.StringSelect,
                options: [{
                    label:"Treinamento CQB",
                    value:"CQB",
                    description:"Qualifica os membros listados como CQB",
                },
                {
                    label:"Missão oficial",
                    value:"MOF",
                    description:"Usado apenas nas missões oficiais do servidor",
                },
                {
                    label:"Missão não oficial",
                    value:"MNF",
                    description:"Pode ser usado para demais missões de players",
                }],
                placeholder: "Selecione o tipo da operação",
            });

            const rowtiposSlc = new ActionRowBuilder<StringSelectMenuBuilder>({
                components: [tipoSlc],
            });

            const tagsSlc = new StringSelectMenuBuilder({
                customId: "slc_tags",
                minValues: 1,
                maxValues: 7,
                type: ComponentType.StringSelect,
                options: [
                {
                    label:"Grade S",
                    value:"GRADE_S",
                    description:"Para missões com resultado S+",
                },
                {
                    label:"Grade A",
                    value:"GRADE_A",
                    description:"Para missões com resultado A+",
                },
                {
                    label:"Grade B",
                    value:"GRADE_B",
                    description:"Para missões com resultado B+",
                },
                {
                    label:"Bom roleplay",
                    value:"RP",
                    description:"Será atribuído quando houver um bom roleplay na missão",
                },
                {
                    label:"Anti-RP",
                    value:"ANTIRP",
                    description:"Usado quando houver atitudes anti-RP na operação",
                },
                {
                    label:"KIA",
                    value:"KIA",
                    description:"Atribuído quando houver morte de operador (Killed in Action)",
                },
                {
                    label:"Morte de Refém",
                    value:"REFEM",
                    description:"Caso haja morte de reféns na operação",
                }],
                placeholder: "Selecione as tags adicionais da operação",
            });

            const rowtagsSlc = new ActionRowBuilder<StringSelectMenuBuilder>({
                components: [tagsSlc],
            });


            interacaoPontos = interaction.reply({       
                ephemeral: true,
                content: "Preencha para adicionar pontos",
                components:[rowResponsavelSlc, rowtiposSlc, rowtagsSlc, rowMembrosSlc, rowBtn],
            });
            
            break;
        }
    },
    
    
});

