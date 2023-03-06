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

        let cache = await message.guild.chatbotCache.get("chats");
        if (!cache) cache = await message.guild.chatbotCache.set("chats", []);
        if (cache.length >= 25) cache.shift();

        const prompt = [`Friend: Hai nama ku noya`].concat(cache);
        prompt.push(`You: ${message.content}\nFriend:`);

        const { data: { choices } } = await message.client.openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt.join("\n"),
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
          prompt.push(`You: ${message.content}`);
          prompt.push(`Friend: ${result}`);
          await cache.set(prompt);
        } catch {}
      }
    }
  }
};
