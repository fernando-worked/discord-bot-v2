<<<<<<< HEAD
import { Component } from "@/discord/base";
import { valoresSelectUsuarioRelatorio } from "../selects/membros";
import { mapInteracaoRelatorio } from "@/discord/commands/relatorio";
=======

import { Component } from "@/discord/base";
import { mapInteracaoRelatorio } from "@/discord/commands/relatorio";
import { valoresSelectUsuarioRelatorio } from "../selects/membros";

>>>>>>> e31341d5bfe78d554f0759f5b622a994a5874d08

new Component({
    customId: "btn_cancelar_relatorio",
    type: "Button", cache: "cached",
    async run(interaction) {
<<<<<<< HEAD

=======
>>>>>>> e31341d5bfe78d554f0759f5b622a994a5874d08
        mapInteracaoRelatorio.get(interaction.user.id)!.forEach(async (elemento, index) => {
            elemento.delete();
            mapInteracaoRelatorio.get(interaction.user.id)!.splice(index, 1);
        });

        valoresSelectUsuarioRelatorio.delete(interaction.user.id);

<<<<<<< HEAD
    },
=======
    }, 
>>>>>>> e31341d5bfe78d554f0759f5b622a994a5874d08
});