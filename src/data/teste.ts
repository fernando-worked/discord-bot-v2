import { openDb } from "./openDb";

export const teste = async (nome?: string) => {
    const db = await openDb();
    await db.exec("CREATE TABLE if not exists relatorio (message_id TEXT, author_id TEXT, score_informado NUMBER, situacao TEXT, avaliador_id TEXT, pontos_recebidos NUMBER, data_envio TEXT, data_avaliacao TEXT)");
    await db.exec("CREATE TABLE if not exists relatorio_membros (relatorio_message_id TEXT, membro_id TEXT)");
    db.close();
};
