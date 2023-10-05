import { getCurrentISO8601Date } from "@/functions/util";
import { openDb } from "./openDb";
import { getPatente } from "./getPatente";
import { getMedalha } from "./getMedalha";

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
        SELECT 
        rm.membro_id, 
        SUM(CASE 
            WHEN ? BETWEEN data_avaliacao AND data_validade THEN pontos
            ELSE 0 
        END) as totalPontosValidos,
        SUM(pontos) as totalPontos
        FROM relatorio_membros rm, relatorio r
        WHERE rm.membro_id = ? and rm.relatorio_message_id = r.message_id
        group by membro_id
    `;

    const result = await db.all(sql, [getCurrentISO8601Date(), memberId]);

    let userDataDb: UserDataDb = {};

    result.forEach((row => {
        userDataDb.membro = row.membro_id;
        userDataDb.totalPontosValidos = row.totalPontosValidos;
        userDataDb.totalPontos = row.totalPontos;
    }));

    userDataDb.patenteMaxima = await getPatente(userDataDb.totalPontosValidos!);
    userDataDb.medalhaMaxima = await getMedalha(userDataDb.totalPontos!);


    db.close();
    return userDataDb;
};
