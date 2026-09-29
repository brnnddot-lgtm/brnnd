-- Complete Cloud Database Schema for BRNND Studio Admin
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/dqzaibawseoleperxswk/sql)

-- 1. Create or update projects table
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

-- 2. Create or update invoices table with full advance payment & deliverable fields
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

-- 6. Grant read/write access to anon & authenticated roles so admin operations succeed
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
  USING (true) WITH CHECK (true);
