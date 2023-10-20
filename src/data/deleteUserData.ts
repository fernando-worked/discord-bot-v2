import { openDb } from "./openDb";


const queryDelete: string[] = ["delete from steam where memberId = ?", "delete from relatorio_membros where membro_id = ?"];

export const deleteUserData = async (memberId: string)=> {
    const db = await openDb();

    for(let query of queryDelete){
        await db.all(query, [memberId]);
    }

    db.close();
};
