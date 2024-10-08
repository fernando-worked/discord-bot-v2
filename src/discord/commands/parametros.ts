import { ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, InteractionResponse, ModalBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { Command } from "../base";
import { getAll, setParametro } from "@/data/parametros";

(async () => {
    let parametros: {name: string, value: string}[] = [];
    parametros = await getAll();
    
    new Command({
        name: "parametros",
        dmPermission,
        description: "Configuração de parâmetros",
        type: ApplicationCommandType.ChatInput,
        defaultMemberPermissions: ["Administrator"],
        options: [
            {
                name: "set",
                description: "Atualiza o valor de um parâmetro",
                type: ApplicationCommandOptionType.Subcommand,
                
                options: [
                    {
                        name: "chave",
                        description: "Chave do parâmetro",
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        choices: parametros,
                    },
                    {
                        name: "valor",
                        description: "Novo valor",
                        type: ApplicationCommandOptionType.Number,
                        required: true,
                    },
                ],
            },
        ],
        async run(interaction) {
            const { options } = interaction;
            
            switch (options.getSubcommand()) {
                case "set":
                    const chave = options.getString("chave", true);
                    const valor = options.getNumber("valor", true);

                    setParametro(chave, valor.toString());

                    interaction.reply({ ephemeral: true, content: "Parâmetro atualizado com sucesso!" });
                    break;
            }
        },
    });
})();
