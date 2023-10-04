import { openDb } from "../../data/openDb";

export const setPontosCargo = async (cargoId: string, pontos: number, categoria: string, validade: number) =>{
    const db = await openDb();


    const result = await db.all("select cargo_id from cargos_roleplay where cargo_id = ?", [cargoId]);

    console.log(result);
    if(result.length == 0){
        db.run("INSERT INTO cargos_roleplay (cargo_id, pontuacao, categoria, validade) VALUES (?,?,?,?)", cargoId, pontos, categoria, validade);
    }else{
        db.run("UPDATE cargos_roleplay set pontuacao = ?, categoria = ?, validade = ? where cargo_id = ?", pontos, categoria, validade, cargoId);
    }

    db.close();
};