import { getScoreFromMessage } from "@/data/getScore";
import { openDb } from "../../data/openDb";
import { getCurrentISO8601Date } from "../util";

export const atualizarRelatorio = async (messageId: string, avaliadorId: string, situacao: string, membros: string[]) =>{
    const db = await openDb();

    let score = 0;

    if(situacao == "A"){
        score = await getScoreFromMessage(messageId);
    }

    db.run("UPDATE relatorio set avaliador_id = ?, data_avaliacao = ?, situacao = ? where message_id =  ?", avaliadorId, getCurrentISO8601Date(), situacao, messageId);

    membros.forEach(async (membro) =>{

        await db.run("update relatorio_membros set pontos = ? where relatorio_message_id = ? and membro_id = ?", score, messageId, membro);

    });

    db.close();
};
