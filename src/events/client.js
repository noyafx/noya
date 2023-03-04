export default {
  once: true,
  async execute(client) {
    await console.log(`* Connected as ${client.user.tag}`);
  }
}
