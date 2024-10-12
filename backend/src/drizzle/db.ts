import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

console.log(process.env.POSTGRES_URL as string);

const client = postgres(process.env.POSTGRES_URL as string);
export const db = drizzle(client);
