import { Component } from "@/discord/base";
import { addPontos } from "@/functions/pontos/addPontos";


let responsavelId: string[] = [];
let membrosId: string[] = [];
let tipos: string[] = [];
let tags: string[] = [];
let interacao: string;

new Component({ /* slc_responsavel */
    customId: "slc_responsavel",
    cache: "cached",
    type: "UserSelect",
    async run(interaction) {

        const {members} = interaction;

        responsavelId = [];
        members.forEach((member) => {
            // Fazer algo com o membro atual, por exemplo, imprimir o apelido
            responsavelId.push(member.id);
        });

        interaction.reply({ephemeral: true, content: "Responsável selecionado!"});

        // do things...
    },
});

new Component({ /* slc_membros */
    customId: "slc_membros",
    cache: "cached",
    type: "UserSelect",
    async run(interaction) {

        const {members} = interaction;

        membrosId = [];
        members.forEach((member) => {
            // Fazer algo com o membro atual, por exemplo, imprimir o apelido
            membrosId.push(member.id);
        });


        interaction.reply({ephemeral: true, content: "Membros selecionados!"});

        // do things...
    },
});

new Component({ /* btn_cancel_pontos */
    customId: "btn_cancel_pontos",
    cache: "cached",
    type: "Button",
    async run(interaction) {
        interaction.reply({ephemeral: true, content: "Clicou em Cancelar"});

        // do things...
    },
});

new Component({ /* btn_submit_pontos */
    customId: "btn_submit_pontos",
    cache: "cached",
    type: "Button",
    async run(interaction) {
        interaction.reply({ephemeral: true, content: "Clicou no Submit"});

        console.log(interaction);
        
        addPontos(responsavelId, membrosId, tipos, tags);

        responsavelId = [];
        membrosId = [];
        tipos = [];
        tags = [];

    },
});

new Component({ /* slc_tipo */
    customId: "slc_tipo",
    cache: "cached",
    type: "StringSelect",
    async run(interaction) {

        tipos = [];
        interaction.values.forEach((value) => {
            // Fazer algo com o membro atual, por exemplo, imprimir o apelido
            tipos.push(value);
        });

        interaction.reply({ephemeral: true, content: "Clicou em Cancelar"});
    },
});

new Component({ /* slc_tags */
    customId: "slc_tags",
    cache: "cached",
    type: "StringSelect",
    async run(interaction) {
        tags = [];
        interaction.values.forEach((value) => {
            // Fazer algo com o membro atual, por exemplo, imprimir o apelido
            tags.push(value);
        });

        interaction.reply({ephemeral: true, content: "Clicou em Cancelar"});
    },
});