import { ApplicationCommandType } from "discord.js";
import { Command } from "../base";

const inviteLink = "https://discord.gg/DfauBqkRr4";

new Command({
    name: "convite", 
    dmPermission,
    description: "Retorna o link de convite para esse servidor",
    type: ApplicationCommandType.ChatInput,
    
    async run(interaction){
        
        interaction.reply({content: `Convite: ${inviteLink}`,ephemeral: true});
       
    },
    
});