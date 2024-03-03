import { Command } from "@/discord/base";
import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, Attachment, ButtonBuilder, ButtonStyle, Collection, ComponentType, EmbedBuilder, InteractionResponse, ModalBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder, codeBlock } from "discord.js";

let interacaoRelatorio: InteractionResponse<true>;
let interacaoRelatorioArray: InteractionResponse<true>[] = [];
export let mapInteracaoRelatorio: Map<string, InteractionResponse<true>[]> = new Map();

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
            minValue: 1,
            required: true,
        },
    ],
    async run(interaction) {

        const canalRelatorio = interaction.guild.channels.cache.get("1201982701427769364")!;

        if(interaction.channelId != canalRelatorio.id){
            interaction.reply({ephemeral: true, content: `Esse comando pode ser executado apenas no canal de <#${canalRelatorio.id}>`})
        }else{

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
            .setFields([
            {
                name: "Pontos informados pelo usuário",
                value: pontos.toString(),
            },])
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

            interacaoRelatorio = await interaction.reply({ephemeral: true, embeds: [embed], components: [rowMembrosSlc, rowBtn]});

            interacaoRelatorioArray.forEach(async (elemento, index) => {
                elemento.delete();
                interacaoRelatorioArray.splice(index, 1);
            });

            interacaoRelatorioArray.push(interacaoRelatorio);
            mapInteracaoRelatorio.set(interaction.user.id, interacaoRelatorioArray);
        }

    }
});
