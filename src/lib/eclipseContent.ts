import type { ContactMessageRow, ProjectRow, ServiceRow, SiteSettingsRow } from "@/integrations/supabase/types";
import { CONTACT, translations } from "@/i18n/translations";

const now = new Date().toISOString();

export const defaultServices: ServiceRow[] = translations.tr.services.items.map((item, index) => ({
  id: `fallback-service-${index + 1}`,
  title: item.title,
  short_description: item.desc,
  detail_description: item.desc,
  icon_name: null,
  image_url: null,
  sort_order: index + 1,
  status: "published",
  created_at: now,
  updated_at: now,
}));

export const defaultProjects: ProjectRow[] = translations.tr.cases.items.map((item, index) => ({
  id: `fallback-project-${index + 1}`,
  title: item.company,
  category: item.sector,
  location: "İstanbul",
  project_year: "2026",
  short_description: item.challenge,
  detail_description: `${item.challenge}\n\nSonuç: ${item.outcome}`,
  cover_image_url: null,
  gallery_images: null,
  sort_order: index + 1,
  status: "published",
  created_at: now,
  updated_at: now,
}));

export const defaultSettings: SiteSettingsRow = {
  id: "fallback-settings",
  company_name: CONTACT.company,
  phone: CONTACT.phone,
  whatsapp: CONTACT.phone,
  email: CONTACT.email,
  address: CONTACT.address,
  map_url: CONTACT.mapsUrl,
  map_embed_url: CONTACT.mapsEmbed,
  linkedin_url: null,
  instagram_url: null,
  seo_title: "Eclipse Mühendislik | BT Danışmanlığı ve Yönetilen BT Hizmetleri",
  seo_description:
    "Eclipse Mühendislik; ağ altyapısı, siber güvenlik, bulut, Microsoft 365 ve yönetilen BT hizmetleriyle işletmelere güvenilir teknoloji operasyonları sunar.",
  footer_description: translations.tr.footer.desc,
  updated_at: now,
};

export const defaultMessages: ContactMessageRow[] = [];

export function normalizeWhatsapp(value: string) {
  return value.replace(/\D/g, "");
}

export function getWhatsappUrl(value: string) {
  return `https://wa.me/${normalizeWhatsapp(value)}`;
}
