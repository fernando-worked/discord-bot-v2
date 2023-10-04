import { Component } from "@/discord/base";
import { EmbedBuilder } from "discord.js";

new Component({
    customId: "btn_recusar_relatorio",
    type: "Button", cache: "cached",
    async run(interaction) {

        const oldEmbed = interaction.message.embeds[0];
        
        const embed = new EmbedBuilder()
        .setTitle("Situação do relatório")
        .setDescription("Confira a situação do relatório abaixo")
        .setColor("Red")
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.avatarURL() || undefined
        })
        .setFields([
            {
                name: "Responsável",
                value: oldEmbed.author ? oldEmbed.author!.name : "",
                inline: true,
            },
            {
                name: "Pontos informados",
                value: oldEmbed.fields[1].value,
                inline: true,
            },
            {
                name: "Avaliador",
                value: interaction.user.displayName,
                inline: true,
            },
            {
                name: "Situação",
                value: "Recusado",
                inline: true,
            },
            {
                name: "Membros",
                value: oldEmbed.fields[2].value,
                inline: false,
            },
           
        ])
        .setTimestamp()
        .setImage(oldEmbed.image?.url || null)
        .setFooter({text: "❌ Relatório recusado"});

        interaction.channel?.send({embeds: [embed]});
        const msg = interaction.channel?.messages.fetch(interaction.message.id);

        if(msg)
        (await msg!).delete();

    },
});