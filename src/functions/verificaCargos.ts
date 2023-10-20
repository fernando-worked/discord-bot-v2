import { getAllMembersReports } from "@/data/getAllMembersReport";
import { getAllRoles } from "@/data/getAllRoles";
import { RoleUpdate } from "./relatorio/aprovarRelatorio";
import { manipulaCargos } from "./manipulaCargos";
import { getTempo } from "./util";

const ciclo = getTempo({segundos: 5});

export const registerVerify = async () => {

    const usersData = await getAllMembersReports();
    const rolesData = await getAllRoles();

    let roleUpdate: RoleUpdate = {};
    roleUpdate.userData = usersData;
    roleUpdate.cargos = rolesData;

    await manipulaCargos(roleUpdate);
    setTimeout(registerVerify, ciclo);
    
};
