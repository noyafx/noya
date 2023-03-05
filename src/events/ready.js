const Database = require("simple-json-db");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await client.application.fetch();
    console.log(`* Connected as ${client.user.tag}`);
    client.config = new Database(`./database/clients/${client.application.id}/config.json`, { jsonSpaces: 2 });

    await client.config.set("lastLogged", new Date());
  }
};
