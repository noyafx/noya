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

        const cache = await message.guild.chatbotCache.get("chats");
        if (!cache.includes("Hai, aku noya")) await message.guild.chatbotCache.push("chats", "Hai, aku noya");
        await message.guild.chatbotCache.push("chats", `You: ${message.content}`);

        const texts = await message.guild.chatbotCache.get("chats");
        const { data: { choices } } = await message.client.openai.createCompletion({
          model: "text-davinci-003",
          prompt: `${texts.join("\n")}Friend: `,
          temperature: 0.5,
          max_tokens: 60,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0,
          stop: ["You:"]
        });

        try {
          const result = choices[Math.floor(Math.random() * choices.length)].text;
          await message.reply({
            content: result
          });
          await message.guild.chatbotCache.push("chats", `Friend: ${result}`);
        } catch {}
      }
    }
  }
};
