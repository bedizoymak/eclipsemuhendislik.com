/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import { BarChart3, Download, FileText } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdminMetricCard, AdminPageHeader, AdminSection } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCrmData } from "@/hooks/useCrmData";
import { customerName, exportCSV, formatTRY, labelOf, LEAD_STAGES, monthKey, PROJECT_STATUSES, sumBy, TICKET_STATUSES } from "@/lib/crm";

const colors = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#64748b"];

function inRange(date: string | null | undefined, from: string, to: string) {
  if (!date) return false;
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
}

function chartMoney(value: number) {
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toLocaleString("tr-TR", { maximumFractionDigits: 0 })} bin`;
  return value.toLocaleString("tr-TR");
}

export default function AdminReports() {
  const { data, loading } = useCrmData();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [customerId, setCustomerId] = useState("all");

  const filtered = useMemo(() => {
    const byCustomer = (row: any) => customerId === "all" || row.customer_id === customerId;
    return {
      payments: data.payments.filter((row) => byCustomer(row) && inRange(row.payment_date, from, to)),
      expenses: data.expenses.filter((row) => byCustomer(row) && inRange(row.expense_date, from, to)),
      invoices: data.invoices.filter((row) => byCustomer(row) && inRange(row.issue_date, from, to)),
      records: data.accountRecords.filter((row) => byCustomer(row) && inRange(row.record_date, from, to)),
      leads: data.leads.filter((row) => (customerId === "all" || row.customer_id === customerId) && inRange(row.created_at?.slice(0, 10), from, to)),
      projects: data.projects.filter((row) => byCustomer(row) && (!from || !row.start_date || row.start_date >= from) && (!to || !row.start_date || row.start_date <= to)),
      tickets: data.tickets.filter((row) => byCustomer(row) && inRange(row.opened_date, from, to)),
    };
  }, [customerId, data, from, to]);

  const months = useMemo(() => {
    const keys = Array.from(new Set([...filtered.payments.map((row) => monthKey(row.payment_date)), ...filtered.expenses.map((row) => monthKey(row.expense_date))])).filter(Boolean).sort();
    return keys.map((key) => {
      const revenue = sumBy(filtered.payments.filter((row) => monthKey(row.payment_date) === key), "amount");
      const expenses = sumBy(filtered.expenses.filter((row) => monthKey(row.expense_date) === key), "amount");
      return { month: key, revenue, expenses, profit: revenue - expenses };
    });
  }, [filtered.expenses, filtered.payments]);

  const revenue = sumBy(filtered.payments, "amount");
  const expenses = sumBy(filtered.expenses, "amount");
  const profit = revenue - expenses;
  const openReceivables = sumBy(filtered.invoices.filter((row) => !["paid", "cancelled"].includes(row.status)), "total") + sumBy(filtered.records.filter((row) => row.record_type === "receivable" && !["closed", "cancelled"].includes(row.status)), "amount");

  const expenseCategory = Object.entries(filtered.expenses.reduce<Record<string, number>>((acc, item) => {
    acc[item.category || "other"] = (acc[item.category || "other"] || 0) + Number(item.amount || 0);
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));

  const leadConversion = LEAD_STAGES.map((stage) => ({ name: stage.label, value: filtered.leads.filter((lead) => lead.stage === stage.value).length }));
  const projectProfitability = filtered.projects.map((project) => {
    const projectRevenue = sumBy(filtered.payments.filter((payment) => payment.project_id === project.id), "amount");
    const projectExpenses = sumBy(filtered.expenses.filter((expense) => expense.project_id === project.id), "amount");
    return { name: project.title, revenue: projectRevenue, expenses: projectExpenses, profit: projectRevenue - projectExpenses };
  }).sort((a, b) => b.profit - a.profit).slice(0, 8);
  const ticketWorkload = TICKET_STATUSES.map((status) => ({ name: status.label, value: filtered.tickets.filter((ticket) => ticket.status === status.value).length }));

  function exportFinance() {
    exportCSV("eclipse-finans-raporu.csv", [
      { "Gelir": revenue, "Gider": expenses, "Net Kar": profit, "Acik Alacak": openReceivables, "Baslangic": from, "Bitis": to },
    ]);
  }

  function exportBalances() {
    exportCSV("eclipse-musteri-bakiyeleri.csv", data.customers.map((customer) => {
      const invoices = data.invoices.filter((row) => row.customer_id === customer.id && !["paid", "cancelled"].includes(row.status));
      const records = data.accountRecords.filter((row) => row.customer_id === customer.id && row.record_type === "receivable" && !["closed", "cancelled"].includes(row.status));
      return { "Müşteri": customerName(customer), "Resmi Alacak": sumBy(invoices, "total"), "İç Alacak": sumBy(records, "amount") };
    }));
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Yönetim Raporları" title="Raporlar" description="Gelir, gider, kâr/zarar, müşteri bakiyeleri, açık alacaklar, lead dönüşümü, proje kârlılığı ve destek iş yükünü analiz edin." actions={<Button variant="outline" onClick={() => window.print()}><FileText className="h-4 w-4" /> Yazdır</Button>} />
      <div className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-[180px_180px_minmax(0,1fr)_auto]">
        <Input type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
        <Input type="date" value={to} onChange={(event) => setTo(event.target.value)} />
        <Select value={customerId} onValueChange={setCustomerId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tüm müşteriler</SelectItem>{data.customers.map((customer) => <SelectItem key={customer.id} value={customer.id}>{customerName(customer)}</SelectItem>)}</SelectContent></Select>
        <Button variant="outline" onClick={exportFinance}><Download className="h-4 w-4" /> CSV</Button>
      </div>
      {loading ? <div className="rounded-lg border border-border bg-card p-8 text-muted-foreground">Yükleniyor...</div> : <>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><AdminMetricCard label="Gelir" value={formatTRY(revenue)} icon={BarChart3} tone="success" /><AdminMetricCard label="Gider" value={formatTRY(expenses)} icon={BarChart3} tone="danger" /><AdminMetricCard label="Net Kâr/Zarar" value={formatTRY(profit)} icon={BarChart3} tone={profit >= 0 ? "success" : "danger"} /><AdminMetricCard label="Açık Alacak" value={formatTRY(openReceivables)} icon={BarChart3} tone="warning" /></div>
        <Tabs defaultValue="finance">
          <TabsList className="h-auto flex-wrap"><TabsTrigger value="finance">Gelir/Gider</TabsTrigger><TabsTrigger value="balances">Müşteri Bakiyeleri</TabsTrigger><TabsTrigger value="leads">Lead Dönüşümü</TabsTrigger><TabsTrigger value="projects">Proje Kârlılığı</TabsTrigger><TabsTrigger value="tickets">Destek İş Yükü</TabsTrigger></TabsList>
          <TabsContent value="finance" className="mt-4 grid gap-6 xl:grid-cols-2">
            <AdminSection title="Aylık Performans" description="Gelir, gider ve net kâr">
              <ResponsiveContainer width="100%" height={320}><BarChart data={months}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" /><YAxis tickFormatter={chartMoney} /><Tooltip formatter={(v: number) => formatTRY(v)} /><Legend /><Bar dataKey="revenue" name="Gelir" fill="#10b981" /><Bar dataKey="expenses" name="Gider" fill="#ef4444" /><Bar dataKey="profit" name="Net" fill="#0ea5e9" /></BarChart></ResponsiveContainer>
            </AdminSection>
            <AdminSection title="Gider Kategorileri" description="Kategori bazlı masraf dağılımı">
              <ResponsiveContainer width="100%" height={320}><PieChart><Pie data={expenseCategory} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>{expenseCategory.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip formatter={(v: number) => formatTRY(v)} /><Legend /></PieChart></ResponsiveContainer>
            </AdminSection>
          </TabsContent>
          <TabsContent value="balances" className="mt-4"><Button variant="outline" className="mb-3" onClick={exportBalances}><Download className="h-4 w-4" /> Bakiyeleri CSV İndir</Button><SimpleRows rows={data.customers.map((customer) => { const invoices = data.invoices.filter((row) => row.customer_id === customer.id && !["paid", "cancelled"].includes(row.status)); const records = data.accountRecords.filter((row) => row.customer_id === customer.id && row.record_type === "receivable" && !["closed", "cancelled"].includes(row.status)); return [customerName(customer), formatTRY(sumBy(invoices, "total")), formatTRY(sumBy(records, "amount"))]; })} headers={["Müşteri", "Resmi Alacak", "İç Alacak"]} /></TabsContent>
          <TabsContent value="leads" className="mt-4"><AdminSection title="Lead Conversion" description="Aşamaya göre fırsat dağılımı"><ResponsiveContainer width="100%" height={320}><BarChart data={leadConversion}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" name="Fırsat" fill="#0ea5e9" /></BarChart></ResponsiveContainer></AdminSection></TabsContent>
          <TabsContent value="projects" className="mt-4"><AdminSection title="Proje Kârlılık Raporu" description="Proje bazlı gelir, gider ve net durum"><ResponsiveContainer width="100%" height={360}><BarChart data={projectProfitability} layout="vertical"><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" tickFormatter={chartMoney} /><YAxis type="category" dataKey="name" width={150} /><Tooltip formatter={(v: number) => formatTRY(v)} /><Legend /><Bar dataKey="revenue" name="Gelir" fill="#10b981" /><Bar dataKey="expenses" name="Gider" fill="#ef4444" /><Bar dataKey="profit" name="Net" fill="#0ea5e9" /></BarChart></ResponsiveContainer></AdminSection></TabsContent>
          <TabsContent value="tickets" className="mt-4"><AdminSection title="Ticket İş Yükü" description="Duruma göre destek talebi dağılımı"><ResponsiveContainer width="100%" height={320}><PieChart><Pie data={ticketWorkload} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>{ticketWorkload.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></AdminSection></TabsContent>
        </Tabs>
      </>}
    </div>
  );
}

function SimpleRows({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return <div className="overflow-x-auto rounded-lg border border-border bg-card"><table className="w-full text-sm"><thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground"><tr>{headers.map((header) => <th key={header} className="p-3">{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} className="border-t border-border">{row.map((cell, cellIndex) => <td key={cellIndex} className="p-3">{cell}</td>)}</tr>)}</tbody></table></div>;
}
