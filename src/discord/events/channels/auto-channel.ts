import { Canais, cargosIniciais } from "@/settings/constants/enum";
import { Event } from "@discord/base";
import { ChannelType, EmbedBuilder, PermissionOverwrites } from "discord.js";

const criarSquadId = "1204868157261742135";
const channelsNames = ["Squad Alpha","Squad Bravo","Squad Charlie","Squad Delta","Squad Echo","Squad Foxtrot","Squad Gold","Squad Hotel","Squad India","Squad Juliett","Squad Kilo","Squad Lima","Squad Metro"];

new Event({
    name: "voiceStateUpdate",
    async run(oldState, newState) {
        const { guild, channel, member } = oldState;
        const criarSquad = guild.channels.cache.get(criarSquadId);

        if(!criarSquad?.isVoiceBased()) return;

        if(!member) return;

        //onLeave
        if(channel?.name && channelsNames.includes(channel?.name)){
            if(channel.members.size == 0){
                channel?.delete();
            }
        }

        //onJoin
        if(newState.channelId && newState.channelId == criarSquadId){

            const canaisDeVoz = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice);
            const nomesDosCanaisDeVoz = canaisDeVoz.map(channel => channel.name);

            const nomeDaSala = channelsNames.find(channelName => !nomesDosCanaisDeVoz.includes(channelName))!;

            guild.channels.

            guild.channels.create({
                name: nomeDaSala,
                parent: criarSquad.parentId,
                type: ChannelType.GuildVoice
                
            }).then(voiceChannel => {
                member.voice.setChannel(voiceChannel);
            }).catch((err =>{
                member.voice.disconnect();
            }));
        }


    },
});