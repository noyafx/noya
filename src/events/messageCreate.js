module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;
    const prefix = message.client.config.get("prefix");
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift();
    } else {
      if (message.mentions.has(message.client.user.id, { ignoreEveryone: true, ignoreRoles: true })) await message.reply({
        content: "naon?"
      });
    }
  }
};
