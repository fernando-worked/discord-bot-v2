import { openDb } from "./openDb";

export const getCountCheckSum = async (checksum: string) => {
    let score = 0;
    const db = await openDb();
    const result = await db.all("select count(1) total from relatorio where img_checksum = ?", [checksum]);

    result.forEach((row => {
        score = row.score_informado;
    }));

    db.close();
    return result.length > 0 ? result[0].total : 0;
};
