
-- Create companies table (from companymaster)
CREATE TABLE public.companies (
  id SERIAL PRIMARY KEY,
  company_id VARCHAR(256) NOT NULL,
  company_name VARCHAR(256) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  country_code VARCHAR(10) NOT NULL DEFAULT '000',
  tel VARCHAR(20) NOT NULL DEFAULT '',
  mobile VARCHAR(20) NOT NULL DEFAULT '',
  email VARCHAR(50) NOT NULL DEFAULT '',
  country VARCHAR(50) NOT NULL DEFAULT '',
  address_1 VARCHAR(100) NOT NULL DEFAULT '',
  address_2 VARCHAR(100) NOT NULL DEFAULT '',
  address_3 VARCHAR(100) NOT NULL DEFAULT '',
  status INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Policies: any authenticated user can read, admin can manage
CREATE POLICY "Authenticated users can read companies"
ON public.companies FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage companies"
ON public.companies FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create agents table (from agentmaster)
CREATE TABLE public.agents (
  id SERIAL PRIMARY KEY,
  agent_id VARCHAR(256) NOT NULL,
  company_id VARCHAR(256) NOT NULL,
  contact_name VARCHAR(50) NOT NULL,
  country_code VARCHAR(10) NOT NULL DEFAULT '0',
  mobile VARCHAR(20) NOT NULL DEFAULT '',
  email VARCHAR(50) NOT NULL DEFAULT '',
  user_type INTEGER NOT NULL DEFAULT 0,
  status INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read agents"
ON public.agents FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage agents"
ON public.agents FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create user_links table (from userlink)
CREATE TABLE public.user_links (
  id SERIAL PRIMARY KEY,
  master_id INTEGER NOT NULL,
  child_id INTEGER NOT NULL,
  status INTEGER NOT NULL DEFAULT 1
);

ALTER TABLE public.user_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read user_links"
ON public.user_links FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage user_links"
ON public.user_links FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
