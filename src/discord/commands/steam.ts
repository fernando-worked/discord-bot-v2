
import { ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, InteractionResponse, ModalBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import { Command } from "../base";
import { openDb } from "@/data/openDb";


const steamRole = "1162228916514205697";

new Command({
    name: "steam", 
    dmPermission,
    description: "Configure a sua Steam!",
    type: ApplicationCommandType.ChatInput,
    options:[
        {
            name: "steamid",
            description: "Informe o código númerico do seu Steam ID",
            type: ApplicationCommandOptionType.String,
            required: true,
        }
            
    ],
    
    async run(interaction){
        
        const steamId = interaction.options.getString("steamid", true);

        if(!isValidSteamId(steamId)) return interaction.reply({content: "Forneça um Steam ID válido!", ephemeral: true});

        setSteam(interaction.user.id, steamId);

        const role = interaction.guild.roles.cache.get(steamRole);
        const { member } = interaction;

        if(role) member.roles.add(role);

        interaction.reply({content: `A sua Steam é ${steamId}`, ephemeral: true});
       
    },
    
});

new Command({
    name: "Steam", 
    dmPermission,
    type: ApplicationCommandType.User,
    
    async run(interaction){

        const {targetMember} = interaction;

        if(!targetMember.roles.cache.has(steamRole)) 
        return interaction.reply({content: `O usuário ${targetMember.user.displayName} não possui uma Steam configurada!`,ephemeral: true});

        const steamId = await getSteam(targetMember.id);
        interaction.reply({content: `Steam do membro ${targetMember.user.displayName}: ${steamId}`});
       
    },
    
});

const setSteam = async (memberId: string, steamId: string)=> {
    const db = await openDb();
    let sql;

    sql = "select steamid from steam where memberid = ?";
    const result = await db.all(sql, [memberId]);

    if(result.length == 0){
        sql = "INSERT into steam (memberid, steamid) values (?,?)";
        await db.all(sql, [memberId, steamId]);
    }else{
        sql = "UPDATE steam set steamid = ? where memberid = ?";
        await db.all(sql, [steamId, memberId]);
    }

    db.close();
};

const getSteam = async (memberId: string) => {
    const db = await openDb();
    let sql;

    sql = "select steamId from steam where memberid = ?";
    const result = await db.all(sql, [memberId]);

    db.close();

    return result[0].steamId;
    
};

function isValidSteamId(steamId: string): boolean {

    /* Função temporariamente desabilitada */

    return true;

    // Verifica se o Steam ID é uma string não vazia
    if (steamId.length === 0) {
        return false;
    }

    // Verifica se o Steam ID possui exatamente 17 caracteres
    if (steamId.length !== 17) {
        return false;
    }

    // Verifica se o Steam ID é um número válido
    const steamIdBigInt = BigInt(steamId);
    if (steamIdBigInt.toString() !== steamId) {
        return false;
    }

    // Verifica se o Steam ID possui o formato correto para Steam IDs válidos
    const steamIdFormatRegex = /^(76|77)([0-9]{15})$/;
    if (!steamId.match(steamIdFormatRegex)) {
        return false;
    }

    // Se todas as verificações passaram, o Steam ID é válido
    return true;
}
