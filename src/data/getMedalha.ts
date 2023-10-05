import { openDb } from "./openDb";


export const getMedalha = async (pontos: number) :Promise<number> => {
    const db = await openDb();

    const categoria: string = "MEDALHA";

    const sql = `
        SELECT cargo_id
        FROM cargos
        WHERE pontos <= ?
        and categoria = '${categoria}'
        ORDER BY pontos DESC
        LIMIT 1
    `;

    const result = await db.all(sql, [pontos]);

    db.close();
    return result[0] ? result[0].cargo_id : null;
};
