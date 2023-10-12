import { getAllMembersReports } from "@/data/getAllMembersReport";
import { getAllRoles } from "@/data/getAllRoles";
import { RoleUpdate } from "./relatorio/aprovarRelatorio";
import { manipulaCargos } from "./manipulaCargos";
import { getTempo } from "./util";

const ciclo = getTempo({dias: 1});

export const registerVerify = async () => {

    setTimeout(async function() {
        console.log("Verificando cargos");

        const usersData = await getAllMembersReports();
        const rolesData = await getAllRoles();
    
        let roleUpdate: RoleUpdate = {};
        roleUpdate.userData = usersData;
        roleUpdate.cargos = rolesData;

        await manipulaCargos(roleUpdate);

        setTimeout(registerVerify, ciclo);

    }, ciclo);
    

};
