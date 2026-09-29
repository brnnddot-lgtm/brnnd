import React, { useState } from "react";
import { sendTestEmailFn } from "@/lib/admin.functions";
import { SUPPORTED_CURRENCIES } from "@/lib/invoice-pdf";
import {
  ShieldCheck,
  Database,
  Send,
  Copy,
  Check,
  RotateCcw,
  Download,
  Loader2,
  Server,
  DollarSign,
  Coins,
} from "lucide-react";
import { toast } from "sonner";

interface SettingsTabProps {
  onResetData: () => void;
  onExportData: () => void;
}

export function SettingsTab({ onResetData, onExportData }: SettingsTabProps) {
  const [testEmailTarget, setTestEmailTarget] = useState("hello@brnnd.com");
  const [sendingTest, setSendingTest] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [studioCurrency, setStudioCurrency] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("brnnd_default_currency") || "BDT";
    }
    return "BDT";
  });

  const handleCurrencyChange = (newCurrency: string) => {
    setStudioCurrency(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("brnnd_default_currency", newCurrency);
    }
    toast.success(`Studio default currency updated to ${newCurrency}`);
  };

  const supabaseUrl = "https://dqzaibawseoleperxswk.supabase.co";
  const supabaseKey = "Connected via .env";
  const resendSender = "hello@brnnd.com";

  const sqlSchema = `-- BRNND Supabase Schema for Invoices & Leads
CREATE TABLE IF NOT EXISTS public.demo_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  full_name text NOT NULL,
  company text NOT NULL,
  company_size text NOT NULL,
  source text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
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
  notes text,
  payment_instructions text,
  last_sent_at timestamptz,
  sent_to_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on demo_leads" ON public.demo_leads FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on invoices" ON public.invoices FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    toast.success("SQL Schema copied to clipboard!");
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingTest(true);
    try {
      const res = await sendTestEmailFn({
        data: { targetEmail: testEmailTarget.trim() },
      });
      if (res.success) {
        toast.success(`Test verification email dispatched to ${testEmailTarget} via Resend!`);
      }
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to deliver test email.");
    } finally {
      setSendingTest(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">System Integrations & Settings</h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Studio billing currency, Resend email status, Supabase cloud configuration, and maintenance tools
        </p>
      </div>

      {/* Studio Currency Preferences Card */}
      <div className="p-6 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-lime/10 border border-brand-lime/25 text-brand-lime">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Studio Default Currency &amp; Invoicing</h3>
              <p className="text-xs text-neutral-400">
                Default currency for new client projects, contracts, and advance invoices
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-brand-lime/10 text-brand-lime border border-brand-lime/30 font-bold self-start sm:self-auto">
            Active: {studioCurrency}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {SUPPORTED_CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleCurrencyChange(c.code)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                studioCurrency === c.code
                  ? "bg-brand-lime/10 border-brand-lime/60 ring-1 ring-brand-lime/30 text-white"
                  : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold font-mono text-white">{c.symbol} {c.code}</span>
                {studioCurrency === c.code && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-lime text-stone-950 font-bold">
                    DEFAULT
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-1">{c.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Resend Card */}
      <div className="p-6 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-lime/10 border border-brand-lime/25 text-brand-lime">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Resend Email Delivery</h3>
              <p className="text-xs text-neutral-400">PDF invoice distribution & client communications</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Domain Verified: brnnd.com
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
            <span className="text-[11px] font-mono uppercase text-neutral-400">Sender Identity</span>
            <div className="font-mono text-xs font-semibold text-white mt-1">
              BRNND Studio &lt;{resendSender}&gt;
            </div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
            <span className="text-[11px] font-mono uppercase text-neutral-400">Resend API Key</span>
            <div className="font-mono text-xs text-emerald-400 mt-1">
              Active (Configured in .env)
            </div>
          </div>
        </div>

        {/* Send Test Email form */}
        <form onSubmit={handleSendTestEmail} className="pt-2">
          <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
            Test Resend Integration Email
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={testEmailTarget}
              onChange={(e) => setTestEmailTarget(e.target.value)}
              placeholder="hello@brnnd.com"
              className="flex-1 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:border-brand-lime focus:ring-1 focus:ring-brand-lime/30 focus:outline-none"
            />
            <button
              type="submit"
              disabled={sendingTest}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {sendingTest ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Sending Test...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-brand-lime" />
                  Dispatch Test Email
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Supabase Card */}
      <div className="p-6 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Supabase Cloud Database</h3>
              <p className="text-xs text-neutral-400">PostgreSQL backend for demo_leads & invoices</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/30">
            <Server className="w-3.5 h-3.5" /> Connected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
            <span className="text-[11px] font-mono uppercase text-neutral-400">Supabase Project URL</span>
            <div className="font-mono text-xs text-white truncate mt-1">{supabaseUrl}</div>
          </div>

          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800">
            <span className="text-[11px] font-mono uppercase text-neutral-400">Publishable Key</span>
            <div className="font-mono text-xs text-neutral-300 mt-1">
              {supabaseKey.slice(0, 15)}...{supabaseKey.slice(-6)}
            </div>
          </div>
        </div>

        {/* Copyable SQL Schema */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-neutral-400">
              Supabase SQL Migration Script
            </span>
            <button
              type="button"
              onClick={handleCopySql}
              className="inline-flex items-center gap-1 text-xs font-mono text-brand-lime hover:underline transition-colors cursor-pointer"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSql ? "Copied!" : "Copy SQL"}
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-400 overflow-x-auto max-h-40 leading-relaxed">
            {sqlSchema}
          </pre>
        </div>
      </div>

      {/* Data Management Card */}
      <div className="p-6 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Data Management</h3>
          <p className="text-xs text-neutral-400">Backup, restore, and local caching</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={onExportData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            Export Data as JSON
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm("Reset all invoices and leads back to default studio sample data?")) {
                onResetData();
                toast.success("Invoices & Leads restored to defaults.");
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
            Reset to Sample Data
          </button>
        </div>
      </div>
    </div>
  );
}
