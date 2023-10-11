import { Component } from "@/discord/base";
import { aprovarRelatorio } from "@/functions/relatorio/aprovarRelatorio";


new Component({
    customId: "btn_aprovar_relatorio",
    type: "Button", cache: "cached",
    async run(interaction) {
        const avaliadorRoleId = "1161009949376262194";
        const member = interaction.guild.members.cache.get(interaction.user.id); // Obtém o objeto do membro

        if(!member?.roles.cache.has(avaliadorRoleId)) return interaction.reply({ephemeral: true, content: "Você não é um avaliador. Aguarde um avaliador."});

        aprovarRelatorio(interaction);

    }, 
});