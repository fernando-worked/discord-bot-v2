import { Event } from "@discord/base";

new Event({
    name: "guildMemberAdd",
    run(member) {
        const canalGeral = member.guild.channels.cache.get(Canais.GERAL); // Supondo que Canais.GERAL contenha o ID do canal geral

        /* Melhorar formato para EMBED */
        if(canalGeral && canalGeral.isTextBased())
        canalGeral.send({content: `Olá ${member}! Seja bem vindo ao servidor SWAT BR, um servidor focado em roleplay. Leia nossas regras e divirta-se!`});

        for(let cargo in CargosIniciais){
            const role = member.guild.roles.cache.get(cargo);
            if(role) member.roles.add(role);
        }
    },
});