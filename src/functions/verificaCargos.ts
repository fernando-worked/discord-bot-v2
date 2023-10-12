import { getAllMembersReports } from "@/data/getAllMembersReport";
import { getAllRoles } from "@/data/getAllRoles";
import { RoleUpdate } from "./relatorio/aprovarRelatorio";
import { manipulaCargos } from "./manipulaCargos";
import { getTempo } from "./util";

const ciclo = getTempo({segundos: 2});

export const registerVerify = async () => {

    const usersData = await getAllMembersReports();
    const rolesData = await getAllRoles();

    let roleUpdate: RoleUpdate = {};
    roleUpdate.userData = usersData;
    roleUpdate.cargos = rolesData;

    console.log("Verificando cargos");
    await manipulaCargos(roleUpdate);

    setTimeout(async function() {

        setTimeout(registerVerify, ciclo);

    }, ciclo);
    
};
