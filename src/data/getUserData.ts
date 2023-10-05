import { getCurrentISO8601Date } from "@/functions/util";
import { openDb } from "./openDb";

export type UserDataDb = {
    membro?: string,
    totalPontos?: number,
    totalPontosValidos?: number,
    patenteMaxima?: number,
    medalhaMaxima?: number,
}

export const getUserData = async (memberId: string) :Promise<UserDataDb> => {
    const db = await openDb();

    const sql = `
        SELECT membro_id, SUM(pontos) as totalPontos
        FROM relatorio_membros
        WHERE membro_id = ? 
        AND relatorio_message_id IN (
            SELECT message_id 
            FROM relatorio
            where ? between data_avaliacao and data_validade
        )
        group by membro_id
    `;

    const result = await db.all(sql, [memberId, getCurrentISO8601Date()]);

    let userDataDb: UserDataDb = {};

    result.forEach((row => {
        userDataDb.membro = row.membro_id;
        userDataDb.totalPontos = row.totalPontos;
    }));

    db.close();
    return userDataDb;
};
