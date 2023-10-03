
import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, InteractionResponse, ModalBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { Command } from "../base";
import { setPontosCargo } from "@/functions/cargos/set";

export let interacaoPontos: Promise<InteractionResponse<true>>;

new Command({
    name: "cargos", dmPermission,
    description: "Sistema de pontuação do servidor",
    type: ApplicationCommandType.ChatInput,
    options:[
        {
            name: "set",
            description: "Atualiza o roleplay de um cargo",
            type: ApplicationCommandOptionType.Subcommand,
            options: [{
                name: "cargo",
                description: "Cargo para atualizar a pontuação",
                type: ApplicationCommandOptionType.Role,
            },
            {
                name: "pontos",
                description: "Quantidade de pontos necessários",
                type: ApplicationCommandOptionType.Integer,
            },
            {
                name: "categoria",
                description: "Categoria a qual o cargo pertence",
                type: ApplicationCommandOptionType.String,
                choices:[{
                    name:"Patente", value: "PATENTE"
                },
                {
                    name:"Medalha", value: "MEDALHA"
                }]
            },
            {
                name: "validade",
                description: "Verifica se a pontuação será considerada apenas não vencidos",
                type: ApplicationCommandOptionType.String,
                choices:[{
                    name:"Sim", value: "1"
                },
                {
                    name:"Não", value: "0"
                }]
            }]
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

            const cargo = options.getRole("cargo");
            const pontos = options.getInteger("pontos");
            const categoria = options.getString("categoria");
            const validade = Number(options.getString("validade"));

            if(!cargo) return;
            if(!pontos) return;
            if(!categoria) return;
            if(!validade) return;

            setPontosCargo(cargo.id, pontos, categoria, validade);   

            interaction.reply({ephemeral: true, content: "Atualiado com sucesso!"});

            break;
        }
    },
    
    
});

