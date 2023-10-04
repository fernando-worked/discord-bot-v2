import { openDb } from "../../data/openDb";

export const unset = async (cargoId: string) =>{
    const db = await openDb();
    const result = await db.all("delete from cargos_roleplay where cargo_id = ?", [cargoId]);
    db.close();
};