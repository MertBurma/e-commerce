const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

async function open() {
  return sqlite.open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
}

async function setup() {
  const db = await open();
  await db.migrate({ force: "last", migrationsPath: "./lib/migrations" });
}

setup();

module.exports = open;
