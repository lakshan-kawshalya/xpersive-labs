/**
 * Node.js-based schema push — uses pg driver directly instead of prisma db push
 * (prisma db push uses a Rust binary that may be blocked by Windows Firewall)
 *
 * Usage: npm run db:push:node -w @xpersive/db
 */
import { Pool } from "pg";
import { execSync } from "node:child_process";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: join(__dirname, ".env") });

const PRISMA_BIN = join(__dirname, "../../node_modules/prisma/build/index.js");
const SCHEMA = join(__dirname, "prisma/schema.prisma");

async function main() {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error("DIRECT_URL or DATABASE_URL not set in packages/db/.env");

  if (!existsSync(SCHEMA)) throw new Error(`Schema not found: ${SCHEMA}`);

  // Generate full SQL migration from schema (no network needed)
  // Use --output to write SQL to a temp file so Prisma's console banner doesn't contaminate the SQL
  const tmpSql = join(tmpdir(), `prisma-push-${Date.now()}.sql`);
  console.log("Generating schema SQL...");
  execSync(
    `node "${PRISMA_BIN}" migrate diff --from-empty --to-schema "${SCHEMA}" --script --output "${tmpSql}"`,
    { cwd: __dirname, stdio: "inherit" }
  );

  const sql = readFileSync(tmpSql, "utf8");
  unlinkSync(tmpSql);

  if (!sql.trim()) throw new Error("No SQL generated from schema");

  // Connect via Node.js pg driver and apply
  console.log("Connecting to database...");
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();

  try {
    console.log("Applying schema (CREATE IF NOT EXISTS strategy)...");
    // Wrap in a transaction — if tables already exist some stmts may fail,
    // so run each statement individually and skip "already exists" errors
    const statements = sql.split(/;(\r?\n)+/).filter((s) => s.trim());

    let created = 0;
    let skipped = 0;
    for (const stmt of statements) {
      const trimmed = stmt.trim();
      if (!trimmed) continue;
      try {
        await client.query(trimmed);
        created++;
      } catch (err: any) {
        // 42P07 = duplicate_table, 42710 = duplicate_object (enum already exists)
        if (err.code === "42P07" || err.code === "42710") {
          skipped++;
        } else {
          throw err;
        }
      }
    }

    console.log(`\nSchema push complete: ${created} applied, ${skipped} already existed.`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
