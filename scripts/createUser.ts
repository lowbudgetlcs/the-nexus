import argon2 from 'argon2';
import Database from 'better-sqlite3';
import 'dotenv/config';

const user = process.argv[2];
if (user === undefined || user === null) {
  console.log("No username provided.");
  process.exit(1);
}
const pass = process.argv[3];
if (pass === undefined || pass === null) {
  console.log("No password provided.");
  process.exit(1);
}

try {
  const pepper = process.env.PASSWORD_PEPPER;
  if (!pepper) throw Error("No password pepper set.");
  const hash = await argon2.hash(pass, { secret: Buffer.from(pepper) });
  const db = new Database("../sqlite.db");
  const insert = db.prepare(`
INSERT INTO users (username, password)
VALUES (?, ?)
  `);
  const res = insert.run(user, hash);
  console.log(`Created user ${res.lastInsertRowid}.`);
} catch (e) {
  console.log("Failed to create user:");
  console.log(e);
}
