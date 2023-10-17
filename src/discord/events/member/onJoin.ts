import { Event } from "@discord/base";
import { EmbedBuilder } from "discord.js";

new Event({
    name: "guildMemberAdd",
    run(member) {
        const canalGeral = member.guild.channels.cache.get(Canais.GERAL); 
        
        const embed = new EmbedBuilder()
        .setTitle(`${member}, seja bem vindo ao servidor SWAT BR`)
        .setDescription(`O primeiro e único servidor roleplay de Ready or Not Brasileiro!\n\n

        Em nosso servidor, você pode fazer o CURSO CQB e diversos outros para aprender e aumentar a sua imersão no jogo. Você também pode usar o comando /relatorio para anexar a imagem que aparece no fim da missão e acumular pontos, para subir sua patente e obter medalhas exclusivas.`)
        .setFields([
            {
                name: "Adicione sua Steam",
                value: "Digite /steam", 
            },
            {
                name: "Informe seu relatório",
                value: "Digite /relatorio", 
            },
            {
                name: "Precisa de ajuda?",
                value: "Digite /ajuda", 
            },
        ])
        .setColor("DarkGrey");

        if(canalGeral && canalGeral.isTextBased())
        canalGeral.send({embeds: [embed]});

        for(let cargo in CargosIniciais){
            const role = member.guild.roles.cache.get(cargo);
            if(role) member.roles.add(role);
        }
    },
});