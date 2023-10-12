import { openDb } from "./openDb";


export const getParametro = async (chave: string, defaultValue?: any) :Promise<string> => {
    const db = await openDb();
    

    const sql = `
        SELECT valor
        FROM parametros
        WHERE chave = ?
    `;

    const result = await db.all(sql, [chave]);

    db.close();
    return result[0] ? result[0].valor : defaultValue;
};


export const setParametro = async (chave: string, valor: string | number)=> {
    const db = await openDb();
    let sql;

    sql = "select valor from parametros where chave = ?";
    const result = await db.all(sql, [chave]);

    if(result.length == 0){
        sql = "INSERT into parametros (chave, valor) values (?,?)";
        await db.all(sql, [chave, valor]);
    }else{
        sql = "UPDATE parametros set valor = ? where chave = ?";
        await db.all(sql, [valor, chave]);
    }

    db.close();
};


export const getAll = async ()=> {

    const db = await openDb();
    
    let parametros: { name: string; value: string; }[] = [];

    const sql = `
        select chave name, valor value from PARAMETROS
    `;

    const result = await db.all(sql);

    result.forEach((row) =>{
        parametros.push({name: row.name, value: row.name});
    });

    db.close();

    return parametros;
};
