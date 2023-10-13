import { Component } from "@/discord/base";
import { mapInteracaoRelatorio } from "@/discord/commands/relatorio";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { valoresSelectUsuarioRelatorio } from "../selects/membros";
import { enviarRelatorio } from "@/functions/relatorio/enviar";
import { aprovarRelatorio } from "@/functions/relatorio/aprovarRelatorio";
import { getParametro } from "@/data/parametros";
import { getDtUltAvaliacao, getDtUltEnvio } from "@/data/getDatas";
import { getCheckSumImage, getCurrentISO8601Date } from "@/functions/util";
import { getCountCheckSum } from "@/data/getCountCheckSum";



new Component({
    customId: "btn_enviar_relatorio",
    type: "Button", cache: "cached", 
    async run(interaction) {

        const oldEmbed = interaction.message.embeds[0];

        const imageUrl = interaction.message.embeds[0].image?.url;
        let imageCheckSum: string = "";

        if(imageUrl){
            imageCheckSum = await getCheckSumImage(imageUrl);
            console.log(`checksum ${imageCheckSum}`);
        }

        const totalCheckSum = await getCountCheckSum(imageCheckSum);
        const controlaChecksum = Number(await getParametro("CHECK_CHECKSUM_IMAGEM",0));
        if(totalCheckSum > 0 && controlaChecksum == 1){
            return interaction.reply({ephemeral: true, content: "Essa imagem já foi enviada anteriormente."});
        }

        const dtUltEnvioISO = await getDtUltEnvio(interaction.user.id);
        const dtUltAvaliacaoISO = await getDtUltAvaliacao(interaction.user.id);

        const dtUltEnvio = new Date(dtUltEnvioISO);
        const dtUltAvaliacao = new Date(dtUltAvaliacaoISO);

        const dtAtual = new Date(getCurrentISO8601Date());

        const diferencaEmMilissegundosEnvio = Math.abs(dtAtual.getTime() - dtUltEnvio.getTime());
        const diferencaEmMilissegundosAvaliacao = Math.abs(dtAtual.getTime() - dtUltAvaliacao.getTime());

        const parametroMilisEnvio = Number(await getParametro("MILISSEGUNDOS_AGUARDAR_ENVIO"));
        const parametroMilisAprovacao = Number(await getParametro("MILISSEGUNDOS_APROVACAO_AUTOMATICA"));

        if(diferencaEmMilissegundosEnvio < parametroMilisEnvio){
            return interaction.reply({ephemeral: true, content: "Você não pode enviar um novo relatório agora. Tente novamente mais tarde."});
        }


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
                value: `<@${interaction.user.id}>`,
                inline: true,
            },
            {
                name: "Pontos informados",
                value: oldEmbed.fields[0].value,
                inline: true,
            },
            {
                name: "Membros",
                value: valoresSelectUsuarioRelatorio.get(interaction.user.id) != null ? valoresSelectUsuarioRelatorio.get(interaction.user.id)!.map(membro => `<@${membro}>`).join("\n" ): `<@${interaction.user.id}>`,
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

        enviarRelatorio(interaction.message.id, interaction.user.id, Number(oldEmbed.fields[0].value), embedEnviado!.fields[2].value.split("\n").map(membro => membro.replaceAll("<@","").replaceAll(">","")), imageCheckSum);

        mapInteracaoRelatorio.get(interaction.user.id)!.forEach(async (elemento, index) => {
            elemento.delete();
            mapInteracaoRelatorio.get(interaction.user.id)!.splice(index, 1);
        });

        valoresSelectUsuarioRelatorio.delete(interaction.user.id);


        const pontosLimites = Number(await getParametro("PONTOS_APROVACAO_AUTOMATICA"));
        if(Number(oldEmbed.fields[0].value) <= pontosLimites && diferencaEmMilissegundosAvaliacao >= parametroMilisAprovacao){
            respostaAtual?.delete();
            aprovarRelatorio(interaction, respostaAtual);
        }
        
    },
});