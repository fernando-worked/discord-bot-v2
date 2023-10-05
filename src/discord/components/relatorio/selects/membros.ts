import { Component } from "@/discord/base";

let membrosRelatorio: string[] = [];
export let valoresSelectUsuarioRelatorio: Map<string, string[]> = new Map();

new Component({
    customId: "slc_membro_relatorio",
    type: "UserSelect", cache: "cached",
    async run(interaction) {

        const {members} = interaction;

        membrosRelatorio = [];
        membrosRelatorio.push(interaction.user.id);

        members.forEach((member) => {
            if(member.id != interaction.user.id){
                membrosRelatorio.push(member.id);
            }
        });
        valoresSelectUsuarioRelatorio.set(interaction.user.id, membrosRelatorio);

        const interacaoSlcMembros = interaction.deferReply();
        (await interacaoSlcMembros).delete();
    },
});