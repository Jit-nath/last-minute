import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema/schema.ts",
  out: "./db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ssl: false,
  },
} satisfies Config;
