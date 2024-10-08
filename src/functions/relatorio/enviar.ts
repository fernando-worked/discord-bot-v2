import { openDb } from "../../data/openDb";
import { getCurrentISO8601Date } from "../util";

export const enviarRelatorio = async (messageId: string, authorId: string, score: number, membros: string[], imageCheckSum?: string) =>{
    const db = await openDb();

    db.run("INSERT INTO relatorio (message_id, author_id, score_informado, situacao, data_envio, img_checksum) VALUES (?,?,?,?,?,?)", messageId, authorId, score, "P", getCurrentISO8601Date(), imageCheckSum);

    console.log(membros);
    membros.forEach((membro) =>{

        db.run("INSERT INTO relatorio_membros (relatorio_message_id, membro_id) VALUES (?,?)", messageId, membro);

    });

    db.close();
};
