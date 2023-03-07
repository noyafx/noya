module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot) return;
    const prefix = message.client.config.get("prefix");
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift();
    } else {
      if (message.content && (message.channelId === "1082299628835311696")) {
        if (message.client.openai.usableAt > Date.now()) return;
        message.client.openai.usableAt = Date.now() + 1000;

        const mainDialogue = "Noya: Hai, nama aku noya";
        const cache = await message.guild.chatbotCache.get("chats");
        if (!cache.includes(mainDialogue)) cache.push(mainDialogue);
        cache.push(`User: ${message.content}`);

        const { data: { choices } } = await message.client.openai.createCompletion({
          model: "text-davinci-003",
          prompt: `${cache.join("\n")}Noya: `,
          temperature: 0.5,
          max_tokens: 60,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0,
          stop: ["User:"]
        });

        try {
          const result = choices[Math.floor(Math.random() * choices.length)].text;
          await message.reply({
            content: result
          });
          cache.push(`Noya: ${result.replace("\n", "")}`);
          await message.guild.chatbotCache.set(cache);
          await process.exit(0);
        } catch {}
      }
    }
  }
};
