import { getCurrentISO8601Date } from "../util";
import { openDb } from "./../../data/openDb";

export const addPontos = async (responsavel: string[], membros: string[], tipo: string[], tags: string[]) =>{
    const db = await openDb();
    const pontuacao = calcularPontuacao(tipo, tags);
    membros.forEach((membro) => {
        
        db.run( "INSERT INTO pontuacao (responsavel, membro, pontos, data_inclusao, data_validade) VALUES (?,?,?,?,?)", responsavel[0], membro, pontuacao, getCurrentISO8601Date(), getCurrentISO8601Date(30));
       
    });
    db.close();

};

function calcularPontuacao(tipos: string[], tags: string[]) : number{

    let pontuacao: number = 0;

    tipos.forEach((tipo) => {

        switch(tipo){
            case "CQB":
                pontuacao+=3;
                break;
            case "MOF":
                pontuacao+=10;
                break;
            case "MNF":
                pontuacao+=5;
                break;   
        }

    });

    tags.forEach((tag) => {

        switch(tag){
            case "GRADE_S":
                pontuacao+=3;
                break;
            case "GRADE_A":
                pontuacao+=2;
                break;
            case "GRADE_B":
                pontuacao+=1;
                break;
            case "RP":
                pontuacao+=2;
                break; 
            case "ANTIRP":
                pontuacao+=-2;
                break; 
            case "KIA":
                pontuacao+=-2;
                break; 
            case "REFEM":
                pontuacao+=-3;
                break; 
        }

    });

    return pontuacao;
}