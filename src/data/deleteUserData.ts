import { openDb } from "./openDb";

const queryDelete = {
    STEAM: "delete from steam where memberId = ?",
    RELATORIO_MEMBROS: "delete from relatorio_membros where membro_id = ?",
}

export const deleteUserData = async (memberId: string)=> {
    const db = await openDb();

    for(let query in queryDelete){
        await db.all(query, [memberId]);
    }

    db.close();
};
