export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ServiceStatus = "published" | "draft";
export type ProjectStatus = "published" | "draft";
export type MessageStatus = "new" | "read";
export type AppRole = "admin" | "user";

type TableShape<Row, Insert = Partial<Row>, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
};

type BaseRow = {
  id: string;
  created_at: string;
};

type TimestampedRow = BaseRow & {
  updated_at: string;
};

export type ProfileRow = BaseRow & {
  user_id: string;
  email: string | null;
  display_name: string | null;
};

export type UserRoleRow = BaseRow & {
  user_id: string;
  role: AppRole;
};

export type ServiceRow = TimestampedRow & {
  title: string;
  short_description: string;
  detail_description: string | null;
  icon_name: string | null;
  image_url: string | null;
  sort_order: number;
  status: ServiceStatus;
  category?: string | null;
  base_price?: number;
  pricing_type?: "fixed" | "monthly" | "hourly" | "custom";
  is_active?: boolean;
  internal_notes?: string | null;
};

export type ProjectRow = TimestampedRow & {
  title: string;
  category: string | null;
  location: string | null;
  project_year: string | null;
  short_description: string;
  detail_description: string | null;
  cover_image_url: string | null;
  gallery_images: string[] | null;
  sort_order: number;
  status: ProjectStatus;
  customer_id?: string | null;
  related_lead_id?: string | null;
  related_offer_id?: string | null;
  service_category?: string | null;
  project_status?: "planning" | "active" | "waiting_customer" | "waiting_supplier" | "completed" | "cancelled";
  start_date?: string | null;
  deadline?: string | null;
  completion_date?: string | null;
  budget?: number;
  actual_cost?: number;
  profit_estimate?: number;
  priority?: "low" | "medium" | "high" | "urgent";
  internal_notes?: string | null;
  progress_percentage?: number;
  files_links?: string[];
  crm_description?: string | null;
};

export type ContactMessageRow = BaseRow & {
  full_name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
  status: MessageStatus;
};

export type SiteSettingsRow = {
  id: string;
  company_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  map_url: string | null;
  map_embed_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  seo_title: string;
  seo_description: string;
  footer_description: string;
  default_vat_rate?: number;
  default_currency?: string;
  offer_prefix?: string;
  invoice_prefix?: string;
  service_categories?: string[];
  expense_categories?: string[];
  updated_at: string;
};

export type CustomerRow = TimestampedRow & {
  customer_name: string;
  customer_type: "company" | "individual";
  sector: string | null;
  tax_office: string | null;
  tax_number: string | null;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  notes: string | null;
  status: "active" | "passive" | "prospect" | "blacklisted";
  source: "referral" | "website" | "phone" | "social" | "existing_network" | "other";
  tags: string[];
  last_contact_date: string | null;
  created_by: string | null;
};

export type LeadRow = TimestampedRow & {
  customer_id: string | null;
  prospect_name: string;
  contact_person: string | null;
  phone: string | null;
  email: string | null;
  source: CustomerRow["source"];
  interested_service: string | null;
  estimated_value: number;
  probability: number;
  stage: "new" | "contacted" | "meeting_scheduled" | "proposal_sent" | "negotiation" | "won" | "lost";
  expected_close_date: string | null;
  assigned_user: string | null;
  notes: string | null;
  next_follow_up_date: string | null;
  lost_reason: string | null;
  created_by: string | null;
};

export type TaskRow = TimestampedRow & {
  title: string;
  description: string | null;
  customer_id: string | null;
  project_id: string | null;
  ticket_id: string | null;
  assigned_user: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "blocked" | "done" | "cancelled";
  due_date: string | null;
  completed_date: string | null;
  notes: string | null;
  created_by: string | null;
};

export type OfferRow = TimestampedRow & {
  offer_number: string;
  customer_id: string | null;
  lead_id: string | null;
  project_id: string | null;
  offer_date: string;
  valid_until: string | null;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  subtotal: number;
  vat_total: number;
  grand_total: number;
  notes: string | null;
  terms: string | null;
  created_by: string | null;
};

export type OfferItemRow = TimestampedRow & {
  offer_id: string;
  item_name: string;
  description: string | null;
  quantity: number;
  unit_price: number;
  vat_rate: number;
  discount: number;
  total: number;
  sort_order: number;
};

export type InvoiceRow = TimestampedRow & {
  invoice_number: string;
  customer_id: string | null;
  project_id: string | null;
  offer_id: string | null;
  issue_date: string;
  due_date: string | null;
  amount: number;
  vat: number;
  total: number;
  status: "draft" | "issued" | "paid" | "overdue" | "cancelled";
  payment_method: "cash" | "bank_transfer" | "credit_card" | "other" | null;
  payment_date: string | null;
  notes: string | null;
  created_by: string | null;
};

export type AccountRecordRow = TimestampedRow & {
  customer_id: string | null;
  project_id: string | null;
  description: string;
  record_type: "receivable" | "payable" | "advance" | "cash_in" | "cash_out";
  amount: number;
  currency: "TRY" | "USD" | "EUR";
  record_date: string;
  due_date: string | null;
  status: "open" | "partially_paid" | "closed" | "cancelled";
  is_official: boolean;
  notes: string | null;
  created_by: string | null;
};

export type PaymentRow = TimestampedRow & {
  customer_id: string | null;
  invoice_id: string | null;
  account_record_id: string | null;
  project_id: string | null;
  amount: number;
  payment_date: string;
  method: "cash" | "bank_transfer" | "credit_card" | "other";
  reference_number: string | null;
  notes: string | null;
  created_by: string | null;
};

export type ExpenseRow = TimestampedRow & {
  category: "software_subscription" | "hosting_domain" | "hardware_purchase" | "subcontractor" | "transport" | "food" | "office" | "tax" | "salary" | "internet_phone" | "other";
  vendor: string | null;
  customer_id: string | null;
  project_id: string | null;
  amount: number;
  vat: number;
  expense_date: string;
  payment_method: PaymentRow["method"];
  has_receipt: boolean;
  is_official: boolean;
  notes: string | null;
  created_by: string | null;
};

export type SupportTicketRow = TimestampedRow & {
  title: string;
  customer_id: string | null;
  contact_person: string | null;
  channel: "phone" | "whatsapp" | "email" | "website" | "onsite";
  category: "network" | "server" | "software" | "hardware" | "security" | "backup" | "website" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "waiting_customer" | "resolved" | "closed";
  description: string | null;
  resolution_notes: string | null;
  opened_date: string;
  closed_date: string | null;
  assigned_user: string | null;
  project_id: string | null;
  created_by: string | null;
};

export type ActivityLogRow = BaseRow & {
  related_entity_type: "customer" | "lead" | "project" | "offer" | "invoice" | "ticket" | "task" | "payment" | "expense" | "account_record";
  related_entity_id: string;
  activity_type: "note" | "call" | "meeting" | "email" | "whatsapp" | "status_change" | "payment" | "system";
  title: string;
  content: string | null;
  created_by: string | null;
};

export type CrmFileRow = BaseRow & {
  related_entity_type: "customer" | "lead" | "project" | "offer" | "invoice" | "ticket";
  related_entity_id: string;
  title: string;
  file_url: string | null;
  file_type: string | null;
  notes: string | null;
  created_by: string | null;
};

export type Database = {
  public: {
    Tables: {
      profiles: TableShape<ProfileRow, Partial<ProfileRow> & { user_id: string }>;
      user_roles: TableShape<UserRoleRow, Partial<UserRoleRow> & { user_id: string }>;
      services: TableShape<ServiceRow, Partial<ServiceRow> & { title: string; short_description: string }>;
      projects: TableShape<ProjectRow, Partial<ProjectRow> & { title: string }>;
      contact_messages: TableShape<ContactMessageRow, Partial<ContactMessageRow> & { full_name: string; message: string }>;
      site_settings: TableShape<SiteSettingsRow>;
      customers: TableShape<CustomerRow, Partial<CustomerRow> & { customer_name: string }>;
      leads: TableShape<LeadRow, Partial<LeadRow> & { prospect_name: string }>;
      tasks: TableShape<TaskRow, Partial<TaskRow> & { title: string }>;
      offers: TableShape<OfferRow, Partial<OfferRow> & { offer_number: string }>;
      offer_items: TableShape<OfferItemRow, Partial<OfferItemRow> & { offer_id: string; item_name: string }>;
      invoices: TableShape<InvoiceRow, Partial<InvoiceRow> & { invoice_number: string }>;
      payments: TableShape<PaymentRow>;
      account_records: TableShape<AccountRecordRow, Partial<AccountRecordRow> & { description: string; record_type: AccountRecordRow["record_type"] }>;
      expenses: TableShape<ExpenseRow>;
      support_tickets: TableShape<SupportTicketRow, Partial<SupportTicketRow> & { title: string }>;
      activity_logs: TableShape<ActivityLogRow, Partial<ActivityLogRow> & { related_entity_type: ActivityLogRow["related_entity_type"]; related_entity_id: string; title: string }>;
      crm_files: TableShape<CrmFileRow, Partial<CrmFileRow> & { related_entity_type: CrmFileRow["related_entity_type"]; related_entity_id: string; title: string }>;
    };
  };
};
