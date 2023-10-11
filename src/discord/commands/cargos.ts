
import { ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, InteractionResponse, ModalBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { Command } from "../base";
import { setPontosCargo } from "@/functions/cargos/set";
import { unset } from "@/functions/cargos/unset";
import { resetCargos } from "@/functions/cargos/reset";

export let interacaoPontos: Promise<InteractionResponse<true>>;

new Command({
    name: "cargos", dmPermission,
    description: "Sistema de pontuação do servidor",
    type: ApplicationCommandType.ChatInput,
    defaultMemberPermissions: ["Administrator"],
    options:[
        {
            name: "set",
            description: "Atualiza o roleplay de um cargo",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "cargo",
                description: "Cargo para atualizar a pontuação",
                type: ApplicationCommandOptionType.Role,
                required: true,
            },
            {
                name: "pontos",
                description: "Quantidade de pontos necessários",
                type: ApplicationCommandOptionType.Integer,
                required: true,
            },
            {
                name: "categoria",
                description: "Categoria a qual o cargo pertence",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices:[{
                    name:"Patente", value: "PATENTE"
                },
                {
                    name:"Medalha", value: "MEDALHA"
                }]
            },
            ]
        },
        {
            name: "unset",
            description: "Exclui um cargo do sistema de Roleplay",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "cargo",
                description: "Cargo para atualizar a pontuação",
                type: ApplicationCommandOptionType.Role,
                required: true,
            },
           ]
        },
        {
            name: "reset",
            description: "Remove os cargos de roleplay de todos os usuários",
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

            const cargoSet = options.getRole("cargo", true);
            const pontos = options.getInteger("pontos") || 0;
            const categoria = options.getString("categoria", true);

            setPontosCargo(cargoSet.id, pontos, categoria);   

            interaction.reply({ephemeral: true, content: "Atualizado com sucesso!"});

        break;
        case "unset":
            const cargoUnset = options.getRole("cargo");

            if(!cargoUnset) return;
            unset(cargoUnset.id);

            interaction.reply({ephemeral: true, content: "Removido com sucesso!"});

        break;
        case "reset":

            resetCargos();

            interaction.reply({ephemeral: true, content: "Todos os cargos roleplay estão em processo de remoção de seus membros!"});

        break;
        }
    },
    
    
});

