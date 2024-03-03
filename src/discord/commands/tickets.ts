import { ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChannelType, ChatInputCommandInteraction, ComponentType, InteractionResponse, ModalBuilder, PermissionsBitField, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { Command } from "../base";
import { v4 as uuidv4 } from 'uuid';

new Command({
    name: "ticket",
    dmPermission,
    description: "Sistema de Tickets",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "criar",
            description: "Cria um novo ticket",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "encerrar",
            description: "Encerra um ticket",
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    async run(interaction) {
        const { options } = interaction;
        
        switch (options.getSubcommand()) {
            case "criar":

                const uuid = uuidv4().substring(0,8);

                const canalCriado = await interaction.guild.channels.create({name: `ticket-${uuid}`, type: ChannelType.GuildText, parent: "1016455729416261665"});
                canalCriado.setPosition(0);

                const equipe = interaction.guild.roles.cache.get("1016713602620739637")!;
                const membro = interaction.member;

                await canalCriado.permissionOverwrites.set([
                    {
                        id: interaction.guild.roles.everyone,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                        type: 0,
                    }, 
                    {
                      id: membro,
                      allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                      type: 1,
                    },
                    {
                        id: equipe,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                        type: 0,
                    }, 
                   
                  ]);
                
                interaction.reply({ ephemeral: true, content: `Ticket criado! Clique em <#${canalCriado.id}> e envie sua mensagem para a equipe.` });
            break;
            case "encerrar":

                const channelName = interaction.channel?.name;

                if(!channelName?.startsWith("ticket")){
                    interaction.reply({ ephemeral: true, content: "Esse comando só pode ser utilizado em um Ticket!" }); 
                    break;              
                 }

                interaction.reply({ ephemeral: true, content: "Ticket encerrado!" });

                interaction.channel?.delete();
            break;
        }
    },
});
