import { Component } from "@/discord/base";
import { interacaoRelatorio } from "@/discord/commands/relatorio";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { membrosRelatorio } from "../selects/membros";
import { enviarRelatorio } from "@/functions/relatorio/enviar";

new Component({
    customId: "btn_enviar_relatorio",
    type: "Button", cache: "cached",
    async run(interaction) {

        console.log(interaction.message.components[0].data);

        const oldEmbed = interaction.message.embeds[0];

        enviarRelatorio(interaction.message.id, interaction.user.id, Number(oldEmbed.fields[0].value), membrosRelatorio);
        
        const embed = new EmbedBuilder()
        .setTitle("Novo relatório enviado!")
        .setDescription("Confira a situação do relatório abaixo")
        .setColor("Blue")
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
                value: oldEmbed.fields[0].value,
                inline: true,
            },
            {
                name: "Membros",
                value: membrosRelatorio.length > 0 ? membrosRelatorio.join("\n" ): interaction.user.id,
                inline: false,
            },
            {
                name: "Relatório",
                value: interaction.message.id,
                inline: true,
            },          
        ])
        .setTimestamp()
        .setImage(oldEmbed.image?.url || null)
        .setFooter({text: "⌛️ Relatório em análise"});

        const btnAprovar = new ButtonBuilder({
            customId: "btn_aprovar_relatorio",
            label: "Aprovar relatório",
            emoji: "✅",
            style: ButtonStyle.Primary
        });

        const btnRecusar = new ButtonBuilder({
            customId: "btn_recusar_relatorio",
            label: "Recusar relatório",
            emoji: "❌",
            style: ButtonStyle.Primary
        });

        membrosRelatorio.splice(0, membrosRelatorio.length);

        const rowBtn = new ActionRowBuilder<ButtonBuilder>({components: [btnAprovar, btnRecusar]});

        interaction.channel?.send({embeds: [embed], components: [rowBtn]});
        (await interacaoRelatorio).delete();


    },
});