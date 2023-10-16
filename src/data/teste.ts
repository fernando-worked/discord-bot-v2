import { setPontosCargo } from "@/functions/cargos/set";
import { openDb } from "./openDb";
import { setParametro } from "./parametros";
import { getTempo } from "@/functions/util";

export const configDB = async () => {
    const db = await openDb();
    await db.exec("CREATE TABLE if not exists relatorio (message_id TEXT, author_id TEXT, score_informado NUMBER, situacao TEXT, avaliador_id TEXT, data_envio TEXT, data_avaliacao TEXT, data_validade TEXT, img_checksum TEXT)");
    await db.exec("CREATE TABLE if not exists relatorio_membros (relatorio_message_id TEXT, membro_id TEXT, pontos NUMBER)");
    await db.exec("CREATE TABLE if not exists steam (memberId TEXT, steamId text)");

    const resultCreateCargos = await db.exec("CREATE TABLE if not exists cargos (cargo_id TEXT, pontos NUMBER, categoria TEXT)");
    configCargos(resultCreateCargos);
    const resultCreateParametros = await db.exec("CREATE TABLE if not exists parametros (chave TEXT, valor TEXT)");
    configParametros(resultCreateParametros);
    db.close();

};

const configParametros = (result: any) => {
    console.log("executado configuracao de parametros");
    type Parametro = {
        chave: string,
        valor: string | number,
    }

    let parametros: Parametro[] = [];

    parametros.push({chave: "DIAS_VENCIMENTO_PONTOS", valor: getTempo({dias: 30, output: "dias"})});
    parametros.push({chave: "PONTOS_APROVACAO_AUTOMATICA", valor: "2000"});
    parametros.push({chave: "MILISSEGUNDOS_AGUARDAR_ENVIO", valor: getTempo({milissegundos: 1})});
    parametros.push({chave: "CHECK_CHECKSUM_IMAGEM", valor: "0"});
    parametros.push({chave: "MILISSEGUNDOS_APROVACAO_AUTOMATICA", valor: getTempo({milissegundos: 1})});
    parametros.push({chave: "MULTIPLICADOR_XP_BASE", valor: "1"});

    parametros.forEach((parametro) =>{
        setParametro(parametro.chave, parametro.valor);
    });
        
};

const configCargos = (result: any) =>{

    console.log("executado configuracao de cargos");

    enum Cargos {
        /* PATENTES */
        RECRUTA = "1016708001584918618",
        SOLDADO = "1016707983004139530",
        CABO = "1016707960438788136",
        SARGENTO_3 = "1016707940155146250",
        SARGENTO_2 = "1016707915974975548",
        SARGENTO_1 = "1016707893099241562",
        SUB_TENENTE = "1016707857317642320",
        TENENTE_2 = "1016707837864448071",
        TENENTE_1 = "1016707811482288228",
        CAPITAO = "1016707791060213862",
        MAJOR = "1016707764321521736",
        TEN_CORONEL = "1016707728913207367",
        CORONEL = "1016704492986703912",

        /* MEDALHAS */
        BRONZE_1 = "1161004355915350056",
        BRONZE_2 = "1161004471149678592",
        BRONZE_3 = "1161004497393422388",
        PRATA_1 = "1161004562119929897",
        PRATA_2 = "1161004623285465310",
        PRATA_3 = "1161004639085408439",
        OURO_1 = "1161004654847594546",
        OURO_2 = "1161004787706363964",
        OURO_3 = "1161004802046709942"


    }

    enum Categorias{
        MEDALHA = "MEDALHA",
        PATENTE = "PATENTE",
    }

    type Cargo = {
        cargoId: string,
        pontos: number,
        categoria: string,
    }

    let cargos: Cargo[] = [];
    cargos.push({cargoId: Cargos.RECRUTA, pontos: 0, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.SOLDADO, pontos: 2000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.CABO, pontos: 4000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.SARGENTO_3, pontos: 6000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.SARGENTO_2, pontos: 8000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.SARGENTO_1, pontos: 10000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.SUB_TENENTE, pontos: 12000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.TENENTE_2, pontos: 14000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.TENENTE_1, pontos: 16000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.CAPITAO, pontos: 20000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.MAJOR, pontos: 24000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.TEN_CORONEL, pontos: 30000, categoria: Categorias.PATENTE});
    cargos.push({cargoId: Cargos.CORONEL, pontos: 40000, categoria: Categorias.PATENTE});

    cargos.push({cargoId: Cargos.BRONZE_1, pontos: 10000, categoria: Categorias.MEDALHA});
    cargos.push({cargoId: Cargos.BRONZE_2, pontos: 20000, categoria: Categorias.MEDALHA});
    cargos.push({cargoId: Cargos.BRONZE_3, pontos: 30000, categoria: Categorias.MEDALHA});
    cargos.push({cargoId: Cargos.PRATA_1, pontos: 40000, categoria: Categorias.MEDALHA});
    cargos.push({cargoId: Cargos.PRATA_2, pontos: 50000, categoria: Categorias.MEDALHA});
    cargos.push({cargoId: Cargos.PRATA_3, pontos: 60000, categoria: Categorias.MEDALHA});
    cargos.push({cargoId: Cargos.OURO_1, pontos: 70000, categoria: Categorias.MEDALHA});
    cargos.push({cargoId: Cargos.OURO_2, pontos: 80000, categoria: Categorias.MEDALHA});
    cargos.push({cargoId: Cargos.OURO_3, pontos: 90000, categoria: Categorias.MEDALHA});

    cargos.forEach((cargo) => {
        setPontosCargo(cargo.cargoId, cargo.pontos, cargo.categoria);
    });

};
