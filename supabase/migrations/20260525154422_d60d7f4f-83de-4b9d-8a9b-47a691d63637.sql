-- Explicit deny policies for demo_leads. Inserts happen via service-role
-- in the server function (submitDemoLead), which bypasses RLS. Client
-- access (anon + authenticated) is denied for all operations.

CREATE POLICY "Deny all client reads on demo_leads"
ON public.demo_leads
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "Deny all client inserts on demo_leads"
ON public.demo_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Deny all client updates on demo_leads"
ON public.demo_leads
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny all client deletes on demo_leads"
ON public.demo_leads
FOR DELETE
TO anon, authenticated
USING (false);