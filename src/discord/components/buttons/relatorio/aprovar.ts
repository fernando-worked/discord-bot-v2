import { Component } from "@/discord/base";
import { EmbedBuilder } from "discord.js";

new Component({
    customId: "btn_aprovar_relatorio",
    type: "Button", cache: "cached",
    async run(interaction) {

        return interaction.reply({ephemeral: true, content: "Você não tem permissão para fazer isso"});

        const oldEmbed = interaction.message.embeds[0];
        
        const embed = new EmbedBuilder()
        .setTitle("Situação do relatório")
        .setDescription("Confira a situação do relatório abaixo")
        .setColor("Green")
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.avatarURL() || undefined
        })
        .setFields(
        {
            name: "Pontos informados pelo usuário",
            value: oldEmbed.fields[0].value,
        })
        .setFields([
            {
                name: "Oficial",
                value: oldEmbed.author ? oldEmbed.author.name : "",
                inline: true,
            },
            {
                name: "Pontos informados",
                value: oldEmbed.fields[0].value,
                inline: true,
            },
            {
                name: "Avaliador",
                value: interaction.user.displayName,
                inline: true,
            },
            {
                name: "Situação",
                value: "Aprovado",
                inline: true,
            },
           
        ])
        .setTimestamp()
        .setImage(oldEmbed.image?.url || null)
        .setFooter({text: "✅ Relatório aprovado"});

        interaction.channel?.send({embeds: [embed]});
        const msg = interaction.channel?.messages.fetch(interaction.message.id);

        if(msg)
        (await msg).delete();

    },
});