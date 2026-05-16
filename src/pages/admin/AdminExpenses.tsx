/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import { Edit, Plus, Receipt, Search, Trash2 } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { AdminEmptyState, AdminMetricCard, AdminPageHeader, AdminSection } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCrmData } from "@/hooks/useCrmData";
import { customerName, DbRow, EXPENSE_CATEGORIES, formatDate, formatTRY, labelOf, PAYMENT_METHODS, todayISO } from "@/lib/crm";

const empty = { id: "", category: "other", vendor: "", customer_id: "", project_id: "", amount: "", vat: "", expense_date: todayISO(), payment_method: "bank_transfer", has_receipt: "false", is_official: "true", notes: "" };
const colors = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#64748b"];

export default function AdminExpenses() {
  const { data, loading, reload } = useCrmData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(empty);
  const { toast } = useToast();

  const filtered = useMemo(() => data.expenses.filter((expense) => {
    const project = data.projects.find((item) => item.id === expense.project_id);
    const customer = data.customers.find((item) => item.id === expense.customer_id);
    const haystack = `${expense.vendor ?? ""} ${expense.notes ?? ""} ${project?.title ?? ""} ${customerName(customer)}`.toLocaleLowerCase("tr-TR");
    if (query && !haystack.includes(query.toLocaleLowerCase("tr-TR"))) return false;
    if (category !== "all" && expense.category !== category) return false;
    return true;
  }), [category, data, query]);

  const total = filtered.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const official = filtered.filter((item) => item.is_official).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const unofficial = total - official;
  const chart = EXPENSE_CATEGORIES.map((cat) => ({ name: cat.label, value: filtered.filter((item) => item.category === cat.value).reduce((sum, item) => sum + Number(item.amount || 0), 0) })).filter((item) => item.value > 0);

  function openNew() { setForm(empty); setOpen(true); }
  function openEdit(row: DbRow) { setForm({ ...empty, ...row, id: row.id, customer_id: row.customer_id || "", project_id: row.project_id || "", has_receipt: String(row.has_receipt), is_official: String(row.is_official), amount: String(row.amount), vat: String(row.vat ?? "") }); setOpen(true); }

  async function save() {
    if (!supabase || !form.amount) return;
    const payload = { ...form, customer_id: form.customer_id || null, project_id: form.project_id || null, amount: Number(form.amount || 0), vat: Number(form.vat || 0), has_receipt: form.has_receipt === "true", is_official: form.is_official === "true" };
    delete payload.id;
    const result = form.id ? await (supabase.from("expenses" as any).update(payload).eq("id", form.id) as any) : await (supabase.from("expenses" as any).insert(payload) as any);
    if (result.error) toast({ title: "Masraf kaydedilemedi", description: result.error.message, variant: "destructive" });
    else { toast({ title: "Masraf kaydedildi" }); setOpen(false); reload(); }
  }

  async function remove(row: DbRow) {
    if (!supabase || !confirm("Masraf silinsin mi?")) return;
    await (supabase.from("expenses" as any).delete().eq("id", row.id) as any);
    toast({ title: "Masraf silindi" }); reload();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Masraf Takibi" title="Masraflar" description="Yazılım aboneliği, hosting, donanım, taşeron, saha ve ofis masraflarını proje kârlılığına bağlayın." actions={<Button onClick={openNew} className="bg-gradient-electric text-white shadow-glow"><Plus className="h-4 w-4" /> Masraf Ekle</Button>} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard label="Toplam Masraf" value={formatTRY(total)} icon={Receipt} tone="danger" />
        <AdminMetricCard label="Resmi Masraf" value={formatTRY(official)} icon={Receipt} tone="warning" />
        <AdminMetricCard label="İç / Resmi Değil" value={formatTRY(unofficial)} icon={Receipt} tone="accent" />
        <AdminMetricCard label="Kayıt Sayısı" value={filtered.length} icon={Receipt} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <div className="grid gap-3 rounded-lg border border-border bg-card p-4 md:grid-cols-[minmax(0,1fr)_220px]"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tedarikçi, müşteri, proje veya not ara..." /></div><Select value={category} onValueChange={setCategory}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">Tüm kategoriler</SelectItem>{EXPENSE_CATEGORIES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
          {loading ? <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">Yükleniyor...</div> : filtered.length === 0 ? <AdminEmptyState title="Masraf bulunamadı" icon={Receipt} action={<Button onClick={openNew}>Masraf Ekle</Button>} /> : <div className="overflow-x-auto rounded-lg border border-border bg-card"><table className="w-full text-sm"><thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Tarih</th><th className="p-3">Kategori</th><th className="p-3">Tedarikçi</th><th className="p-3">Bağlantı</th><th className="p-3 text-right">Tutar</th><th className="p-3">Belge</th><th className="p-3 text-right">İşlem</th></tr></thead><tbody>{filtered.map((expense) => { const c = data.customers.find((x) => x.id === expense.customer_id); const p = data.projects.find((x) => x.id === expense.project_id); return <tr key={expense.id} className="border-t border-border"><td className="p-3">{formatDate(expense.expense_date)}</td><td className="p-3">{labelOf(EXPENSE_CATEGORIES, expense.category)}</td><td className="p-3">{expense.vendor || "-"}</td><td className="p-3 text-xs">{customerName(c)}<br />{p?.title || ""}</td><td className="p-3 text-right font-medium text-red-600">{formatTRY(expense.amount)}</td><td className="p-3">{expense.has_receipt ? "Var" : "Yok"} · {expense.is_official ? "Resmi" : "İç"}</td><td className="p-3"><div className="flex justify-end gap-1"><Button size="sm" variant="ghost" onClick={() => openEdit(expense)}><Edit className="h-4 w-4" /></Button><Button size="sm" variant="ghost" onClick={() => remove(expense)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></td></tr>; })}</tbody></table></div>}
        </div>
        <AdminSection title="Kategori Dağılımı" description="Seçili masrafların kırılımı">
          {chart.length ? <ResponsiveContainer width="100%" height={280}><PieChart><Pie data={chart} dataKey="value" nameKey="name" innerRadius={55} outerRadius={92}>{chart.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip formatter={(v: number) => formatTRY(v)} /></PieChart></ResponsiveContainer> : <AdminEmptyState title="Grafik verisi yok" icon={Receipt} />}
        </AdminSection>
      </div>
      <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-w-3xl"><DialogHeader><DialogTitle>Masraf</DialogTitle></DialogHeader><div className="grid gap-4 md:grid-cols-2">
        <div><Label>Kategori</Label><Select value={form.category} onValueChange={(v) => setForm((f: any) => ({ ...f, category: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{EXPENSE_CATEGORIES.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Tedarikçi</Label><Input value={form.vendor || ""} onChange={(e) => setForm((f: any) => ({ ...f, vendor: e.target.value }))} /></div>
        <div><Label>Müşteri</Label><Select value={form.customer_id || "none"} onValueChange={(v) => setForm((f: any) => ({ ...f, customer_id: v === "none" ? "" : v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.customers.map((c) => <SelectItem key={c.id} value={c.id}>{customerName(c)}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Proje</Label><Select value={form.project_id || "none"} onValueChange={(v) => setForm((f: any) => ({ ...f, project_id: v === "none" ? "" : v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Tutar</Label><Input type="number" value={form.amount} onChange={(e) => setForm((f: any) => ({ ...f, amount: e.target.value }))} /></div>
        <div><Label>KDV</Label><Input type="number" value={form.vat} onChange={(e) => setForm((f: any) => ({ ...f, vat: e.target.value }))} /></div>
        <div><Label>Tarih</Label><Input type="date" value={form.expense_date} onChange={(e) => setForm((f: any) => ({ ...f, expense_date: e.target.value }))} /></div>
        <div><Label>Ödeme Yöntemi</Label><Select value={form.payment_method} onValueChange={(v) => setForm((f: any) => ({ ...f, payment_method: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{PAYMENT_METHODS.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></div>
        <div><Label>Belge/Fatura</Label><Select value={form.has_receipt} onValueChange={(v) => setForm((f: any) => ({ ...f, has_receipt: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="true">Var</SelectItem><SelectItem value="false">Yok</SelectItem></SelectContent></Select></div>
        <div><Label>Resmi</Label><Select value={form.is_official} onValueChange={(v) => setForm((f: any) => ({ ...f, is_official: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="true">Evet</SelectItem><SelectItem value="false">Hayır / iç kayıt</SelectItem></SelectContent></Select></div>
        <div className="md:col-span-2"><Label>Not</Label><Textarea value={form.notes || ""} onChange={(e) => setForm((f: any) => ({ ...f, notes: e.target.value }))} rows={3} /></div>
      </div><DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>İptal</Button><Button onClick={save}>Kaydet</Button></DialogFooter></DialogContent></Dialog>
    </div>
  );
}
