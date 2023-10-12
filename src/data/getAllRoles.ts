import { openDb } from "./openDb";

export type RoleRow = {
    cargoId?: string,
    pontos?: number,
    categoria?: string,
}

export const getAllRoles = async () :Promise<RoleRow[]> => {
    const db = await openDb();

    const sql = `
        SELECT 
            cargo_id,
            pontos,
            categoria
        FROM cargos
        order by categoria desc, pontos asc
    `;

    const result = await db.all(sql);

    
    let roles: RoleRow[] = [];

    result.forEach((row => {
        let role: RoleRow = {};

        role.cargoId = row.cargo_id;
        role.pontos = row.pontos;
        role.categoria = row.categoria;

        roles.push(role);

    }));


    db.close();
    return roles;
};
