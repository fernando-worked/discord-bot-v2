import { openDb } from "./openDb";

export const getScoreFromMessage = async (messageId: string) => {
    let score = 0;
    const db = await openDb();
    const result = await db.all("select score_informado from relatorio where message_id = ?", [messageId]);

    result.forEach((row => {
        score = row.score_informado;
    }));

    db.close();
    return score;
};
