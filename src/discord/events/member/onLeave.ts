import { deleteUserData } from "@/data/deleteUserData";
import { Canais } from "@/settings/constants/enum";
import { Event } from "@discord/base";

new Event({
    name: "guildMemberRemove",
    run(member) {
        
        const canalGeral = member.guild.channels.cache.get(Canais.GERAL);

        if(canalGeral && canalGeral.isTextBased())
        canalGeral.send({content: `O membro ${member} deixou o servidor.`});

        deleteUserData(member.id);
    },
}); 