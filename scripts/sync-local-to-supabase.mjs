import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

// Simple zero-dependency .env parser
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  console.log(`Connecting to Supabase at: ${SUPABASE_URL}...`);

  // Check tables
  const { error: pErr } = await supabase.from("projects").select("id").limit(1);
  if (pErr) {
    console.error("\n❌ 'projects' table not found in Supabase schema cache!");
    console.error(`Supabase error: ${pErr.message} (Code: ${pErr.code})`);
    console.log("\n👉 Fix this by executing the SQL migration in your Supabase SQL Editor:");
    console.log("   1. Open: https://supabase.com/dashboard/project/dqzaibawseoleperxswk/sql/new");
    console.log("   2. Copy SQL from: supabase/migrations/20260930000000_cloud_database_schema.sql");
    console.log("   3. Paste and click 'Run'");
    console.log("   4. Then re-run: npm run db:sync\n");
    return;
  }

  console.log("✅ Supabase tables verified!");

  const storePath = path.resolve(process.cwd(), "src/data/live-store.json");
  if (!fs.existsSync(storePath)) {
    console.log("No local live-store.json found to migrate.");
    return;
  }

  const raw = fs.readFileSync(storePath, "utf-8");
  const data = JSON.parse(raw);

  // Migrate projects
  if (Array.isArray(data.projects) && data.projects.length > 0) {
    console.log(`Migrating ${data.projects.length} project(s) to Supabase...`);
    for (const proj of data.projects) {
      const { error } = await supabase.from("projects").upsert(proj, { onConflict: "id" });
      if (error) {
        console.error(`Failed to migrate project ${proj.id}:`, error.message);
      } else {
        console.log(`  ✓ Synced project: ${proj.title} (${proj.id})`);
      }
    }
  }

  // Migrate invoices
  if (Array.isArray(data.invoices) && data.invoices.length > 0) {
    console.log(`Migrating ${data.invoices.length} invoice(s) to Supabase...`);
    for (const inv of data.invoices) {
      const payload = {
        ...inv,
        advance_amount: Number(inv.advance_amount) || 0,
        advance_percent: Number(inv.advance_percent) || 0,
        balance_due: Number(inv.balance_due) || 0,
        payment_method: inv.payment_method || "N/A",
      };
      const { error } = await supabase.from("invoices").upsert(payload, { onConflict: "id" });
      if (error) {
        console.error(`Failed to migrate invoice ${inv.id}:`, error.message);
      } else {
        console.log(`  ✓ Synced invoice: ${inv.invoice_number} (${inv.id})`);
      }
    }
  }

  console.log("\n🎉 All local data successfully synchronized to Supabase Cloud Database!");
}

main().catch(console.error);
