import { openDb } from "./openDb";

export const teste = async (nome?: string) => {
    const db = await openDb();
    await db.exec("CREATE TABLE if not exists tbl (col TEXT)");
    await db.run( "INSERT INTO tbl (col) VALUES (?)",nome)

    const result = await db.get("SELECT col FROM tbl WHERE col = ?", nome);
    console.log(result);
};

