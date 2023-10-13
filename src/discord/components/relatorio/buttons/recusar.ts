import { Component } from "@/discord/base";
import { atualizarRelatorio } from "@/functions/relatorio/atualizar";
import { EmbedBuilder } from "discord.js";

new Component({
    customId: "btn_recusar_relatorio",
    type: "Button", cache: "cached",
    async run(interaction) {
        const avaliadorId = "1161009949376262194";
        const member = interaction.guild.members.cache.get(interaction.user.id); // Obtém o objeto do membro

        if(!member?.roles.cache.has(avaliadorId)) return interaction.reply({ephemeral: true, content: "Você não é um avaliador. Aguarde um avaliador."});

        const oldEmbed = interaction.message.embeds[0];

        atualizarRelatorio(oldEmbed.fields[3].value, interaction.user.id, "R");
        
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
                name: "Autor",
                value: oldEmbed.fields[0].value,
                inline: true,
            },
            {
                name: "Pontos informados",
                value: oldEmbed.fields[1].value,
                inline: true,
            },
            {
                name: "Avaliador",
                value: `<@${interaction.user.id}>`,
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
                inline: true,
            },
            {
                name: "Relatório",
                value: oldEmbed.fields[3].value,
                inline: true,
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