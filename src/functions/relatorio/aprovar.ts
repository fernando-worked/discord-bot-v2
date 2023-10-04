import { openDb } from "../../data/openDb";
import { getCurrentISO8601Date } from "../util";

export const aprovarRelatorio = async (messageId: string, authorId: string, score: number, avaliadorId: number, membros: string[]) =>{
    const db = await openDb();

    db.run("INSERT INTO relatorio (message_id, author_id, score_informado, situacao, avaliador_id, pontos_recebidos, data_envio, data_avaliacao) VALUES (?,?,?,?,?,?,?,?)", messageId, authorId, score, "A", avaliadorId, score, getCurrentISO8601Date(), getCurrentISO8601Date());

    membros.forEach((membro) =>{

        db.run("INSERT INTO relatorio_membros (relatorio_message_id, membro_id) VALUES (?,?)", messageId, membro);

    });

    db.close();
};
