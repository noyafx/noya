const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

for (const file of readdirSync("./src/events")) {
  const event = require(`./events/${file}`);
  client[event.once ? "once" : "on"](event.name, (...args) => event.execute(...args));
};

client.login(process.env.DISCORD_TOKEN);
