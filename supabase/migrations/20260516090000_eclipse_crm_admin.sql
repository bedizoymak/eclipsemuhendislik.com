-- Eclipse Muhendislik CRM/admin schema.
-- Private CRM tables are protected by user_roles.has_role(..., 'admin').

alter table public.services
  add column if not exists category text,
  add column if not exists base_price numeric(14,2) not null default 0,
  add column if not exists pricing_type text not null default 'custom' check (pricing_type in ('fixed', 'monthly', 'hourly', 'custom')),
  add column if not exists is_active boolean not null default true,
  add column if not exists internal_notes text;

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_type text not null default 'company' check (customer_type in ('company', 'individual')),
  sector text,
  tax_office text,
  tax_number text,
  contact_person text,
  phone text,
  email text,
  website text,
  address text,
  notes text,
  status text not null default 'active' check (status in ('active', 'passive', 'prospect', 'blacklisted')),
  source text not null default 'other' check (source in ('referral', 'website', 'phone', 'social', 'existing_network', 'other')),
  tags text[] not null default '{}',
  last_contact_date date,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  prospect_name text not null,
  contact_person text,
  phone text,
  email text,
  source text not null default 'website' check (source in ('referral', 'website', 'phone', 'social', 'existing_network', 'other')),
  interested_service text,
  estimated_value numeric(14,2) not null default 0,
  probability int not null default 10 check (probability between 0 and 100),
  stage text not null default 'new' check (stage in ('new', 'contacted', 'meeting_scheduled', 'proposal_sent', 'negotiation', 'won', 'lost')),
  expected_close_date date,
  assigned_user uuid references auth.users(id),
  notes text,
  next_follow_up_date date,
  lost_reason text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects
  add column if not exists customer_id uuid references public.customers(id) on delete set null,
  add column if not exists related_lead_id uuid references public.leads(id) on delete set null,
  add column if not exists service_category text,
  add column if not exists project_status text not null default 'planning' check (project_status in ('planning', 'active', 'waiting_customer', 'waiting_supplier', 'completed', 'cancelled')),
  add column if not exists start_date date,
  add column if not exists deadline date,
  add column if not exists completion_date date,
  add column if not exists budget numeric(14,2) not null default 0,
  add column if not exists actual_cost numeric(14,2) not null default 0,
  add column if not exists profit_estimate numeric(14,2) not null default 0,
  add column if not exists priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  add column if not exists internal_notes text,
  add column if not exists progress_percentage int not null default 0 check (progress_percentage between 0 and 100),
  add column if not exists files_links text[] not null default '{}',
  add column if not exists crm_description text;

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  customer_id uuid references public.customers(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  ticket_id uuid,
  assigned_user uuid references auth.users(id),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'blocked', 'done', 'cancelled')),
  due_date date,
  completed_date date,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  offer_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  lead_id uuid references public.leads(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  offer_date date not null default current_date,
  valid_until date,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  subtotal numeric(14,2) not null default 0,
  vat_total numeric(14,2) not null default 0,
  grand_total numeric(14,2) not null default 0,
  notes text,
  terms text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.offer_items (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.offers(id) on delete cascade,
  item_name text not null,
  description text,
  quantity numeric(12,2) not null default 1,
  unit_price numeric(14,2) not null default 0,
  vat_rate numeric(5,2) not null default 20,
  discount numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects
  add column if not exists related_offer_id uuid references public.offers(id) on delete set null;

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  customer_id uuid references public.customers(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  offer_id uuid references public.offers(id) on delete set null,
  issue_date date not null default current_date,
  due_date date,
  amount numeric(14,2) not null default 0,
  vat numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  status text not null default 'draft' check (status in ('draft', 'issued', 'paid', 'overdue', 'cancelled')),
  payment_method text check (payment_method in ('cash', 'bank_transfer', 'credit_card', 'other') or payment_method is null),
  payment_date date,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.account_records (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  description text not null,
  record_type text not null check (record_type in ('receivable', 'payable', 'advance', 'cash_in', 'cash_out')),
  amount numeric(14,2) not null default 0,
  currency text not null default 'TRY' check (currency in ('TRY', 'USD', 'EUR')),
  record_date date not null default current_date,
  due_date date,
  status text not null default 'open' check (status in ('open', 'partially_paid', 'closed', 'cancelled')),
  is_official boolean not null default false,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  invoice_id uuid references public.invoices(id) on delete set null,
  account_record_id uuid references public.account_records(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  amount numeric(14,2) not null default 0,
  payment_date date not null default current_date,
  method text not null default 'bank_transfer' check (method in ('cash', 'bank_transfer', 'credit_card', 'other')),
  reference_number text,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'other' check (category in ('software_subscription', 'hosting_domain', 'hardware_purchase', 'subcontractor', 'transport', 'food', 'office', 'tax', 'salary', 'internet_phone', 'other')),
  vendor text,
  customer_id uuid references public.customers(id) on delete set null,
  project_id uuid references public.projects(id) on delete set null,
  amount numeric(14,2) not null default 0,
  vat numeric(14,2) not null default 0,
  expense_date date not null default current_date,
  payment_method text not null default 'bank_transfer' check (payment_method in ('cash', 'bank_transfer', 'credit_card', 'other')),
  has_receipt boolean not null default false,
  is_official boolean not null default true,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  customer_id uuid references public.customers(id) on delete set null,
  contact_person text,
  channel text not null default 'phone' check (channel in ('phone', 'whatsapp', 'email', 'website', 'onsite')),
  category text not null default 'other' check (category in ('network', 'server', 'software', 'hardware', 'security', 'backup', 'website', 'other')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'waiting_customer', 'resolved', 'closed')),
  description text,
  resolution_notes text,
  opened_date date not null default current_date,
  closed_date date,
  assigned_user uuid references auth.users(id),
  project_id uuid references public.projects(id) on delete set null,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tasks
  add constraint tasks_ticket_id_fkey foreign key (ticket_id) references public.support_tickets(id) on delete set null;

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  related_entity_type text not null check (related_entity_type in ('customer', 'lead', 'project', 'offer', 'invoice', 'ticket', 'task', 'payment', 'expense', 'account_record')),
  related_entity_id uuid not null,
  activity_type text not null default 'note' check (activity_type in ('note', 'call', 'meeting', 'email', 'whatsapp', 'status_change', 'payment', 'system')),
  title text not null,
  content text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.crm_files (
  id uuid primary key default gen_random_uuid(),
  related_entity_type text not null check (related_entity_type in ('customer', 'lead', 'project', 'offer', 'invoice', 'ticket')),
  related_entity_id uuid not null,
  title text not null,
  file_url text,
  file_type text,
  notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.site_settings
  add column if not exists default_vat_rate numeric(5,2) not null default 20,
  add column if not exists default_currency text not null default 'TRY',
  add column if not exists offer_prefix text not null default 'TEK',
  add column if not exists invoice_prefix text not null default 'FTR',
  add column if not exists service_categories text[] not null default array['Danismanlik', 'Network', 'Sunucu', 'Guvenlik', 'Bulut', 'Yazilim', 'Teknik Destek'],
  add column if not exists expense_categories text[] not null default array['software_subscription', 'hosting_domain', 'hardware_purchase', 'subcontractor', 'transport', 'food', 'office', 'tax', 'salary', 'internet_phone', 'other'];

create trigger customers_updated_at before update on public.customers for each row execute function public.update_updated_at_column();
create trigger leads_updated_at before update on public.leads for each row execute function public.update_updated_at_column();
create trigger tasks_updated_at before update on public.tasks for each row execute function public.update_updated_at_column();
create trigger offers_updated_at before update on public.offers for each row execute function public.update_updated_at_column();
create trigger offer_items_updated_at before update on public.offer_items for each row execute function public.update_updated_at_column();
create trigger invoices_updated_at before update on public.invoices for each row execute function public.update_updated_at_column();
create trigger payments_updated_at before update on public.payments for each row execute function public.update_updated_at_column();
create trigger account_records_updated_at before update on public.account_records for each row execute function public.update_updated_at_column();
create trigger expenses_updated_at before update on public.expenses for each row execute function public.update_updated_at_column();
create trigger support_tickets_updated_at before update on public.support_tickets for each row execute function public.update_updated_at_column();

create index customers_status_idx on public.customers(status);
create index customers_source_idx on public.customers(source);
create index leads_customer_id_idx on public.leads(customer_id);
create index leads_stage_idx on public.leads(stage);
create index leads_follow_up_idx on public.leads(next_follow_up_date);
create index projects_customer_id_idx on public.projects(customer_id);
create index projects_project_status_idx on public.projects(project_status);
create index projects_deadline_idx on public.projects(deadline);
create index tasks_customer_id_idx on public.tasks(customer_id);
create index tasks_project_id_idx on public.tasks(project_id);
create index tasks_ticket_id_idx on public.tasks(ticket_id);
create index tasks_status_idx on public.tasks(status);
create index tasks_due_date_idx on public.tasks(due_date);
create index offers_customer_id_idx on public.offers(customer_id);
create index offers_status_idx on public.offers(status);
create index offer_items_offer_id_idx on public.offer_items(offer_id);
create index invoices_customer_id_idx on public.invoices(customer_id);
create index invoices_status_idx on public.invoices(status);
create index invoices_due_date_idx on public.invoices(due_date);
create index payments_customer_id_idx on public.payments(customer_id);
create index payments_date_idx on public.payments(payment_date);
create index account_records_customer_id_idx on public.account_records(customer_id);
create index account_records_status_idx on public.account_records(status);
create index account_records_due_date_idx on public.account_records(due_date);
create index expenses_project_id_idx on public.expenses(project_id);
create index expenses_customer_id_idx on public.expenses(customer_id);
create index expenses_date_idx on public.expenses(expense_date);
create index expenses_category_idx on public.expenses(category);
create index support_tickets_customer_id_idx on public.support_tickets(customer_id);
create index support_tickets_status_idx on public.support_tickets(status);
create index support_tickets_opened_date_idx on public.support_tickets(opened_date);
create index activity_logs_entity_idx on public.activity_logs(related_entity_type, related_entity_id);
create index crm_files_entity_idx on public.crm_files(related_entity_type, related_entity_id);

alter table public.customers enable row level security;
alter table public.leads enable row level security;
alter table public.tasks enable row level security;
alter table public.offers enable row level security;
alter table public.offer_items enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.account_records enable row level security;
alter table public.expenses enable row level security;
alter table public.support_tickets enable row level security;
alter table public.activity_logs enable row level security;
alter table public.crm_files enable row level security;

create policy "Admins manage customers" on public.customers for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage leads" on public.leads for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage tasks" on public.tasks for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage offers" on public.offers for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage offer items" on public.offer_items for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage invoices" on public.invoices for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage payments" on public.payments for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage account records" on public.account_records for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage expenses" on public.expenses for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage support tickets" on public.support_tickets for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage activity logs" on public.activity_logs for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins manage crm files" on public.crm_files for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
