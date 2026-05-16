/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { DbRow } from "@/lib/crm";

export type CrmData = {
  customers: DbRow[];
  services: DbRow[];
  leads: DbRow[];
  projects: DbRow[];
  tasks: DbRow[];
  offers: DbRow[];
  offerItems: DbRow[];
  invoices: DbRow[];
  payments: DbRow[];
  accountRecords: DbRow[];
  expenses: DbRow[];
  tickets: DbRow[];
  activities: DbRow[];
  files: DbRow[];
  users: DbRow[];
};

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

export function useCrmData() {
  const [data, setData] = useState<CrmData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      setError("Supabase bağlantısı yok.");
      return;
    }

    setLoading(true);
    setError(null);

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
      (supabase.from("customers" as any).select("*").order("created_at", { ascending: false }) as any),
      (supabase.from("services" as any).select("*").order("sort_order").order("created_at", { ascending: false }) as any),
      (supabase.from("leads" as any).select("*").order("created_at", { ascending: false }) as any),
      (supabase.from("projects" as any).select("*").order("created_at", { ascending: false }) as any),
      (supabase.from("tasks" as any).select("*").order("due_date", { ascending: true }) as any),
      (supabase.from("offers" as any).select("*").order("offer_date", { ascending: false }) as any),
      (supabase.from("offer_items" as any).select("*").order("sort_order") as any),
      (supabase.from("invoices" as any).select("*").order("issue_date", { ascending: false }) as any),
      (supabase.from("payments" as any).select("*").order("payment_date", { ascending: false }) as any),
      (supabase.from("account_records" as any).select("*").order("record_date", { ascending: false }) as any),
      (supabase.from("expenses" as any).select("*").order("expense_date", { ascending: false }) as any),
      (supabase.from("support_tickets" as any).select("*").order("opened_date", { ascending: false }) as any),
      (supabase.from("activity_logs" as any).select("*").order("created_at", { ascending: false }) as any),
      (supabase.from("crm_files" as any).select("*").order("created_at", { ascending: false }) as any),
      (supabase.from("profiles" as any).select("user_id,email,display_name").order("created_at", { ascending: false }) as any),
    ]);

    const failed = [
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
    ].find((result) => result.error);

    if (failed?.error) {
      setError(failed.error.message);
    }

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

  return { data, loading, error, reload: load };
}
