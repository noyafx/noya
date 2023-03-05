const Database = require("simple-json-db");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`* Connected as ${client.user.tag}`);
    client.config = new Database(`./database/clients/${client.user.id}/config.json`, { jsonSpaces: 2 });
  }
};
