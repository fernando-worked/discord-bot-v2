import { openDb } from "../../data/openDb";

export const setPontosCargo = async (cargoId: string, pontos: number, categoria: string) =>{
    const db = await openDb();

    const result = await db.all("select cargo_id from cargos where cargo_id = ?", [cargoId]);

    if(result.length == 0){
        db.run("INSERT INTO cargos (cargo_id, pontos, categoria) VALUES (?,?,?)", cargoId, pontos, categoria);
    }else{
        db.run("UPDATE cargos set pontos = ?, categoria = ? where cargo_id = ?", pontos, categoria, cargoId);
    }

    db.close();
};