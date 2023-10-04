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