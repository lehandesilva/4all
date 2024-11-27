const drizzle = require("drizzle-orm/postgres-js");
const migrate = require("drizzle-orm/postgres-js/migrator");
const postgres = require("postgres");
const dotenv = require("dotenv");

dotenv.config();

const URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const migrationClient = postgres(URL, {
  max: 1,
});

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/drizzle/migrations",
  });

  await migrationClient.end();
}

main();
