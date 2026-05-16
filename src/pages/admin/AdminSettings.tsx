/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { ExternalLink, Save, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { defaultSettings } from "@/lib/eclipseContent";
import { AdminEmptyState, AdminPageHeader, AdminSection } from "@/components/admin/AdminPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useCrmData } from "@/hooks/useCrmData";

type SettingsForm = Record<string, any>;

const crmDefaults = {
  default_vat_rate: 20,
  default_currency: "TRY",
  offer_prefix: "TEK",
  invoice_prefix: "FTR",
  service_categories: ["Danışmanlık", "Network", "Sunucu", "Güvenlik", "Bulut", "Yazılım", "Teknik Destek"],
  expense_categories: ["software_subscription", "hosting_domain", "hardware_purchase", "subcontractor", "transport", "food", "office", "tax", "salary", "internet_phone", "other"],
};

export default function AdminSettings() {
  const [form, setForm] = useState<SettingsForm>({ ...defaultSettings, ...crmDefaults });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { data } = useCrmData();

  useEffect(() => {
    if (!supabase) return;
    (supabase.from("site_settings" as any).select("*").limit(1).maybeSingle() as any).then(({ data: row }: any) => {
      if (row) {
        const { updated_at: _updatedAt, ...rest } = { ...defaultSettings, ...crmDefaults, ...row };
        setForm(rest);
      }
    });
  }, []);

  function update(key: string, value: any) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    if (!supabase) {
      toast({ title: "Supabase bağlantısı yok", description: "Ayar kaydı için Supabase ortam değişkenleri gereklidir.", variant: "destructive" });
      return;
    }
    if (!form.company_name?.trim() || !form.phone?.trim() || !form.email?.trim()) {
      toast({ title: "Eksik bilgi", description: "Firma adı, telefon ve e-posta alanları zorunludur.", variant: "destructive" });
      return;
    }

    setSaving(true);
    const payload = { ...form };
    const result = form.id && form.id !== "fallback-settings"
      ? await (supabase.from("site_settings" as any).update(payload).eq("id", form.id) as any)
      : await (supabase.from("site_settings" as any).insert(payload) as any);
    setSaving(false);

    if (result.error) {
      toast({ title: "Kaydedilemedi", description: result.error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Ayarlar kaydedildi", description: "Site ve CRM varsayılanları güncellendi." });
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Kontrol Merkezi"
        title="Ayarlar"
        description="Eclipse Mühendislik iletişim, SEO, teklif/fatura ve CRM varsayılanlarını yönetin."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/">
                <ExternalLink className="h-4 w-4" />
                Siteyi Görüntüle
              </Link>
            </Button>
            <Button onClick={save} disabled={saving} className="bg-gradient-electric text-white shadow-glow">
              <Save className="h-4 w-4" />
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </Button>
          </>
        }
      />

      {!supabase && (
        <AdminEmptyState
          title="Supabase bağlantısı yok"
          description="Ayarlar varsayılan Eclipse bilgileriyle gösteriliyor. Kalıcı kayıt için ortam değişkenleri ve migration dosyaları uygulanmalıdır."
          icon={Settings}
        />
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminSection title="Firma Bilgileri" description="Footer, iletişim ve site genelinde kullanılan temel bilgiler.">
          <div className="grid gap-4">
            <div><Label>Firma Adı</Label><Input value={form.company_name ?? ""} onChange={(event) => update("company_name", event.target.value)} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Telefon</Label><Input value={form.phone ?? ""} onChange={(event) => update("phone", event.target.value)} /></div>
              <div><Label>WhatsApp</Label><Input value={form.whatsapp ?? ""} onChange={(event) => update("whatsapp", event.target.value)} /></div>
            </div>
            <div><Label>E-posta</Label><Input value={form.email ?? ""} onChange={(event) => update("email", event.target.value)} /></div>
            <div><Label>Adres</Label><Textarea value={form.address ?? ""} onChange={(event) => update("address", event.target.value)} rows={3} /></div>
            <div><Label>Footer Açıklaması</Label><Textarea value={form.footer_description ?? ""} onChange={(event) => update("footer_description", event.target.value)} rows={3} /></div>
          </div>
        </AdminSection>

        <AdminSection title="Bağlantılar ve SEO" description="Harita, sosyal medya ve arama motoru alanları.">
          <div className="grid gap-4">
            <div><Label>Harita Bağlantısı</Label><Input value={form.map_url ?? ""} onChange={(event) => update("map_url", event.target.value)} placeholder="https://..." /></div>
            <div><Label>Harita Embed Bağlantısı</Label><Input value={form.map_embed_url ?? ""} onChange={(event) => update("map_embed_url", event.target.value)} placeholder="https://..." /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>LinkedIn</Label><Input value={form.linkedin_url ?? ""} onChange={(event) => update("linkedin_url", event.target.value)} placeholder="https://..." /></div>
              <div><Label>Instagram</Label><Input value={form.instagram_url ?? ""} onChange={(event) => update("instagram_url", event.target.value)} placeholder="https://..." /></div>
            </div>
            <div><Label>SEO Title</Label><Input value={form.seo_title ?? ""} onChange={(event) => update("seo_title", event.target.value)} /></div>
            <div><Label>SEO Description</Label><Textarea value={form.seo_description ?? ""} onChange={(event) => update("seo_description", event.target.value)} rows={3} /></div>
          </div>
        </AdminSection>

        <AdminSection title="CRM Varsayılanları" description="Teklif, fatura, KDV, para birimi ve kategori ayarları.">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Varsayılan KDV (%)</Label><Input type="number" value={form.default_vat_rate ?? 20} onChange={(event) => update("default_vat_rate", Number(event.target.value))} /></div>
              <div><Label>Para Birimi</Label><Input value={form.default_currency ?? "TRY"} onChange={(event) => update("default_currency", event.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Teklif Prefix</Label><Input value={form.offer_prefix ?? "TEK"} onChange={(event) => update("offer_prefix", event.target.value)} /></div>
              <div><Label>Fatura Prefix</Label><Input value={form.invoice_prefix ?? "FTR"} onChange={(event) => update("invoice_prefix", event.target.value)} /></div>
            </div>
            <div><Label>Servis Kategorileri</Label><Textarea value={(form.service_categories ?? []).join(", ")} onChange={(event) => update("service_categories", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} rows={3} /></div>
            <div><Label>Masraf Kategorileri</Label><Textarea value={(form.expense_categories ?? []).join(", ")} onChange={(event) => update("expense_categories", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} rows={3} /></div>
          </div>
        </AdminSection>

        <AdminSection title="Admin Kullanıcıları" description="Supabase Auth profilleri salt okunur listelenir; rol ataması Supabase üzerinden yapılır.">
          {data.users.length ? (
            <div className="space-y-2">
              {data.users.map((user) => (
                <div key={user.user_id} className="rounded-lg border border-border bg-secondary/40 p-3">
                  <div className="font-semibold">{user.display_name || user.email || "Yönetici"}</div>
                  <div className="text-xs text-muted-foreground">{user.email || user.user_id}</div>
                </div>
              ))}
            </div>
          ) : (
            <AdminEmptyState title="Admin profili bulunamadı" description="Supabase Auth kullanıcısı ve user_roles kaydı oluşturulduğunda listelenir." icon={Users} />
          )}
        </AdminSection>
      </div>
    </div>
  );
}
