/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";
import { Copy, Edit, FileText, Plus, Printer, Trash2 } from "lucide-react";
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
import { customerName, DbRow, formatDate, formatTRY, labelOf, OFFER_STATUSES, offerItemTotal, statusBadgeClass, todayISO } from "@/lib/crm";
import { cn } from "@/lib/utils";

const emptyItem = { item_name: "", description: "", quantity: "1", unit_price: "", vat_rate: "20", discount: "0" };
const emptyOffer = { id: "", offer_number: "", customer_id: "", lead_id: "", project_id: "", offer_date: todayISO(), valid_until: "", status: "draft", notes: "", terms: "" };

export default function AdminOffers() {
  const { data, loading, reload } = useCrmData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(emptyOffer);
  const [items, setItems] = useState<any[]>([{ ...emptyItem }]);
  const { toast } = useToast();

  const totals = useMemo(() => {
    const computed = items.map(offerItemTotal);
    return {
      subtotal: computed.reduce((sum, item) => sum + item.net, 0),
      vat_total: computed.reduce((sum, item) => sum + item.vat, 0),
      grand_total: computed.reduce((sum, item) => sum + item.total, 0),
    };
  }, [items]);

  const summary = {
    total: data.offers.length,
    sent: data.offers.filter((item) => item.status === "sent").length,
    accepted: data.offers.filter((item) => item.status === "accepted").length,
    value: data.offers.reduce((sum, item) => sum + Number(item.grand_total || 0), 0),
  };

  function nextOfferNumber() {
    const count = data.offers.length + 1;
    return `TEK-${new Date().getFullYear()}-${String(count).padStart(4, "0")}`;
  }

  function openNew() {
    setForm({ ...emptyOffer, offer_number: nextOfferNumber() });
    setItems([{ ...emptyItem }]);
    setOpen(true);
  }

  function openEdit(row: DbRow) {
    setForm({ ...emptyOffer, ...row, customer_id: row.customer_id || "", lead_id: row.lead_id || "", project_id: row.project_id || "", valid_until: row.valid_until || "" });
    const currentItems = data.offerItems.filter((item) => item.offer_id === row.id);
    setItems(currentItems.length ? currentItems.map((item) => ({ ...item, quantity: String(item.quantity), unit_price: String(item.unit_price), vat_rate: String(item.vat_rate), discount: String(item.discount) })) : [{ ...emptyItem }]);
    setOpen(true);
  }

  function updateItem(index: number, key: string, value: string) {
    setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  }

  async function save() {
    if (!supabase || !form.offer_number.trim()) { toast({ title: "Teklif numarası zorunludur", variant: "destructive" }); return; }
    const payload = { ...form, customer_id: form.customer_id || null, lead_id: form.lead_id || null, project_id: form.project_id || null, valid_until: form.valid_until || null, ...totals };
    delete payload.id;
    const result = form.id
      ? await (supabase.from("offers" as any).update(payload).eq("id", form.id).select("id").single() as any)
      : await (supabase.from("offers" as any).insert(payload).select("id").single() as any);
    if (result.error) { toast({ title: "Teklif kaydedilemedi", description: result.error.message, variant: "destructive" }); return; }
    const offerId = result.data.id;
    await (supabase.from("offer_items" as any).delete().eq("offer_id", offerId) as any);
    const itemRows = items.filter((item) => item.item_name.trim()).map((item, index) => {
      const computed = offerItemTotal(item);
      return { offer_id: offerId, item_name: item.item_name.trim(), description: item.description || null, quantity: Number(item.quantity || 0), unit_price: Number(item.unit_price || 0), vat_rate: Number(item.vat_rate || 0), discount: Number(item.discount || 0), total: computed.total, sort_order: index };
    });
    if (itemRows.length) await (supabase.from("offer_items" as any).insert(itemRows) as any);
    toast({ title: "Teklif kaydedildi" });
    setOpen(false);
    reload();
  }

  async function duplicate(row: DbRow) {
    if (!supabase) return;
    const sourceItems = data.offerItems.filter((item) => item.offer_id === row.id);
    const { data: copy, error } = await (supabase.from("offers" as any).insert({ ...row, id: undefined, offer_number: nextOfferNumber(), status: "draft", created_at: undefined, updated_at: undefined }).select("id").single() as any);
    if (error) { toast({ title: "Teklif kopyalanamadı", description: error.message, variant: "destructive" }); return; }
    if (sourceItems.length) await (supabase.from("offer_items" as any).insert(sourceItems.map((item) => ({ ...item, id: undefined, offer_id: copy.id, created_at: undefined, updated_at: undefined }))) as any);
    toast({ title: "Teklif kopyalandı" }); reload();
  }

  async function updateStatus(row: DbRow, status: string) {
    if (!supabase) return;
    await (supabase.from("offers" as any).update({ status }).eq("id", row.id) as any);
    toast({ title: "Teklif durumu güncellendi" }); reload();
  }

  async function convertToProject(row: DbRow) {
    if (!supabase) return;
    const { error } = await (supabase.from("projects" as any).insert({ title: `${row.offer_number} projesi`, short_description: row.notes || "Kabul edilen tekliften oluşturuldu.", detail_description: row.notes, status: "draft", customer_id: row.customer_id, related_offer_id: row.id, project_status: "planning", budget: Number(row.grand_total || 0), progress_percentage: 0 }) as any);
    if (error) toast({ title: "Proje oluşturulamadı", description: error.message, variant: "destructive" });
    else toast({ title: "Tekliften proje oluşturuldu" });
    reload();
  }

  async function remove(row: DbRow) {
    if (!supabase || !confirm(`${row.offer_number} silinsin mi?`)) return;
    await (supabase.from("offers" as any).delete().eq("id", row.id) as any);
    toast({ title: "Teklif silindi" }); reload();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader eyebrow="Satış" title="Teklifler" description="Teklif kalemleri, KDV, indirim, durum ve proje dönüşüm süreçlerini yönetin." actions={<Button onClick={openNew} className="bg-gradient-electric text-white shadow-glow"><Plus className="h-4 w-4" /> Teklif Oluştur</Button>} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard label="Toplam Teklif" value={summary.total} icon={FileText} />
        <AdminMetricCard label="Gönderildi" value={summary.sent} icon={FileText} tone="warning" />
        <AdminMetricCard label="Kabul Edildi" value={summary.accepted} icon={FileText} tone="success" />
        <AdminMetricCard label="Teklif Tutarı" value={formatTRY(summary.value)} icon={FileText} tone="accent" />
      </div>
      {loading ? <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">Yükleniyor...</div> : data.offers.length === 0 ? <AdminEmptyState title="Teklif yok" icon={FileText} action={<Button onClick={openNew}>Teklif Oluştur</Button>} /> : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm"><thead className="bg-secondary/60 text-left text-xs uppercase text-muted-foreground"><tr><th className="p-3">Teklif</th><th className="p-3">Müşteri</th><th className="p-3">Tarih</th><th className="p-3 text-right">Toplam</th><th className="p-3">Durum</th><th className="p-3 text-right">İşlem</th></tr></thead><tbody>
            {data.offers.map((offer) => {
              const customer = data.customers.find((item) => item.id === offer.customer_id);
              return <tr key={offer.id} className="border-t border-border"><td className="p-3 font-semibold">{offer.offer_number}</td><td className="p-3">{customerName(customer)}</td><td className="p-3">{formatDate(offer.offer_date)}</td><td className="p-3 text-right font-medium">{formatTRY(offer.grand_total)}</td><td className="p-3"><span className={cn("rounded-md border px-2 py-1 text-xs", statusBadgeClass(offer.status))}>{labelOf(OFFER_STATUSES, offer.status)}</span></td><td className="p-3"><div className="flex flex-wrap justify-end gap-1"><Button size="sm" variant="ghost" onClick={() => openEdit(offer)}><Edit className="h-4 w-4" /></Button><Button size="sm" variant="ghost" onClick={() => duplicate(offer)}><Copy className="h-4 w-4" /></Button><Button size="sm" variant="outline" onClick={() => updateStatus(offer, "accepted")}>Kabul</Button><Button size="sm" variant="outline" onClick={() => convertToProject(offer)}>Projeye Çevir</Button><Button size="sm" variant="ghost" onClick={() => remove(offer)}><Trash2 className="h-4 w-4 text-destructive" /></Button></div></td></tr>;
            })}
          </tbody></table>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto"><DialogHeader><DialogTitle>{form.id ? "Teklifi Düzenle" : "Yeni Teklif"}</DialogTitle></DialogHeader>
        <div className="grid gap-4 md:grid-cols-4">
          <div><Label>Teklif No</Label><Input value={form.offer_number} onChange={(e) => setForm((f: any) => ({ ...f, offer_number: e.target.value }))} /></div>
          <div><Label>Müşteri</Label><Select value={form.customer_id || "none"} onValueChange={(v) => setForm((f: any) => ({ ...f, customer_id: v === "none" ? "" : v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.customers.map((c) => <SelectItem key={c.id} value={c.id}>{customerName(c)}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>Teklif Tarihi</Label><Input type="date" value={form.offer_date} onChange={(e) => setForm((f: any) => ({ ...f, offer_date: e.target.value }))} /></div>
          <div><Label>Geçerlilik</Label><Input type="date" value={form.valid_until} onChange={(e) => setForm((f: any) => ({ ...f, valid_until: e.target.value }))} /></div>
          <div><Label>Durum</Label><Select value={form.status} onValueChange={(v) => setForm((f: any) => ({ ...f, status: v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{OFFER_STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>Fırsat</Label><Select value={form.lead_id || "none"} onValueChange={(v) => setForm((f: any) => ({ ...f, lead_id: v === "none" ? "" : v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.leads.map((l) => <SelectItem key={l.id} value={l.id}>{l.prospect_name}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>Proje</Label><Select value={form.project_id || "none"} onValueChange={(v) => setForm((f: any) => ({ ...f, project_id: v === "none" ? "" : v }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">Seçilmedi</SelectItem>{data.projects.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent></Select></div>
          <div className="flex items-end"><Button type="button" variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4" /> Yazdır</Button></div>
        </div>
        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-[1.2fr_1fr_90px_110px_90px_100px_44px] gap-2 text-xs font-semibold uppercase text-muted-foreground"><div>Ürün/Hizmet</div><div>Açıklama</div><div>Adet</div><div>Birim</div><div>KDV</div><div>İndirim</div><div /></div>
          {items.map((item, index) => <div key={index} className="grid grid-cols-[1.2fr_1fr_90px_110px_90px_100px_44px] gap-2"><Input value={item.item_name} onChange={(e) => setItems((cur) => cur.map((x, i) => i === index ? { ...x, item_name: e.target.value } : x))} /><Input value={item.description || ""} onChange={(e) => setItems((cur) => cur.map((x, i) => i === index ? { ...x, description: e.target.value } : x))} /><Input type="number" value={item.quantity} onChange={(e) => updateItem(index, "quantity", e.target.value)} /><Input type="number" value={item.unit_price} onChange={(e) => updateItem(index, "unit_price", e.target.value)} /><Input type="number" value={item.vat_rate} onChange={(e) => updateItem(index, "vat_rate", e.target.value)} /><Input type="number" value={item.discount} onChange={(e) => updateItem(index, "discount", e.target.value)} /><Button type="button" variant="ghost" size="icon" onClick={() => setItems((cur) => cur.filter((_, i) => i !== index))}><Trash2 className="h-4 w-4" /></Button></div>)}
          <Button type="button" variant="outline" onClick={() => setItems((cur) => [...cur, { ...emptyItem }])}><Plus className="h-4 w-4" /> Kalem Ekle</Button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_280px]">
          <div className="space-y-3"><Textarea value={form.notes || ""} onChange={(e) => setForm((f: any) => ({ ...f, notes: e.target.value }))} placeholder="Notlar" rows={3} /><Textarea value={form.terms || ""} onChange={(e) => setForm((f: any) => ({ ...f, terms: e.target.value }))} placeholder="Şartlar" rows={3} /></div>
          <div className="rounded-lg border border-border bg-secondary/40 p-4 text-sm"><div className="flex justify-between"><span>Ara Toplam</span><strong>{formatTRY(totals.subtotal)}</strong></div><div className="mt-2 flex justify-between"><span>KDV</span><strong>{formatTRY(totals.vat_total)}</strong></div><div className="mt-3 border-t pt-3 flex justify-between text-lg"><span>Genel Toplam</span><strong>{formatTRY(totals.grand_total)}</strong></div></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>İptal</Button><Button onClick={save} className="bg-gradient-electric text-white">Kaydet</Button></DialogFooter>
      </DialogContent></Dialog>
    </div>
  );
}
