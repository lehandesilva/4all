import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
