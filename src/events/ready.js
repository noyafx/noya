const { mkdirp } = require("mkdirp");
const Database = require("simple-json-db");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await client.application.fetch();
    console.log(` ${client.user.tag} siap bertugas!`);

    const configPath = `./database/clients/${client.application.id}/`;
    await mkdirp(configPath);
    client.config = new Database(`${configPath}config.json`, { jsonSpaces: 2 });

    await client.config.set("lastLogged", new Date());
    for (const guild of client.guilds.cache.map()) {
      config guildPath = `${configPath}guilds/${guild.id}/`;
      await mkdir(guildPath);
      guild.chatbotCache = new Database(`${guildPath}chatbot.json`);
    }
  }
};
