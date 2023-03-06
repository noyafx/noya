const ytdl = require("ytdl-core");
const { mkdirp } = require("mkdirp");
const Database = require("simple-json-db");
const { createAudioResource, StreamType, createAudioPlayer, joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await client.application.fetch();
    console.log(`* Connected as ${client.user.tag}`);

    const configPath = `./database/clients/${client.application.id}/`;
    await mkdirp(configPath);
    client.config = new Database(`${configPath}config.json`, { jsonSpaces: 2 });

    await client.config.set("lastLogged", new Date());
    
    const vc = await client.channels.fetch("1081933594710253578");
    const connection = joinVoiceChannel({
      channelId: vc.id,
      guildId: vc.guildId,
      adapterCreator: vc.guild.voiceAdapterCreator
    });
    const stream = ytdl("https://www.youtube.com/watch?v=jfKfPfyJRdk", {
      filter: "audioonly",
      opusEncoded: true
    });
    const resource = createAudioResource(stream, {
      inputType: StreamType.Opus,
      inlineVolume: true
    });
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);
  }
};
