const { readdirSync } = require("node:fs");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ],
  presence: {
    activities: [
      { name: "GitHub🐈‍⬛" }
    ]
  }
});

client.commands = new Collection();

for (const file of readdirSync("./src/events")) {
  const event = require(`./events/${file}`);
  client[event.once ? "once" : "on"](event.name, (...args) => event.execute(...args));
};

client.login(process.env.DISCORD_TOKEN);
setTimeout(() => process.exit(0), 4 * 60 * 60 * 1000);
// 4 * 60 * 60 * 1000
