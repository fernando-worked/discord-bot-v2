import { Canais, cargosIniciais } from "@/settings/constants/enum";
import { Event } from "@discord/base";
import { EmbedBuilder } from "discord.js";

new Event({
    name: "guildMemberAdd",
    run(member) {
        const canalGeral = member.guild.channels.cache.get(Canais.GERAL); 
        
        const embed = new EmbedBuilder()
        .setTitle("Seja bem vindo ao servidor SWAT BR")
        .setDescription(`O primeiro e único servidor roleplay de Ready or Not Brasileiro!

        Em nosso servidor, você pode fazer o CURSO CQB e diversos outros para aprender e aumentar a sua imersão no jogo. Você também pode usar o comando /relatorio para anexar a imagem que aparece no fim da missão e acumular pontos, para subir sua patente e obter medalhas exclusivas.
        ${member}, aqui vão algumas dicas para você!`)
        .setFields([
            {
                name: "Adicione sua Steam",
                value: "Digite /steam", 
            },
            {
                name: "Informe seu relatório",
                value: "Digite /relatorio", 
            },
        ])
        .setColor("DarkGrey");

        if(canalGeral && canalGeral.isTextBased())
        canalGeral.send({embeds: [embed]});
    
        
        for (let cargo of cargosIniciais) {
            
            const role = member.guild.roles.cache.get(cargo);
            
            if (role) {
                member.roles.add(role);
            }
        }
    },
});