import { getScoreFromMessage } from "@/data/getScore";
import { openDb } from "../../data/openDb";
import { getCurrentISO8601Date } from "../util";

export const atualizarRelatorio = async (messageId: string, avaliadorId: string, situacao: string) =>{
    const db = await openDb();

    let score = 0;

    if(situacao == "A"){
        score = await getScoreFromMessage(messageId);
    }

    db.run("UPDATE relatorio set avaliador_id = ?, pontos_recebidos = ?, data_avaliacao = ?, situacao = ? where message_id =  ?", avaliadorId, score, getCurrentISO8601Date(), situacao, messageId);

    db.close();
};
