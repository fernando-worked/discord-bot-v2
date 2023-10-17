import { getCurrentISO8601Date } from "@/functions/util";
import { openDb } from "./openDb";

enum QuerysDelete {
    STEAM = "delete from steam where memberId = ?",
    RELATORIO_MEMBROS = "delete from relatorio_membros where membro_id = ?",
}

export const deleteUserData = async (memberId: string)=> {
    const db = await openDb();

    for(let query in QuerysDelete){
        await db.all(query, [memberId]);
    }

    db.close();
};
