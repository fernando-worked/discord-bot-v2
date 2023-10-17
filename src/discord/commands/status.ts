import { ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, InteractionResponse, ModalBuilder, PresenceStatusData, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { Command } from "../base";
import { getAll, setParametro } from "@/data/parametros";

(async () => {
    let parametros: {name: string, value: string}[] = [];
    parametros = await getAll();
    
    new Command({
        name: "status",
        dmPermission,
        description: "Altera o status do bot",
        type: ApplicationCommandType.ChatInput,
        defaultMemberPermissions: ["Administrator"],
        options: [{
            name: "status",
            description: "Status",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {name: "Online - responde todos", value: "online"},
                {name: "Ocupado - responde administrador", value: "dnd"},
                {name: "Invisível - responde ninguém", value: "invisible"},
            ]
        },
        ],
        async run(interaction) {
            const { options } = interaction;

            const status = options.getString("status", true);
         
            const presenceData: PresenceStatusData = status as PresenceStatusData;

            interaction.client.user.setPresence({status: presenceData});

            interaction.reply({content: `Status do Bot alterado para ${status}`, ephemeral: true});

            
        },
    });
})();
