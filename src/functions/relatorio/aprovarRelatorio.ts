import { UserDataDb } from "@/data/getUserData";
import { RoleRow, getAllRoles } from "@/data/getAllRoles";
import { atualizarRelatorio } from "@/functions/relatorio/atualizar";
import { ButtonInteraction, Embed, EmbedBuilder } from "discord.js";

type RoleUpdate = {
    userData?: UserDataDb[],
    cargos?: RoleRow[],

}

export const aprovarRelatorio = (async (interaction: ButtonInteraction<"cached">, embedEnviado?: Embed) => {

    const oldEmbed = embedEnviado ? embedEnviado : interaction.message.embeds[0];

    let userData: UserDataDb[] = [];
    userData = await atualizarRelatorio(oldEmbed.fields[3].value, interaction.user.id, "A", oldEmbed.fields[2].value.split("\n"));

    let rolesData: RoleRow[] = [];
    rolesData = await getAllRoles();

    let roleUpdate: RoleUpdate = {};
    roleUpdate.userData = userData;
    roleUpdate.cargos = rolesData;
    
    console.log(roleUpdate);

    roleUpdate.userData.forEach(async (membro) => {

        const patentesElegiveis = roleUpdate.cargos?.filter(cargo => cargo.pontos! <= membro.totalPontosValidos! && cargo.categoria === "PATENTE");
        const patenteElegivel = patentesElegiveis && patentesElegiveis.length > 0 ? patentesElegiveis[patentesElegiveis.length - 1].cargoId : null;

        const medalhasElegiveis = roleUpdate.cargos?.filter(cargo => cargo.pontos! <= membro.totalPontos! && cargo.categoria === "MEDALHA");
        const medalhaElegivel = medalhasElegiveis && medalhasElegiveis.length > 0 ? medalhasElegiveis[medalhasElegiveis.length - 1].cargoId : null;
    
        const member = await interaction.guild.members.fetch(membro.id!);
    
        roleUpdate.cargos?.forEach(async (cargo) =>{
            // Patentes
            if(patenteElegivel){
                if(member.roles.cache.has(cargo.cargoId!) && cargo.cargoId != patenteElegivel && cargo.categoria == "PATENTE"){
                    const role = await interaction.guild.roles.fetch(cargo.cargoId!);
                    member.roles.remove(role!);
                }else if (!member.roles.cache.has(patenteElegivel!)){
                    const role = await interaction.guild.roles.fetch(patenteElegivel!);
                    member.roles.add(role!);
                }
            }

            // Medalhas
            if(medalhaElegivel){
                if(member.roles.cache.has(cargo.cargoId!) && cargo.cargoId != medalhaElegivel && cargo.categoria == "MEDALHA"){
                    const role = await interaction.guild.roles.fetch(cargo.cargoId!);
                    member.roles.remove(role!);
                }else if (!member.roles.cache.has(medalhaElegivel!)){
                    const role = await interaction.guild.roles.fetch(medalhaElegivel!);
                    member.roles.add(role!);
                }
            }
        });
        
    });

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


    if(msg && !embedEnviado)
    (await msg).delete();


});