import { meuBot as cliente } from "@/discord/events/onReady";
import { openDb } from "../../data/openDb";

export const resetCargos = async () =>{
    const db = await openDb();

    const result = await db.all("select cargo_id from cargos");

    console.log(result);

    result.forEach((row) => {
        console.log(row.cargo_id);

        const role = cliente.guilds.cache.first()?.roles.cache.get(row.cargo_id);
        const membersWithRole = cliente.guilds.cache.first()?.members.cache.filter(member => member.roles.cache.has(row.cargo_id));

        if(!membersWithRole) return;
        if(!role) return;
        
        membersWithRole.forEach(member => {
            member.roles.remove(role)
                .then(() => {
                    console.log(`Role removida de ${member.user.tag}`);
                })
                .catch(error => {
                    console.error(`Erro ao remover a role de ${member.user.tag}: ${error}`);
                });
        });

    });

    db.close();
};