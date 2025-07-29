import { PgInsertBase, pgTable, serial, text} from "drizzle-orm/pg-core";

export const createSession = pgTable("session", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
});

