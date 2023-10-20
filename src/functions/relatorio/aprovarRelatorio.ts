import { UserDataDb } from "@/data/getUserData";
import { RoleRow, getAllRoles } from "@/data/getAllRoles";
import { atualizarRelatorio } from "@/functions/relatorio/atualizar";
import { ButtonInteraction, Embed, EmbedBuilder, Message } from "discord.js";
import { manipulaCargos } from "../manipulaCargos";

export type RoleUpdate = {
    userData?: UserDataDb[],
    cargos?: RoleRow[],

}

export const aprovarRelatorio = (async (interaction: ButtonInteraction<"cached">, message?: Message<true> | undefined) => {

    const oldEmbed = message?.embeds[0] ? message?.embeds[0] : interaction.message.embeds[0];

    let userData: UserDataDb[] = [];
    userData = await atualizarRelatorio(oldEmbed.fields[3].value, interaction.user.id, "A", oldEmbed.fields[2].value.split("\n").map(membro => membro.replaceAll("<@","").replaceAll(">","")));

    let rolesData: RoleRow[] = [];
    rolesData = await getAllRoles();

    let roleUpdate: RoleUpdate = {};
    roleUpdate.userData = userData;
    roleUpdate.cargos = rolesData;
    
    console.log(roleUpdate);

    await manipulaCargos(roleUpdate);

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
            value: oldEmbed ? oldEmbed.fields[0].value : `<@${interaction.user.id}>`,
            inline: true,
        },
        {
            name: "Pontos informados",
            value: oldEmbed.fields[1].value,
            inline: true,
        },
        {
            name: "Avaliador",
            value: `<@${message?.embeds[0] ? message.author.id : interaction.user.id}>`,
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
    .setFooter({text: "✅ Relatório aprovado"});


    interaction.channel?.send({embeds: [embed]});
    const msg = interaction.channel?.messages.fetch(interaction.message.id);


    if(msg && !message?.embeds[0])
    (await msg).delete();


});