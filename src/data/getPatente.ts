import { getCurrentISO8601Date } from "@/functions/util";
import { openDb } from "./openDb";


export const getPatente = async (pontos: number) :Promise<number> => {
    const db = await openDb();

    const sql = `
        SELECT cargo_id
        FROM cargos
        WHERE pontos <= ?
        ORDER BY pontos DESC
        LIMIT 1
    `;

    const result = await db.all(sql, [pontos]);

    db.close();
    return result[0].cargo_id;
};
