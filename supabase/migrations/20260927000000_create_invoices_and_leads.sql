-- Create demo_leads table if not exists
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

-- Create invoices table
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

-- Enable RLS
ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Allow read/write for service role or anon if configured
CREATE POLICY IF NOT EXISTS "Allow all for demo_leads"
ON public.demo_leads FOR ALL
TO anon, authenticated
USING (true) WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow all for invoices"
ON public.invoices FOR ALL
TO anon, authenticated
USING (true) WITH CHECK (true);
