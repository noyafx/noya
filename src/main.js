import Database from "simple-json-db";
const db = new Database("./database/client.json");

(async () => {
  await db.set("sessionId", Date.now());
})();
