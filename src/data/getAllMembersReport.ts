import { getCurrentISO8601Date } from "@/functions/util";
import { openDb } from "./openDb";

export type UserDataDb = {
    id?: string,
    totalPontos?: number,
    totalPontosValidos?: number,
}

export const getAllMembersReports = async () :Promise<UserDataDb[]> => {
    const db = await openDb();

    const sql = `
        SELECT 
        rm.membro_id, 
        SUM(CASE 
            WHEN ? BETWEEN data_avaliacao AND data_validade THEN pontos
            ELSE 0 
        END) as totalPontosValidos,
        SUM(pontos) as totalPontos
        FROM relatorio_membros rm, relatorio r
        WHERE rm.relatorio_message_id = r.message_id
        group by membro_id
    `;

    const result = await db.all(sql, [getCurrentISO8601Date()]);

    let userDataDb: UserDataDb[] = [];

    result.forEach((row => {

        userDataDb.push({id: row.membro_id, totalPontosValidos: row.totalPontosValidos, totalPontos: row.totalPontos});
    }));


    db.close();
    return userDataDb;
};
