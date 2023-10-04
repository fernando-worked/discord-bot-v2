import { Command } from "@/discord/base";
import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, Attachment, AttachmentBuilder, ButtonBuilder, ButtonStyle, Collection, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, codeBlock } from "discord.js";

const members: Collection<string, Attachment> = new Collection();

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
        .setTitle("Novo relatório de missão!")
        .setDescription("Um novo relatório de missão acaba de ser recebido.")
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
        .setImage(image.url);

        const btnAprovar = new ButtonBuilder({
            customId: "btn_aprovar_relatorio",
            label: "Aprovar",
            emoji: "✅",
            style: ButtonStyle.Primary
        });

        const btnRecusar = new ButtonBuilder({
            customId: "btn_recusar_relatorio",
            label: "Recusar",
            emoji: "❌",
            style: ButtonStyle.Primary
        });

        const btnBloquear = new ButtonBuilder({
            customId: "btn_bloquear_relatorio",
            label: "Bloquear",
            emoji: "🚫",
            style: ButtonStyle.Primary,
        });

        const rowBtn = new ActionRowBuilder<ButtonBuilder>({components: [btnAprovar, btnRecusar, btnBloquear]});

        interaction.reply({embeds: [embed], components: [rowBtn]});

    }
});
