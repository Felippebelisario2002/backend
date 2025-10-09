const { MongoClient } = require("mongodb");

const url = "mongodb+srv://felippe_belisario:<db_password>@cluster0.8my4d42.mongodb.net/";

const client = new MongoClient(url);

async function conectarDb() {
  await client.connect();
  return client.db("agenda");
}

module.exports = { conectarDb };
