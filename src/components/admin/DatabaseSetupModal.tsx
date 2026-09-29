import React, { useState } from "react";
import { Database, CheckCircle2, AlertTriangle, Copy, Check, ExternalLink, X, RefreshCw, Server, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface DatabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  dbHealth: {
    connected: boolean;
    projectsTable: boolean;
    invoicesTable: boolean;
    leadsTable: boolean;
    error?: string;
  } | null;
  onRecheck: () => Promise<void>;
}

const SQL_MIGRATION_CODE = `-- 1. Create or update projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id text NOT NULL PRIMARY KEY,
  title text NOT NULL,
  client_name text NOT NULL,
  client_company text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  client_whatsapp text,
  services jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'discovery',
  priority text NOT NULL DEFAULT 'medium',
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  target_launch_date date,
  budget numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  description text DEFAULT '',
  requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  milestones jsonb NOT NULL DEFAULT '[]'::jsonb,
  media_files jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Create or update invoices table with full advance payment fields
CREATE TABLE IF NOT EXISTS public.invoices (
  id text NOT NULL PRIMARY KEY,
  invoice_number text NOT NULL UNIQUE,
  client_name text NOT NULL,
  client_company text NOT NULL,
  client_email text NOT NULL,
  client_address text,
  issue_date date NOT NULL DEFAULT CURRENT_DATE,
  due_date date NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  currency text NOT NULL DEFAULT 'USD',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal numeric NOT NULL DEFAULT 0,
  tax_percent numeric NOT NULL DEFAULT 0,
  tax_amount numeric NOT NULL DEFAULT 0,
  discount_amount numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  advance_amount numeric NOT NULL DEFAULT 0,
  advance_percent numeric NOT NULL DEFAULT 0,
  balance_due numeric NOT NULL DEFAULT 0,
  payment_method text DEFAULT 'N/A',
  notes text,
  payment_instructions text,
  last_sent_at timestamptz,
  sent_to_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Add advance payment columns if invoices table already existed
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'advance_amount') THEN
    ALTER TABLE public.invoices ADD COLUMN advance_amount numeric NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'advance_percent') THEN
    ALTER TABLE public.invoices ADD COLUMN advance_percent numeric NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'balance_due') THEN
    ALTER TABLE public.invoices ADD COLUMN balance_due numeric NOT NULL DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'payment_method') THEN
    ALTER TABLE public.invoices ADD COLUMN payment_method text DEFAULT 'N/A';
  END IF;
END $$;

-- 4. Create or update demo_leads table
CREATE TABLE IF NOT EXISTS public.demo_leads (
  id text NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email text NOT NULL,
  full_name text NOT NULL,
  company text NOT NULL,
  company_size text NOT NULL,
  source text DEFAULT 'Website Inbound',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;

-- 6. Grant read/write access to anon & authenticated roles
DROP POLICY IF EXISTS "Allow all for projects" ON public.projects;
CREATE POLICY "Allow all for projects"
  ON public.projects FOR ALL
  TO anon, authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for invoices" ON public.invoices;
CREATE POLICY "Allow all for invoices"
  ON public.invoices FOR ALL
  TO anon, authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for demo_leads" ON public.demo_leads;
CREATE POLICY "Allow all for demo_leads"
  ON public.demo_leads FOR ALL
  TO anon, authenticated
  USING (true) WITH CHECK (true);`;

export function DatabaseSetupModal({ isOpen, onClose, dbHealth, onRecheck }: DatabaseSetupModalProps) {
  const [copied, setCopied] = useState(false);
  const [rechecking, setRechecking] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SQL_MIGRATION_CODE);
    setCopied(true);
    toast.success("SQL Schema copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRecheckClick = async () => {
    setRechecking(true);
    try {
      await onRecheck();
      toast.success("Database status refreshed!");
    } catch {
      toast.error("Failed to check database status");
    } finally {
      setRechecking(false);
    }
  };

  const isFullyConnected = Boolean(dbHealth?.connected);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200"
      data-lenis-prevent="true"
    >
      <div
        className="relative flex flex-col w-full max-w-2xl max-h-[92vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-100"
        data-lenis-prevent="true"
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isFullyConnected ? "bg-emerald-950 text-emerald-400" : "bg-amber-950 text-amber-400"}`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Supabase Cloud Database Setup</span>
                {isFullyConnected ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-semibold">
                    CONNECTED &amp; SYNCED
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 font-semibold">
                    SQL SETUP REQUIRED
                  </span>
                )}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Sync all projects, invoices, and advance payments across every device
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 custom-scrollbar">
          {/* Status Overview Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block">Projects Table</span>
              <div className="flex items-center gap-1.5 mt-1">
                {dbHealth?.projectsTable ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className={`text-xs font-mono font-bold ${dbHealth?.projectsTable ? "text-emerald-400" : "text-amber-400"}`}>
                  {dbHealth?.projectsTable ? "Active" : "Missing"}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block">Invoices Table</span>
              <div className="flex items-center gap-1.5 mt-1">
                {dbHealth?.invoicesTable ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className={`text-xs font-mono font-bold ${dbHealth?.invoicesTable ? "text-emerald-400" : "text-amber-400"}`}>
                  {dbHealth?.invoicesTable ? "Active" : "Missing"}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block">Leads Table</span>
              <div className="flex items-center gap-1.5 mt-1">
                {dbHealth?.leadsTable ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className={`text-xs font-mono font-bold ${dbHealth?.leadsTable ? "text-emerald-400" : "text-amber-400"}`}>
                  {dbHealth?.leadsTable ? "Active" : "Missing"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Setup Instructions */}
          {!isFullyConnected && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-amber-400" />
                <span>To Enable Cloud Sync Across All Devices:</span>
              </div>
              <ol className="list-decimal list-inside text-xs text-neutral-300 space-y-1.5 leading-relaxed pl-1">
                <li>
                  Click <strong className="text-brand-lime">Copy SQL Schema</strong> below.
                </li>
                <li>
                  Open your{" "}
                  <a
                    href="https://supabase.com/dashboard/project/dqzaibawseoleperxswk/sql/new"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 underline font-semibold inline-flex items-center gap-1 hover:text-sky-300"
                  >
                    Supabase SQL Editor <ExternalLink className="w-3 h-3 inline" />
                  </a>
                  .
                </li>
                <li>Paste the query and click <strong className="text-white">Run</strong>.</li>
                <li>Come back here and click <strong className="text-emerald-400">Verify Connection</strong>!</li>
              </ol>
            </div>
          )}

          {/* SQL Snippet View */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-neutral-400">
                SQL Migration Query (supabase/migrations/20260930000000_cloud_database_schema.sql)
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy SQL"}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[11px] overflow-x-auto max-h-56 leading-relaxed select-all">
              {SQL_MIGRATION_CODE}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-t border-neutral-800 bg-neutral-950">
          <a
            href="https://supabase.com/dashboard/project/dqzaibawseoleperxswk/sql/new"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
          >
            <span>Open Supabase SQL Editor</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRecheckClick}
              disabled={rechecking}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-lime hover:bg-[#bef264] text-stone-950 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${rechecking ? "animate-spin" : ""}`} />
              <span>Verify Connection</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
