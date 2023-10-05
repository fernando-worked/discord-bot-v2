import { Command } from "@/discord/base";
import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, Attachment, ButtonBuilder, ButtonStyle, Collection, ComponentType, EmbedBuilder, InteractionResponse, ModalBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder, codeBlock } from "discord.js";

const members: Collection<string, Attachment> = new Collection();

let interacaoRelatorio: Promise<InteractionResponse<true>>;
export let interacaoRelatorioArray: Promise<InteractionResponse<true>>[];

new Command({
    name: "relatorio",
    description: "Envie um relatório de missão",
    type: ApplicationCommandType.ChatInput,
    dmPermission,
    options: [
        {
            name: "imagem",
            description: "Print da conclusão da missão",
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        },
        {
            name: "pontos",
            description: "Quantidade de pontos que aparecem em baixo da letra na conclusão da missão",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
    run(interaction) {
        const { options } = interaction;

        const image = options.getAttachment("imagem", true);
        const pontos = options.getInteger("pontos", true);

        const embed = new EmbedBuilder()
        .setTitle("Novo relatório de missão")
        .setDescription("Preencha os dados necessários e clique em enviar")
        .setColor("Grey")
        .setAuthor({
            name: interaction.user.displayName,
            iconURL: interaction.user.avatarURL() || undefined
        })
        .setFields(
        {
            name: "Pontos informados pelo usuário",
            value: pontos.toString(),
        })
        .setTimestamp()
        .setFooter({text: "⏳ Relatório pendente"})
        .setImage(image.url);

        const btnAprovar = new ButtonBuilder({
            customId: "btn_enviar_relatorio",
            label: "Enviar relatório",
            emoji: "✅",
            style: ButtonStyle.Primary
        });

        const btnRecusar = new ButtonBuilder({
            customId: "btn_cancelar_relatorio",
            label: "Cancelar",
            emoji: "❌",
            style: ButtonStyle.Primary
        });

        const usersSlc = new UserSelectMenuBuilder({
            customId: "slc_membro_relatorio",
            maxValues: 20,
            minValues: 0,
            type: ComponentType.UserSelect,
            placeholder: "Selecione outros operadores que participaram",
        });

        const rowMembrosSlc = new ActionRowBuilder<UserSelectMenuBuilder>({
            components: [usersSlc],
        });

        const rowBtn = new ActionRowBuilder<ButtonBuilder>({components: [btnAprovar, btnRecusar]});

        interacaoRelatorio = interaction.reply({ephemeral: true, embeds: [embed], components: [rowMembrosSlc, rowBtn]});

        interacaoRelatorioArray.push(interacaoRelatorio);

    }
});
