import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { Command } from "../base";
import { getAllRoles } from "@/data/getAllRoles";
import { RoleUpdate } from "@/functions/relatorio/aprovarRelatorio";
import { getUserData } from "@/data/getUserData";


new Command({
    name: "eu",
    dmPermission,
    description: "Verifique a sua progressão atual",
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        let descricao: string = "";

        const { member } = interaction;

        const usersData = await getUserData(member.id);
        const rolesData = await getAllRoles();
    
        let roleUpdate: RoleUpdate = {};
        roleUpdate.userData = [usersData];
        roleUpdate.cargos = rolesData;
        
        if(!roleUpdate) return;

        roleUpdate.userData!.forEach(async (membro) => {
        
            descricao = descricao + "🔴 Pendente / 🟢 Alcançado\n";
            descricao = descricao + "\nPATENTES MILITARES (apenas pontos não-vencidos)\n";
            roleUpdate.cargos?.filter(cargo => cargo.categoria === "PATENTE").forEach(async (cargo) =>{

                descricao = descricao +`${membro.totalPontosValidos! < cargo.pontos! ? "🔴" : "🟢"} <@&${cargo.cargoId}> (${cargo.pontos} pts)\n`;

            });

            descricao = descricao + "\nMEDALHAS DE CONDECORAÇÃO (total de pontos do operador)\n";
            roleUpdate.cargos?.filter(cargo => cargo.categoria === "MEDALHA").forEach(async (cargo) =>{

                descricao = descricao +`${membro.totalPontos! < cargo.pontos! ? "🔴" : "🟢"} <@&${cargo.cargoId}> (${cargo.pontos} pts)\n`;

            });
            
        });
        

        const embed = new EmbedBuilder()
        .setTitle("Confira a sua pontuação e patentes abaixo")
        .setDescription(descricao)
        .setFields([
            {name: "Pontos válidos", value: `${roleUpdate.userData[0].totalPontosValidos}`, inline: true},
            {name: "Pontos totais", value: `${roleUpdate.userData[0].totalPontos}`, inline: true}
        ])
        .setFooter({text: "Informe seus relatórios através do comando /relatorio para aumentar seus pontos!"});

        interaction.reply({embeds: [embed]});
    
    },
});

