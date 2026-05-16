import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type {
  AccountRecordRow,
  ActivityLogRow,
  CrmFileRow,
  CustomerRow,
  ExpenseRow,
  InvoiceRow,
  LeadRow,
  OfferItemRow,
  OfferRow,
  PaymentRow,
  ProfileRow,
  ProjectRow,
  ServiceRow,
  SupportTicketRow,
  TaskRow,
} from "@/integrations/supabase/types";

export type CrmData = {
  customers: CustomerRow[];
  services: ServiceRow[];
  leads: LeadRow[];
  projects: ProjectRow[];
  tasks: TaskRow[];
  offers: OfferRow[];
  offerItems: OfferItemRow[];
  invoices: InvoiceRow[];
  payments: PaymentRow[];
  accountRecords: AccountRecordRow[];
  expenses: ExpenseRow[];
  tickets: SupportTicketRow[];
  activities: ActivityLogRow[];
  files: CrmFileRow[];
  users: ProfileRow[];
};

export type CrmDataKey = keyof CrmData;
export type CrmErrors = Partial<Record<CrmDataKey, string>>;

const emptyData: CrmData = {
  customers: [],
  services: [],
  leads: [],
  projects: [],
  tasks: [],
  offers: [],
  offerItems: [],
  invoices: [],
  payments: [],
  accountRecords: [],
  expenses: [],
  tickets: [],
  activities: [],
  files: [],
  users: [],
};

function firstError(errors: CrmErrors) {
  const [key, message] = Object.entries(errors)[0] ?? [];
  return key && message ? `${key}: ${message}` : null;
}

export function useCrmData() {
  const [data, setData] = useState<CrmData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<CrmErrors>({});
  const error = firstError(errors);

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      setErrors({ customers: "Supabase bağlantısı yok." });
      return;
    }

    setLoading(true);
    setErrors({});

    const [
      customers,
      services,
      leads,
      projects,
      tasks,
      offers,
      offerItems,
      invoices,
      payments,
      accountRecords,
      expenses,
      tickets,
      activities,
      files,
      users,
    ] = await Promise.all([
      supabase.from("customers").select("*").order("created_at", { ascending: false }),
      supabase.from("services").select("*").order("sort_order").order("created_at", { ascending: false }),
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("tasks").select("*").order("due_date", { ascending: true }),
      supabase.from("offers").select("*").order("offer_date", { ascending: false }),
      supabase.from("offer_items").select("*").order("sort_order"),
      supabase.from("invoices").select("*").order("issue_date", { ascending: false }),
      supabase.from("payments").select("*").order("payment_date", { ascending: false }),
      supabase.from("account_records").select("*").order("record_date", { ascending: false }),
      supabase.from("expenses").select("*").order("expense_date", { ascending: false }),
      supabase.from("support_tickets").select("*").order("opened_date", { ascending: false }),
      supabase.from("activity_logs").select("*").order("created_at", { ascending: false }),
      supabase.from("crm_files").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id,user_id,email,display_name,created_at").order("created_at", { ascending: false }),
    ]);

    const nextErrors: CrmErrors = {};
    if (customers.error) nextErrors.customers = customers.error.message;
    if (services.error) nextErrors.services = services.error.message;
    if (leads.error) nextErrors.leads = leads.error.message;
    if (projects.error) nextErrors.projects = projects.error.message;
    if (tasks.error) nextErrors.tasks = tasks.error.message;
    if (offers.error) nextErrors.offers = offers.error.message;
    if (offerItems.error) nextErrors.offerItems = offerItems.error.message;
    if (invoices.error) nextErrors.invoices = invoices.error.message;
    if (payments.error) nextErrors.payments = payments.error.message;
    if (accountRecords.error) nextErrors.accountRecords = accountRecords.error.message;
    if (expenses.error) nextErrors.expenses = expenses.error.message;
    if (tickets.error) nextErrors.tickets = tickets.error.message;
    if (activities.error) nextErrors.activities = activities.error.message;
    if (files.error) nextErrors.files = files.error.message;
    if (users.error) nextErrors.users = users.error.message;

    setErrors(nextErrors);
    setData({
      customers: customers.data ?? [],
      services: services.data ?? [],
      leads: leads.data ?? [],
      projects: projects.data ?? [],
      tasks: tasks.data ?? [],
      offers: offers.data ?? [],
      offerItems: offerItems.data ?? [],
      invoices: invoices.data ?? [],
      payments: payments.data ?? [],
      accountRecords: accountRecords.data ?? [],
      expenses: expenses.data ?? [],
      tickets: tickets.data ?? [],
      activities: activities.data ?? [],
      files: files.data ?? [],
      users: users.data ?? [],
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, errors, reload: load };
}
