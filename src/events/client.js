export const ready = {
  name: "ready",
  once: true,
  async execute(client) {
    await console.log(`* Connected as ${client.user.tag}`);
  }
}
