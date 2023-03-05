const { readdirSync } = require("node:fs");
const Database = require("simple-json-db");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
client.config = new Database("./database/client.json");

for (const file of readdirSync("./src/events")) {
  const event = require(`./events/${file}`);
  client[event.once ? "once" : "on"](event.name, (...args) => event.execute(...args));
};

client.login(process.env.DISCORD_TOKEN);
