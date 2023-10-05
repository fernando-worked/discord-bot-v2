import { Component } from "@/discord/base";
import { mapInteracaoRelatorio } from "@/discord/commands/relatorio";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { valoresSelectUsuarioRelatorio } from "../selects/membros";
import { enviarRelatorio } from "@/functions/relatorio/enviar";



new Component({
    customId: "btn_enviar_relatorio",
    type: "Button", cache: "cached", 
    async run(interaction) {

        const oldEmbed = interaction.message.embeds[0];

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
                value: valoresSelectUsuarioRelatorio.get(interaction.user.id) != null ? valoresSelectUsuarioRelatorio.get(interaction.user.id)!.join("\n" ): interaction.user.id,
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

        const rowBtn = new ActionRowBuilder<ButtonBuilder>({components: [btnAprovar, btnRecusar]});

        const respostaAtual = await interaction.channel?.send({embeds: [embed], components: [rowBtn]});

        const embedEnviado = respostaAtual?.embeds[0];

        enviarRelatorio(interaction.message.id, interaction.user.id, Number(oldEmbed.fields[0].value), embedEnviado!.fields[2].value.split("\n"));

        mapInteracaoRelatorio.get(interaction.user.id)!.forEach(async (elemento, index) => {
            elemento.delete();
            mapInteracaoRelatorio.get(interaction.user.id)!.splice(index, 1);
        });

    },
});