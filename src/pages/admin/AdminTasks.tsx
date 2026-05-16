/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import { CheckSquare, Edit, Plus, Search, Trash2 } from "lucide-react";
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
import { customerName, DbRow, formatDate, labelOf, PRIORITIES, statusBadgeClass, TASK_STATUSES, todayISO } from "@/lib/crm";
import { cn } from "@/lib/utils";

const empty = { id: "", title: "", description: "", customer_id: "", project_id: "", ticket_id: "", priority: "medium", status: "todo", due_date: "", completed_date: "", notes: "" };

export default function AdminTasks() {
  const { data, loading, reload } = useCrmData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(empty);
  const { toast } = useToast();

  const filtered = useMemo(() => data.tasks.filter((task) => {
    const project = data.projects.find((item) => item.id === task.project_id);
    const customer = data.customers.find((item) => item.id === task.customer_id);
    const haystack = `${task.title} ${task.description ?? ""} ${project?.title ?? ""} ${customerName(customer)}`.toLocaleLowerCase("tr-TR");
    if (query && !haystack.includes(query.toLocaleLowerCase("tr-TR"))) return false;
    if (status !== "all" && task.status !== status) return false;
    if (priority !== "all" && task.priority !== priority) return false;
    return true;
  }), [data, priority, query, status]);

  const today = todayISO();
  const summary = {
    total: data.tasks.length,
    overdue: data.tasks.filter((item) => item.due_date && item.due_date < today && !["done", "cancelled"].includes(item.status)).length,
    today: data.tasks.filter((item) => item.due_date === today).length,
    open: data.tasks.filter((item) => !["done", "cancelled"].includes(item.status)).length,
  };

  function openNew() { setForm(empty); setOpen(true); }
  function openEdit(row: DbRow) { setForm({ ...empty, ...row, id: row.id, customer_id: row.customer_id || "", project_id: row.project_id || "", ticket_id: row.ticket_id || "", due_date: row.due_date || "", completed_date: row.completed_date || "" }); setOpen(true); }
  function update(key: string, value: string) { setForm((current: any) => ({ ...current, [key]: value })); }

  async function save() {
    if (!supabase || !form.title.trim()) { toast({ title: "Görev başlığı zorunludur", variant: "destructive" }); return; }
    const payload = {
      title: form.title.trim(),
      description: form.description || null,
      customer_id: form.customer_id || null,
      project_id: form.project_id || null,
      ticket_id: form.ticket_id || null,
      priority: form.priority,
      status: form.status,
      due_date: form.due_date || null,
      completed_date: form.completed_date || (form.status === "done" ? todayISO() : null),
      notes: form.notes || null,
    };
    const result = form.id ? await (supabase.from("tasks" as any).update(payload).eq("id", form.id) as any) : await (supabase.from("tasks" as any).insert(payload) as any);
    if (result.error) toast({ title: "Görev kaydedilemedi", description: result.error.message, variant: "destructive" });
    else { toast({ title: "Görev kaydedildi" }); setOpen(false); reload(); }
  }

  async function remove(row: DbRow) {
    if (!supabase || !confirm(`"${row.title}" görevi silinsin mi?`)) return;
    await (supabase.from("tasks" as any).delete().eq("id", row.id) as any);
    toast({ title: "Görev silindi" }); reload();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Operasyon" title="Görevler" description="Müşteri, proje ve destek taleplerine bağlı yapılacak işleri takip edin." actions={<Button onClick={openNew} className="bg-gradient-electric text-white shadow-glow"><Plus className="h-4 w-4" /> Görev Ekle</Button>} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard label="Toplam" value={summary.total} icon={CheckSquare} />
        <AdminMetricCard label="Açık" value={summary.open} icon={CheckSquare} tone="warning" />
        <AdminMetricCard label="Bugün" value={summary.today} icon={CheckSquare} tone="accent" />
        <AdminMetricCard label="Gecikmiş" value={summary.overdue} icon={CheckSquare} tone={summary.overdue ? "danger" : "success"} />
      </div>
      <div className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-[minmax(0,1fr)_180px_180px]">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Görev ara..." className="pl-9" /></div>
        <Select value={status} onValueChange={setStatus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tüm durumlar</SelectItem>{TASK_STATUSES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select>
        <Select value={priority} onValueChange={setPriority}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tüm öncelikler</SelectItem>{PRIORITIES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select>
      </div>
      {loading ? <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">Yükleniyor...</div> : filtered.length === 0 ? <AdminEmptyState title="Görev bulunamadı" icon={CheckSquare} action={<Button onClick={openNew}>Görev Ekle</Button>} /> : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm"><thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Görev</th><th className="p-3">Bağlantı</th><th className="p-3">Öncelik</th><th className="p-3">Vade</th><th className="p-3">Durum</th><th className="p-3 text-right">İşlem</th></tr></thead><tbody>
            {filtered.map((task) => {
              const project = data.projects.find((item) => item.id === task.project_id);
              const customer = data.customers.find((item) => item.id === task.customer_id);
              return <tr key={task.id} className="border-t border-border"><td className="p-3"><div className="font-semibold">{task.title}</div><div className="text-xs text-muted-foreground">{task.description || "-"}</div></td><td className="p-3 text-xs">{customerName(customer)}<br />{project?.title || ""}</td><td className="p-3">{labelOf(PRIORITIES, task.priority)}</td><td className="p-3">{formatDate(task.due_date)}</td><td className="p-3"><span className={cn("rounded-md border px-2 py-1 text-xs", statusBadgeClass(task.status))}>{labelOf(TASK_STATUSES, task.status)}</span></td><td className="p-3"><div className="flex justify-end gap-1"><Button size="sm" variant="ghost" onClick={() => openEdit(task)}><Edit className="h-4 w-4" /></Button><Button size="sm" variant="ghost" onClick={() => remove(task)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></td></tr>;
            })}
          </tbody></table>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-w-3xl"><DialogHeader><DialogTitle>{form.id ? "Görevi Düzenle" : "Yeni Görev"}</DialogTitle></DialogHeader><div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2"><Label>Başlık *</Label><Input value={form.title} onChange={(e) => update("title", e.target.value)} /></div>
        <div><Label>Müşteri</Label><Select value={form.customer_id || "none"} onValueChange={(v) => update("customer_id", v === "none" ? "" : v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.customers.map((c) => <SelectItem key={c.id} value={c.id}>{customerName(c)}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Proje</Label><Select value={form.project_id || "none"} onValueChange={(v) => update("project_id", v === "none" ? "" : v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Destek Talebi</Label><Select value={form.ticket_id || "none"} onValueChange={(v) => update("ticket_id", v === "none" ? "" : v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.tickets.map((t) => <SelectItem key={t.id} value={t.id}>{t.title}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Öncelik</Label><Select value={form.priority} onValueChange={(v) => update("priority", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PRIORITIES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Durum</Label><Select value={form.status} onValueChange={(v) => update("status", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{TASK_STATUSES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Vade</Label><Input type="date" value={form.due_date} onChange={(e) => update("due_date", e.target.value)} /></div>
        <div><Label>Tamamlanma</Label><Input type="date" value={form.completed_date} onChange={(e) => update("completed_date", e.target.value)} /></div>
        <div className="md:col-span-2"><Label>Açıklama</Label><Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={2} /></div>
        <div className="md:col-span-2"><Label>Notlar</Label><Textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={2} /></div>
      </div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>İptal</Button><Button onClick={save} className="bg-gradient-electric text-white">Kaydet</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}
