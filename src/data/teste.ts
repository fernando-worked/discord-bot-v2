import { openDb } from "./openDb";

export const teste = async (nome?: string) => {
    const db = await openDb();
    await db.exec("CREATE TABLE if not exists tbl (col TEXT)");
    await db.exec("CREATE TABLE if not exists pontuacao (responsavel TEXT, membro TEXT, pontos NUMBER, data_inclusao TEXT, data_validade TEXT)");
    await db.exec("CREATE TABLE if not exists cargos_roleplay (cargo_id TEXT, pontuacao NUMBER, categoria TEXT, validade TEXT)");
    await db.exec("CREATE TABLE if not exists relatorio (message_id TEXT, author_id TEXT, score_informado NUMBER, situacao TEXT, avaliador_id TEXT, pontos_recebidos NUMBER, data_envio TEXT, data_avaliacao TEXT)");
    await db.exec("CREATE TABLE if not exists relatorio_membros (relatorio_message_id TEXT, membro_id TEXT)");

    await db.run( "INSERT INTO tbl (col) VALUES (?)",nome);

    const result = await db.get("SELECT col FROM tbl WHERE col = ?", nome);
    console.log(result);
};

/* 
relatorio
    message_id
    author_id
    pontos_informados
    situacao P=PENDENTE, A=APROVADO, R=REPROVADO, B=BLOQUEADO
    avaliador_id
    pontos_ganhos
    data_envio
    data_avaliacao

relatorio_membros
    relatorio_message_id
    membro_id

*/