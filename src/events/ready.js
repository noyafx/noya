module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`* Connected as ${client.user.tag}`);
  }
}
