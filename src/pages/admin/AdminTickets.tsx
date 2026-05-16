/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import { Edit, Headphones, Plus, Search, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminEmptyState, AdminMetricCard, AdminPageHeader } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCrmData } from "@/hooks/useCrmData";
import { customerName, DbRow, formatDate, labelOf, PRIORITIES, statusBadgeClass, TICKET_CATEGORIES, TICKET_CHANNELS, TICKET_STATUSES, todayISO } from "@/lib/crm";
import { cn } from "@/lib/utils";

const empty = { id: "", title: "", customer_id: "", contact_person: "", channel: "phone", category: "other", priority: "medium", status: "open", description: "", resolution_notes: "", opened_date: todayISO(), closed_date: "", project_id: "" };

export default function AdminTickets() {
  const { data, loading, reload } = useCrmData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(empty);
  const { toast } = useToast();

  const filtered = useMemo(() => data.tickets.filter((ticket) => {
    const customer = data.customers.find((item) => item.id === ticket.customer_id);
    const haystack = `${ticket.title} ${ticket.description ?? ""} ${customerName(customer)} ${ticket.contact_person ?? ""}`.toLocaleLowerCase("tr-TR");
    if (query && !haystack.includes(query.toLocaleLowerCase("tr-TR"))) return false;
    if (status !== "all" && ticket.status !== status) return false;
    return true;
  }), [data, query, status]);

  const summary = {
    open: data.tickets.filter((item) => !["resolved", "closed"].includes(item.status)).length,
    urgent: data.tickets.filter((item) => item.priority === "urgent" && !["resolved", "closed"].includes(item.status)).length,
    resolved: data.tickets.filter((item) => item.status === "resolved" || item.status === "closed").length,
    waiting: data.tickets.filter((item) => item.status === "waiting_customer").length,
  };

  function openNew() { setForm(empty); setOpen(true); }
  function openEdit(row: DbRow) { setForm({ ...empty, ...row, customer_id: row.customer_id || "", project_id: row.project_id || "", closed_date: row.closed_date || "" }); setOpen(true); }
  async function save() {
    if (!supabase || !form.title.trim()) return;
    const payload = { ...form, customer_id: form.customer_id || null, project_id: form.project_id || null, closed_date: form.closed_date || (["resolved", "closed"].includes(form.status) ? todayISO() : null) };
    delete payload.id;
    const result = form.id ? await (supabase.from("support_tickets" as any).update(payload).eq("id", form.id) as any) : await (supabase.from("support_tickets" as any).insert(payload) as any);
    if (result.error) toast({ title: "Destek talebi kaydedilemedi", description: result.error.message, variant: "destructive" });
    else { toast({ title: "Destek talebi kaydedildi" }); setOpen(false); reload(); }
  }
  async function remove(row: DbRow) {
    if (!supabase || !confirm("Destek talebi silinsin mi?")) return;
    await (supabase.from("support_tickets" as any).delete().eq("id", row.id) as any);
    toast({ title: "Destek talebi silindi" }); reload();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Teknik Servis" title="Destek Talepleri" description="Telefon, WhatsApp, e-posta, web ve yerinde servis kanallarından gelen IT destek taleplerini yönetin." actions={<Button onClick={openNew} className="bg-gradient-electric text-white shadow-glow"><Plus className="h-4 w-4" /> Talep Aç</Button>} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard label="Açık" value={summary.open} icon={Headphones} tone="warning" />
        <AdminMetricCard label="Acil" value={summary.urgent} icon={Headphones} tone={summary.urgent ? "danger" : "success"} />
        <AdminMetricCard label="Müşteri Bekliyor" value={summary.waiting} icon={Headphones} tone="accent" />
        <AdminMetricCard label="Çözülen" value={summary.resolved} icon={Headphones} tone="success" />
      </div>
      <div className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-[minmax(0,1fr)_220px]"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} className="pl-9" placeholder="Talep, müşteri veya açıklama ara..." /></div><Select value={status} onValueChange={setStatus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tüm durumlar</SelectItem>{TICKET_STATUSES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
      {loading ? <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">Yükleniyor...</div> : filtered.length === 0 ? <AdminEmptyState title="Destek talebi yok" icon={Headphones} action={<Button onClick={openNew}>Talep Aç</Button>} /> : <div className="overflow-x-auto rounded-lg border border-border bg-card"><table className="w-full text-sm"><thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Talep</th><th className="p-3">Müşteri</th><th className="p-3">Kanal</th><th className="p-3">Kategori</th><th className="p-3">Öncelik</th><th className="p-3">Durum</th><th className="p-3">Açılış</th><th className="p-3 text-right">İşlem</th></tr></thead><tbody>{filtered.map((ticket) => { const c = data.customers.find((x) => x.id === ticket.customer_id); return <tr key={ticket.id} className="border-t border-border"><td className="p-3"><div className="font-semibold">{ticket.title}</div><div className="text-xs text-muted-foreground">{ticket.description || "-"}</div></td><td className="p-3">{customerName(c)}</td><td className="p-3">{labelOf(TICKET_CHANNELS, ticket.channel)}</td><td className="p-3">{labelOf(TICKET_CATEGORIES, ticket.category)}</td><td className="p-3"><span className={cn("rounded-md border px-2 py-1 text-xs", statusBadgeClass(ticket.priority))}>{labelOf(PRIORITIES, ticket.priority)}</span></td><td className="p-3"><span className={cn("rounded-md border px-2 py-1 text-xs", statusBadgeClass(ticket.status))}>{labelOf(TICKET_STATUSES, ticket.status)}</span></td><td className="p-3">{formatDate(ticket.opened_date)}</td><td className="p-3"><div className="flex justify-end gap-1"><Button size="sm" variant="ghost" onClick={() => openEdit(ticket)}><Edit className="h-4 w-4" /></Button><Button size="sm" variant="ghost" onClick={() => remove(ticket)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></td></tr>; })}</tbody></table></div>}
      <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto"><DialogHeader><DialogTitle>Destek Talebi</DialogTitle></DialogHeader><div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2"><Label>Başlık *</Label><Input value={form.title} onChange={(e) => setForm((f: any) => ({ ...f, title: e.target.value }))} /></div>
        <div><Label>Müşteri</Label><Select value={form.customer_id || "none"} onValueChange={(v) => setForm((f: any) => ({ ...f, customer_id: v === "none" ? "" : v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.customers.map((c) => <SelectItem key={c.id} value={c.id}>{customerName(c)}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>İlgili Proje</Label><Select value={form.project_id || "none"} onValueChange={(v) => setForm((f: any) => ({ ...f, project_id: v === "none" ? "" : v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Yetkili</Label><Input value={form.contact_person || ""} onChange={(e) => setForm((f: any) => ({ ...f, contact_person: e.target.value }))} /></div>
        <div><Label>Kanal</Label><Select value={form.channel} onValueChange={(v) => setForm((f: any) => ({ ...f, channel: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TICKET_CHANNELS.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Kategori</Label><Select value={form.category} onValueChange={(v) => setForm((f: any) => ({ ...f, category: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TICKET_CATEGORIES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Öncelik</Label><Select value={form.priority} onValueChange={(v) => setForm((f: any) => ({ ...f, priority: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PRIORITIES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Durum</Label><Select value={form.status} onValueChange={(v) => setForm((f: any) => ({ ...f, status: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TICKET_STATUSES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Açılış</Label><Input type="date" value={form.opened_date} onChange={(e) => setForm((f: any) => ({ ...f, opened_date: e.target.value }))} /></div>
        <div><Label>Kapanış</Label><Input type="date" value={form.closed_date || ""} onChange={(e) => setForm((f: any) => ({ ...f, closed_date: e.target.value }))} /></div>
        <div className="md:col-span-2"><Label>Açıklama</Label><Textarea value={form.description || ""} onChange={(e) => setForm((f: any) => ({ ...f, description: e.target.value }))} rows={3} /></div>
        <div className="md:col-span-2"><Label>Çözüm Notu</Label><Textarea value={form.resolution_notes || ""} onChange={(e) => setForm((f: any) => ({ ...f, resolution_notes: e.target.value }))} rows={3} /></div>
      </div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>İptal</Button><Button onClick={save}>Kaydet</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}
