import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || undefined,
  database: process.env.PGDATABASE || "school",
});

pool.on("error", (err) => {
  console.error("Unexpected PG pool error", err);
  process.exit(-1);
});

export default pool;
