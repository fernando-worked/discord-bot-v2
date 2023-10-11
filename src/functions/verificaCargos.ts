import { getAllMembersReports } from "@/data/getAllMembersReport";
import { getAllRoles } from "@/data/getAllRoles";
import { RoleUpdate } from "./relatorio/aprovarRelatorio";
import { manipulaCargos } from "./manipulaCargos";

const ciclo = 1_000 * 60 * 60 * 24;

export const registerVerify = async () => {

    console.log("Verificando cargos");
    setTimeout(async function() {

        const usersData = await getAllMembersReports();
        const rolesData = await getAllRoles();
    
        let roleUpdate: RoleUpdate = {};
        roleUpdate.userData = usersData;
        roleUpdate.cargos = rolesData;

        await manipulaCargos(roleUpdate);

        setTimeout(registerVerify, ciclo);

    }, ciclo);
    

};
