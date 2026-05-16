/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Edit, FileText, Plus, Trash2, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminEmptyState, AdminMetricCard, AdminPageHeader } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCrmData } from "@/hooks/useCrmData";
import { ACCOUNT_STATUSES, ACCOUNT_TYPES, customerName, DbRow, formatDate, formatTRY, INVOICE_STATUSES, labelOf, PAYMENT_METHODS, statusBadgeClass, todayISO } from "@/lib/crm";
import { cn } from "@/lib/utils";

const emptyInvoice = { id: "", invoice_number: "", customer_id: "", project_id: "", offer_id: "", issue_date: todayISO(), due_date: "", amount: "", vat: "", total: "", status: "draft", payment_method: "", payment_date: "", notes: "" };
const emptyRecord = { id: "", customer_id: "", project_id: "", description: "", record_type: "receivable", amount: "", currency: "TRY", record_date: todayISO(), due_date: "", status: "open", is_official: "false", notes: "" };
const emptyPayment = { id: "", customer_id: "", invoice_id: "", account_record_id: "", project_id: "", amount: "", payment_date: todayISO(), method: "bank_transfer", reference_number: "", notes: "" };

export default function AdminFinance() {
  const { data, reload } = useCrmData();
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [recordOpen, setRecordOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [invoice, setInvoice] = useState<any>(emptyInvoice);
  const [record, setRecord] = useState<any>(emptyRecord);
  const [payment, setPayment] = useState<any>(emptyPayment);
  const { toast } = useToast();

  const officialOpen = data.invoices.filter((item) => !["paid", "cancelled"].includes(item.status)).reduce((sum, item) => sum + Number(item.total || 0), 0);
  const internalOpen = data.accountRecords.filter((item) => !item.is_official && !["closed", "cancelled"].includes(item.status)).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const paid = data.payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const overdue = data.invoices.filter((item) => item.due_date && item.due_date < todayISO() && !["paid", "cancelled"].includes(item.status)).reduce((sum, item) => sum + Number(item.total || 0), 0);

  function nextInvoiceNumber() {
    return `FTR-${new Date().getFullYear()}-${String(data.invoices.length + 1).padStart(4, "0")}`;
  }

  async function saveInvoice() {
    if (!supabase || !invoice.invoice_number.trim()) return;
    const amount = Number(invoice.amount || 0);
    const vat = Number(invoice.vat || 0);
    const payload = { ...invoice, customer_id: invoice.customer_id || null, project_id: invoice.project_id || null, offer_id: invoice.offer_id || null, due_date: invoice.due_date || null, payment_method: invoice.payment_method || null, payment_date: invoice.payment_date || null, amount, vat, total: Number(invoice.total || amount + vat) };
    delete payload.id;
    const result = invoice.id ? await (supabase.from("invoices" as any).update(payload).eq("id", invoice.id) as any) : await (supabase.from("invoices" as any).insert(payload) as any);
    if (result.error) toast({ title: "Fatura kaydedilemedi", description: result.error.message, variant: "destructive" });
    else { toast({ title: "Fatura kaydedildi" }); setInvoiceOpen(false); reload(); }
  }

  async function saveRecord() {
    if (!supabase || !record.description.trim()) return;
    const payload = { ...record, customer_id: record.customer_id || null, project_id: record.project_id || null, due_date: record.due_date || null, amount: Number(record.amount || 0), is_official: record.is_official === "true" };
    delete payload.id;
    const result = record.id ? await (supabase.from("account_records" as any).update(payload).eq("id", record.id) as any) : await (supabase.from("account_records" as any).insert(payload) as any);
    if (result.error) toast({ title: "Cari kayıt kaydedilemedi", description: result.error.message, variant: "destructive" });
    else { toast({ title: "Cari kayıt kaydedildi" }); setRecordOpen(false); reload(); }
  }

  async function savePayment() {
    if (!supabase || !payment.amount) return;
    const payload = { ...payment, customer_id: payment.customer_id || null, invoice_id: payment.invoice_id || null, account_record_id: payment.account_record_id || null, project_id: payment.project_id || null, amount: Number(payment.amount || 0) };
    delete payload.id;
    const result = payment.id ? await (supabase.from("payments" as any).update(payload).eq("id", payment.id) as any) : await (supabase.from("payments" as any).insert(payload) as any);
    if (result.error) toast({ title: "Ödeme kaydedilemedi", description: result.error.message, variant: "destructive" });
    else { toast({ title: "Ödeme kaydedildi" }); setPaymentOpen(false); reload(); }
  }

  async function remove(table: string, row: DbRow) {
    if (!supabase || !confirm("Kayıt silinsin mi?")) return;
    await (supabase.from(table as any).delete().eq("id", row.id) as any);
    toast({ title: "Kayıt silindi" }); reload();
  }

  const customerSelect = (value: string, onChange: (value: string) => void) => (
    <Select value={value || "none"} onValueChange={(v) => onChange(v === "none" ? "" : v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.customers.map((c) => <SelectItem key={c.id} value={c.id}>{customerName(c)}</SelectItem>)}</SelectContent></Select>
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Finans" title="Faturalar ve Cari Hesap" description="Resmi faturaları, iç cari kayıtları ve tahsilatları ayrı etiketlerle takip edin; resmi ve gayriresmi tutarları karıştırmayın." actions={<><Button onClick={() => { setInvoice({ ...emptyInvoice, invoice_number: nextInvoiceNumber() }); setInvoiceOpen(true); }}><Plus className="h-4 w-4" /> Fatura</Button><Button variant="outline" onClick={() => { setRecord(emptyRecord); setRecordOpen(true); }}>Cari Kayıt</Button><Button variant="outline" onClick={() => { setPayment(emptyPayment); setPaymentOpen(true); }}>Ödeme</Button></>} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard label="Açık Resmi Alacak" value={formatTRY(officialOpen)} icon={FileText} tone="warning" />
        <AdminMetricCard label="Açık İç Kayıt" value={formatTRY(internalOpen)} description="Resmi fatura değildir" icon={Wallet} tone="accent" />
        <AdminMetricCard label="Toplam Tahsilat" value={formatTRY(paid)} icon={Wallet} tone="success" />
        <AdminMetricCard label="Vadesi Geçen" value={formatTRY(overdue)} icon={FileText} tone={overdue ? "danger" : "success"} />
      </div>

      <Tabs defaultValue="invoices">
        <TabsList className="h-auto flex-wrap"><TabsTrigger value="invoices">Faturalar</TabsTrigger><TabsTrigger value="accounts">Cari Hesap</TabsTrigger><TabsTrigger value="payments">Ödemeler</TabsTrigger></TabsList>
        <TabsContent value="invoices" className="mt-4"><Table rows={data.invoices} empty="Fatura yok" columns={["Fatura", "Müşteri", "Vade", "Toplam", "Durum", "İşlem"]} render={(row) => {
          const c = data.customers.find((x) => x.id === row.customer_id);
          return [row.invoice_number, customerName(c), formatDate(row.due_date), formatTRY(row.total), <span className={cn("rounded-md border px-2 py-1 text-xs", statusBadgeClass(row.status))}>{labelOf(INVOICE_STATUSES, row.status)}</span>, <Actions onEdit={() => { setInvoice({ ...emptyInvoice, ...row, customer_id: row.customer_id || "", project_id: row.project_id || "", offer_id: row.offer_id || "", due_date: row.due_date || "", payment_method: row.payment_method || "", payment_date: row.payment_date || "" }); setInvoiceOpen(true); }} onDelete={() => remove("invoices", row)} />];
        }} /></TabsContent>
        <TabsContent value="accounts" className="mt-4"><Table rows={data.accountRecords} empty="Cari kayıt yok" columns={["Açıklama", "Müşteri", "Tür", "Tutar", "Etiket", "Durum", "İşlem"]} render={(row) => {
          const c = data.customers.find((x) => x.id === row.customer_id);
          return [row.description, customerName(c), labelOf(ACCOUNT_TYPES, row.record_type), formatTRY(row.amount), row.is_official ? "Resmi" : "İç kayıt", labelOf(ACCOUNT_STATUSES, row.status), <Actions onEdit={() => { setRecord({ ...emptyRecord, ...row, customer_id: row.customer_id || "", project_id: row.project_id || "", due_date: row.due_date || "", is_official: String(row.is_official) }); setRecordOpen(true); }} onDelete={() => remove("account_records", row)} />];
        }} /></TabsContent>
        <TabsContent value="payments" className="mt-4"><Table rows={data.payments} empty="Ödeme yok" columns={["Tarih", "Müşteri", "Tutar", "Yöntem", "Referans", "İşlem"]} render={(row) => {
          const c = data.customers.find((x) => x.id === row.customer_id);
          return [formatDate(row.payment_date), customerName(c), formatTRY(row.amount), labelOf(PAYMENT_METHODS, row.method), row.reference_number || "-", <Actions onEdit={() => { setPayment({ ...emptyPayment, ...row, customer_id: row.customer_id || "", invoice_id: row.invoice_id || "", account_record_id: row.account_record_id || "", project_id: row.project_id || "" }); setPaymentOpen(true); }} onDelete={() => remove("payments", row)} />];
        }} /></TabsContent>
      </Tabs>

      <Dialog open={invoiceOpen} onOpenChange={setInvoiceOpen}><DialogContent className="max-w-3xl"><DialogHeader><DialogTitle>Fatura</DialogTitle></DialogHeader><div className="grid gap-4 md:grid-cols-2"><Field label="Fatura No" value={invoice.invoice_number} onChange={(v) => setInvoice((f: any) => ({ ...f, invoice_number: v }))} /><div><Label>Müşteri</Label>{customerSelect(invoice.customer_id, (v) => setInvoice((f: any) => ({ ...f, customer_id: v })))}</div><Field type="date" label="Kesim Tarihi" value={invoice.issue_date} onChange={(v) => setInvoice((f: any) => ({ ...f, issue_date: v }))} /><Field type="date" label="Vade" value={invoice.due_date} onChange={(v) => setInvoice((f: any) => ({ ...f, due_date: v }))} /><Field type="number" label="Tutar" value={invoice.amount} onChange={(v) => setInvoice((f: any) => ({ ...f, amount: v, total: Number(v || 0) + Number(f.vat || 0) }))} /><Field type="number" label="KDV" value={invoice.vat} onChange={(v) => setInvoice((f: any) => ({ ...f, vat: v, total: Number(f.amount || 0) + Number(v || 0) }))} /><Field type="number" label="Toplam" value={invoice.total} onChange={(v) => setInvoice((f: any) => ({ ...f, total: v }))} /><div><Label>Durum</Label><Select value={invoice.status} onValueChange={(v) => setInvoice((f: any) => ({ ...f, status: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{INVOICE_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent></Select></div><div className="md:col-span-2"><Label>Notlar</Label><Textarea value={invoice.notes || ""} onChange={(e) => setInvoice((f: any) => ({ ...f, notes: e.target.value }))} /></div></div><DialogFooter><Button variant="outline" onClick={() => setInvoiceOpen(false)}>İptal</Button><Button onClick={saveInvoice}>Kaydet</Button></DialogFooter></DialogContent></Dialog>
      <Dialog open={recordOpen} onOpenChange={setRecordOpen}><DialogContent className="max-w-3xl"><DialogHeader><DialogTitle>Cari Hesap Kaydı</DialogTitle></DialogHeader><div className="grid gap-4 md:grid-cols-2"><div><Label>Müşteri</Label>{customerSelect(record.customer_id, (v) => setRecord((f: any) => ({ ...f, customer_id: v })))}</div><Field label="Açıklama" value={record.description} onChange={(v) => setRecord((f: any) => ({ ...f, description: v }))} /><div><Label>Tür</Label><Select value={record.record_type} onValueChange={(v) => setRecord((f: any) => ({ ...f, record_type: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{ACCOUNT_TYPES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent></Select></div><Field type="number" label="Tutar" value={record.amount} onChange={(v) => setRecord((f: any) => ({ ...f, amount: v }))} /><Field type="date" label="Tarih" value={record.record_date} onChange={(v) => setRecord((f: any) => ({ ...f, record_date: v }))} /><Field type="date" label="Vade" value={record.due_date} onChange={(v) => setRecord((f: any) => ({ ...f, due_date: v }))} /><div><Label>Durum</Label><Select value={record.status} onValueChange={(v) => setRecord((f: any) => ({ ...f, status: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{ACCOUNT_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent></Select></div><div><Label>Etiket</Label><Select value={record.is_official} onValueChange={(v) => setRecord((f: any) => ({ ...f, is_official: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="true">Resmi</SelectItem><SelectItem value="false">İç kayıt / resmi değil</SelectItem></SelectContent></Select></div><div className="md:col-span-2"><Label>Not</Label><Textarea value={record.notes || ""} onChange={(e) => setRecord((f: any) => ({ ...f, notes: e.target.value }))} /></div></div><DialogFooter><Button variant="outline" onClick={() => setRecordOpen(false)}>İptal</Button><Button onClick={saveRecord}>Kaydet</Button></DialogFooter></DialogContent></Dialog>
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}><DialogContent className="max-w-3xl"><DialogHeader><DialogTitle>Ödeme / Tahsilat</DialogTitle></DialogHeader><div className="grid gap-4 md:grid-cols-2"><div><Label>Müşteri</Label>{customerSelect(payment.customer_id, (v) => setPayment((f: any) => ({ ...f, customer_id: v })))}</div><Field type="number" label="Tutar" value={payment.amount} onChange={(v) => setPayment((f: any) => ({ ...f, amount: v }))} /><Field type="date" label="Tarih" value={payment.payment_date} onChange={(v) => setPayment((f: any) => ({ ...f, payment_date: v }))} /><div><Label>Yöntem</Label><Select value={payment.method} onValueChange={(v) => setPayment((f: any) => ({ ...f, method: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PAYMENT_METHODS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent></Select></div><Field label="Referans No" value={payment.reference_number} onChange={(v) => setPayment((f: any) => ({ ...f, reference_number: v }))} /><div className="md:col-span-2"><Label>Not</Label><Textarea value={payment.notes || ""} onChange={(e) => setPayment((f: any) => ({ ...f, notes: e.target.value }))} /></div></div><DialogFooter><Button variant="outline" onClick={() => setPaymentOpen(false)}>İptal</Button><Button onClick={savePayment}>Kaydet</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <div><Label>{label}</Label><Input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} /></div>;
}

function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return <div className="flex justify-end gap-1"><Button size="sm" variant="ghost" onClick={onEdit}><Edit className="h-4 w-4" /></Button><Button size="sm" variant="ghost" onClick={onDelete}><Trash2 className="h-4 w-4 text-destructive" /></Button></div>;
}

function Table({ rows, columns, render, empty }: { rows: any[]; columns: string[]; render: (row: any) => React.ReactNode[]; empty: string }) {
  if (!rows.length) return <AdminEmptyState title={empty} icon={Wallet} />;
  return <div className="overflow-x-auto rounded-lg border border-border bg-card"><table className="w-full text-sm"><thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground"><tr>{columns.map((c) => <th key={c} className="p-3">{c}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id} className="border-t border-border">{render(row).map((cell, i) => <td key={i} className={cn("p-3", i === columns.length - 1 && "text-right")}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
