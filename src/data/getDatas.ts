import { openDb } from "./openDb";

export type UserDataDb = {
    id?: string,
    totalPontos?: number,
    totalPontosValidos?: number,
}

export const getDtUltEnvio = async (memberId: string) :Promise<string> => {
    const db = await openDb();

    const sql = `
        SELECT max(data_envio) as data_envio from relatorio where author_id = ?
    `;

    const result = await db.all(sql, [memberId]);

    db.close();
    return result[0].data_envio;
};

export const getDtUltAvaliacao = async (memberId: string) :Promise<string> => {
    const db = await openDb();

    const sql = `
        SELECT max(data_avaliacao) as data_envio from relatorio where author_id = ?
    `;

    const result = await db.all(sql, [memberId]);

    db.close();
    return result[0].data_envio;
};
