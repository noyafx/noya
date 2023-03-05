const { mkdirp } = require("mkdirp");
const Database = require("simple-json-db");

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

    const voiceChannel = client.channels.cache.get("1081933594710253578");
    await client.player.play(voiceChannel, "https://www.youtube.com/live/jfKfPfyJRdk");
  }
};
