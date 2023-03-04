import Database from "simple-json-db";

export const ready = {
  name: "ready",
  once: true,
  async execute(client) {
    for (const guild of client.guilds.cache) {
      guild.database = new Database(`./database/guilds/${guild.id}`);
    }
  }
}
