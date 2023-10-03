import { openDb } from "../../data/openDb";

export const setPontosCargo = async (cargoId: string, pontos: number, categoria: string, validade: number) =>{
    const db = await openDb();

    console.log("entrou no set");

    let sql = "select cargo_id from cargos_roleplay where cargo_id = ?";

    db.all(sql, [cargoId], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        
        if(rows){
            db.run("UPDATE cargos_roleplay set pontuacao = ?, categoria = ?, validade = ? where cargo_id = ?", pontos, categoria, validade, cargoId);
            console.log("update");
        }else{
            db.run("INSERT INTO cargos_roleplay (cargo_id, pontuacao, categoria, validade) VALUES (?,?,?,?)", cargoId, pontos, categoria, validade);
            console.log("insert");
        }

    });

    db.close();
};