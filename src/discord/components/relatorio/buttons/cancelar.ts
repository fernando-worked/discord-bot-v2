import { Component } from "@/discord/base";
import { valoresSelectUsuarioRelatorio } from "../selects/membros";
import { mapInteracaoRelatorio } from "@/discord/commands/relatorio";

new Component({
    customId: "btn_cancelar_relatorio",
    type: "Button", cache: "cached",
    async run(interaction) {

        mapInteracaoRelatorio.get(interaction.user.id)!.forEach(async (elemento, index) => {
            elemento.delete();
            mapInteracaoRelatorio.get(interaction.user.id)!.splice(index, 1);
        });

        valoresSelectUsuarioRelatorio.delete(interaction.user.id);

    },
}); 