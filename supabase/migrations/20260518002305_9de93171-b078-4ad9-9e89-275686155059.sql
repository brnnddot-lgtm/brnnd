
CREATE TABLE public.demo_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  full_name text NOT NULL,
  company text NOT NULL,
  company_size text NOT NULL,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public inserts (form is public)
CREATE POLICY "Anyone can submit a demo lead"
ON public.demo_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT policy: data is write-only from the client.
