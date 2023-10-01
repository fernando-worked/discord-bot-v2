import { Component } from "@/discord/base";
import { addPontos } from "@/functions/pontos/addPontos";

let responsavelId: string[] = [];
let membrosId: string[] = [];
let tipos: string[] = [];
let tags: string[] = [];

/*TODO
    verificar melhor forma de validar o formulário


*/

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

        const interacao = await interaction.deferReply({ephemeral: true});
        interacao.delete();   


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


        const interacao = await interaction.deferReply({ephemeral: true});
        interacao.delete();    

        // do things...
    },
});

new Component({ /* btn_cancel_pontos */
    customId: "btn_cancel_pontos",
    cache: "cached",
    type: "Button",
    async run(interaction) {
        interaction.channel?.messages.delete(interaction.message.id);

    },
});

new Component({ /* btn_submit_pontos */
    customId: "btn_submit_pontos",
    cache: "cached",
    type: "Button",
    async run(interaction) {
        //interaction.channel?.messages.delete(interaction.message.id);

        interaction.reply({ephemeral: true, content: "Formulário submetido!"});

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

        const interacao = await interaction.deferReply({ephemeral: true});
        interacao.delete();   
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

        const interacao = await interaction.deferReply({ephemeral: true});
        interacao.delete();  
    },
});