module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;
    const prefix = message.client.config.get("prefix");
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift();
    } else {
      if (message.content && (message.channelId === "1082276400804929547")) {
        if (message.client.openai.usableAt > Date.now()) return;
        message.client.openai.usableAt = Date.now() + 1000;
        const { data: { choices } } = await message.client.openai.createCompletion({
          model: "text-davinci-002",
          prompt: message.content
        });
        try {
          await message.reply({
            content: choices[Math.floor(Math.random() * choices.length)]
          });
        } catch {}
      }
    }
  }
};
