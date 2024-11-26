import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

const URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: URL,
  },
  verbose: true,
  strict: true,
});
