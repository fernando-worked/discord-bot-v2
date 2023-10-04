import { Component } from "@/discord/base";
import { aprovarRelatorio } from "@/functions/relatorio/aprovar";
import { EmbedBuilder } from "discord.js";

new Component({
    customId: "btn_aprovar_relatorio",
    type: "Button", cache: "cached",
    async run(interaction) {

        const oldEmbed = interaction.message.embeds[0];

        //aprovarRelatorio(interaction.message.id, interaction.user.id/* forma incorreta, buscar author */, Number(oldEmbed.fields[1].value), interaction.user.id, oldEmbed.fields[2].value.split('\n'));
        
        const embed = new EmbedBuilder()
        .setTitle("Situação do relatório")
        .setDescription("Confira a situação do relatório abaixo")
        .setColor("Green")
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.avatarURL() || undefined
        })
        .setFields([
            {
                name: "Autor",
                value: oldEmbed.author ? oldEmbed.author.name : "",
                inline: true,
            },
            {
                name: "Pontos informados",
                value: oldEmbed.fields[1].value,
                inline: false,
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
            {
                name: "Membros",
                value: oldEmbed.fields[2].value,
                inline: false,
            },
            {
                name: "Relatório",
                value: oldEmbed.fields[3].value,
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