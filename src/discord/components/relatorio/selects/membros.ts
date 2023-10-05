import { Component } from "@/discord/base";

export let membrosRelatorio: string[] = [];
export let valoresSelectUsuarioRelatorio: Map<string, string[]> = new Map();

new Component({
    customId: "slc_membro_relatorio",
    type: "UserSelect", cache: "cached",
    async run(interaction) {

        const {members} = interaction;


        membrosRelatorio = [];
        members.forEach((member) => {

            membrosRelatorio.push(member.id);
        });
        valoresSelectUsuarioRelatorio.set(interaction.user.id, membrosRelatorio);


        if (!membrosRelatorio.includes(interaction.user.id)) {
            membrosRelatorio.push(interaction.user.id);
        }

        const interacaoSlcMembros = interaction.deferReply();
        (await interacaoSlcMembros).delete();
    },
});