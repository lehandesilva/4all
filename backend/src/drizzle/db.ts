import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

dotenv.config();

const client = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(client);
