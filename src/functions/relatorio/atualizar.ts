import { getScoreFromMessage } from "@/data/getScore";
import { openDb } from "../../data/openDb";
import { getCurrentISO8601Date } from "../util";
import { UserDataDb, getUserData } from "@/data/getUserData";
import { getParametro } from "@/data/parametros";

export const atualizarRelatorio = async (messageId: string, avaliadorId: string, situacao: string, membros?: string[]) => {
    const db = await openDb();
    let score = 0;
    let diasValidade = 30;
    let multiplicadorXP = 1;

    if (situacao == "A") {
        score = await getScoreFromMessage(messageId);
        multiplicadorXP = Number(await getParametro("MULTIPLICADOR_XP_BASE", multiplicadorXP));
        score = score * multiplicadorXP;
        diasValidade = Number(await getParametro("DIAS_VENCIMENTO_PONTOS", diasValidade));
    }

    await db.run("UPDATE relatorio SET avaliador_id = ?, data_avaliacao = ?, situacao = ?, data_validade = ? WHERE message_id =  ?", avaliadorId, getCurrentISO8601Date(), situacao, getCurrentISO8601Date(diasValidade), messageId);

    let atualizacao: UserDataDb[] = [];

    const membrosFormatados = membros!.map(membro => membro.replaceAll("<@", "").replaceAll(">", ""));
    for (const membro of membrosFormatados) {
        await db.run("UPDATE relatorio_membros SET pontos = ? WHERE relatorio_message_id = ? AND membro_id = ?", score, messageId, membro);
        const userData = await getUserData(membro);
        atualizacao.push(userData);
    }

    db.close();
    return atualizacao;
};
