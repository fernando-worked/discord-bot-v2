import { meuBot } from "@/discord/events/onReady";
import { RoleUpdate } from "./relatorio/aprovarRelatorio";

export const manipulaCargos = async (roleUpdate: RoleUpdate) =>{

    const guildId = "1016455729416261664";
    const guild = meuBot.guilds.cache.get(guildId);

    if(!guild) return;

    roleUpdate.userData!.forEach(async (membro) => {

        const patentesElegiveis = roleUpdate.cargos?.filter(cargo => cargo.pontos! <= membro.totalPontosValidos! && cargo.categoria === "PATENTE");
        const patenteElegivel = patentesElegiveis && patentesElegiveis.length > 0 ? patentesElegiveis[patentesElegiveis.length - 1].cargoId : null;

        const medalhasElegiveis = roleUpdate.cargos?.filter(cargo => cargo.pontos! <= membro.totalPontos! && cargo.categoria === "MEDALHA");
        const medalhaElegivel = medalhasElegiveis && medalhasElegiveis.length > 0 ? medalhasElegiveis[medalhasElegiveis.length - 1].cargoId : null;
    
        const member = await guild.members.fetch(membro.id!);
        console.log(`membro ${member.id} ${member.user.displayName} ${membro.totalPontosValidos}`);
    
        roleUpdate.cargos?.filter(cargo => cargo.categoria == "PATENTE").forEach(async (cargo) =>{
            // Patentes
            console.log(`Patentes ${cargo.cargoId} ${cargo.pontos}`);
            if((member.roles.cache.has(cargo.cargoId!) && (cargo.cargoId != patenteElegivel || !patenteElegivel)) || typeof patenteElegivel == "undefined"){
                                 
                const role = await guild.roles.fetch(cargo.cargoId!);
                console.log(`Removendo ${role?.name} ${cargo.cargoId} ${cargo.pontos}`);
                await member.roles.remove(role!);
            } 

            if (!member.roles.cache.has(patenteElegivel!) && patenteElegivel == cargo.cargoId){

                const role = await guild.roles.fetch(patenteElegivel!);
                console.log(`Adicionando ${role?.name} ${cargo.cargoId} ${cargo.pontos}`);
                await member.roles.add(role!);
            }
        });
        
        
        roleUpdate.cargos?.filter(cargo => cargo.categoria == "MEDALHA").forEach(async (cargo) =>{
            // Medalhas
            if((member.roles.cache.has(cargo.cargoId!) && (cargo.cargoId != medalhaElegivel || !medalhaElegivel)) || typeof medalhaElegivel == "undefined"){
                                
                const role = await guild.roles.fetch(cargo.cargoId!);
                await member.roles.remove(role!);
            }
            
            if (!member.roles.cache.has(medalhaElegivel!) && medalhaElegivel == cargo.cargoId){

                const role = await guild.roles.fetch(medalhaElegivel!);
                await member.roles.add(role!);
            }
        });
        
        
    });
};