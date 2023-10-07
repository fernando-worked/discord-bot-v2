import axios from "axios";
import crypto from "crypto";

export function getCurrentISO8601Date(dias: number = 0): string {
    // Obtém a data atual em UTC
    const now: Date = new Date();

    // Obtém o offset do fuso horário em minutos
    const offset: number = -180; // -3 horas em minutos (GMT-3)
    
    // Aplica o offset ao tempo UTC para obter o tempo em Brasília
    now.setMinutes(now.getMinutes() + offset);

    // Adiciona o número de dias fornecido ao objeto Date
    now.setDate(now.getDate() + dias);

    // Obtém a data em formato ISO8601
    const isoString: string = now.toISOString();

    // Retorna a data formatada
    return isoString;
}


export async function getCheckSumImage(imageUrl: string) {
    try {

        // Baixa os dados da imagem como buffer usando axios
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response.data, "binary");
        
        // Calcula o checksum MD5 da imagem
        const md5Checksum = crypto.createHash("md5").update(buffer).digest("hex");
        
        return md5Checksum;
    } catch (error) {
        console.error("Erro ao calcular o checksum da imagem:", error);
        throw error;
    }
}
