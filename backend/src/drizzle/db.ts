import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

const client = postgres(process.env.POSTGRES_URL as string);
export const db = drizzle(client);
