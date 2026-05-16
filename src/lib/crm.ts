export type {
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
  UserRoleRow,
} from "@/integrations/supabase/types";

export type CrmCell =
  | string
  | number
  | boolean
  | string[]
  | null
  | undefined;

export type DbRow = {
  id?: string;
  title?: string;
  customer_name?: string;
  contact_person?: string | null;
  customer_id?: string | null;
  project_id?: string | null;
  lead_id?: string | null;
  offer_id?: string | null;
  invoice_id?: string | null;
  account_record_id?: string | null;
  ticket_id?: string | null;
  customer_type?: string;
  category?: string | null;
  sector?: string | null;
  tax_office?: string | null;
  tax_number?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  address?: string | null;
  notes?: string | null;
  status?: string;
  source?: string;
  tags?: string[] | null;
  last_contact_date?: string | null;
  amount?: number | string | null;
  vat?: number | string | null;
  total?: number | string | null;
  has_receipt?: boolean;
  is_official?: boolean;
  [key: string]: CrmCell;
};

export const CUSTOMER_TYPES = [
  { value: "company", label: "Firma" },
  { value: "individual", label: "Bireysel" },
];

export const CUSTOMER_STATUSES = [
  { value: "active", label: "Aktif" },
  { value: "passive", label: "Pasif" },
  { value: "prospect", label: "Potansiyel" },
  { value: "blacklisted", label: "Kara Liste" },
];

export const SOURCES = [
  { value: "referral", label: "Referans" },
  { value: "website", label: "Web sitesi" },
  { value: "phone", label: "Telefon" },
  { value: "social", label: "Sosyal medya" },
  { value: "existing_network", label: "Mevcut çevre" },
  { value: "other", label: "Diğer" },
];

export const LEAD_STAGES = [
  { value: "new", label: "Yeni" },
  { value: "contacted", label: "İletişim Kuruldu" },
  { value: "meeting_scheduled", label: "Toplantı Planlandı" },
  { value: "proposal_sent", label: "Teklif Gönderildi" },
  { value: "negotiation", label: "Pazarlık" },
  { value: "won", label: "Kazanıldı" },
  { value: "lost", label: "Kaybedildi" },
];

export const PROJECT_STATUSES = [
  { value: "planning", label: "Planlama" },
  { value: "active", label: "Aktif" },
  { value: "waiting_customer", label: "Müşteri Bekleniyor" },
  { value: "waiting_supplier", label: "Tedarikçi Bekleniyor" },
  { value: "completed", label: "Tamamlandı" },
  { value: "cancelled", label: "İptal" },
];

export const PRIORITIES = [
  { value: "low", label: "Düşük" },
  { value: "medium", label: "Orta" },
  { value: "high", label: "Yüksek" },
  { value: "urgent", label: "Acil" },
];

export const TASK_STATUSES = [
  { value: "todo", label: "Yapılacak" },
  { value: "in_progress", label: "Devam Ediyor" },
  { value: "blocked", label: "Bloke" },
  { value: "done", label: "Tamamlandı" },
  { value: "cancelled", label: "İptal" },
];

export const OFFER_STATUSES = [
  { value: "draft", label: "Taslak" },
  { value: "sent", label: "Gönderildi" },
  { value: "accepted", label: "Kabul Edildi" },
  { value: "rejected", label: "Reddedildi" },
  { value: "expired", label: "Süresi Doldu" },
];

export const INVOICE_STATUSES = [
  { value: "draft", label: "Taslak" },
  { value: "issued", label: "Kesildi" },
  { value: "paid", label: "Ödendi" },
  { value: "overdue", label: "Gecikti" },
  { value: "cancelled", label: "İptal" },
];

export const ACCOUNT_TYPES = [
  { value: "receivable", label: "Alacak" },
  { value: "payable", label: "Borç" },
  { value: "advance", label: "Avans" },
  { value: "cash_in", label: "Nakit Giriş" },
  { value: "cash_out", label: "Nakit Çıkış" },
];

export const ACCOUNT_STATUSES = [
  { value: "open", label: "Açık" },
  { value: "partially_paid", label: "Kısmi Ödendi" },
  { value: "closed", label: "Kapalı" },
  { value: "cancelled", label: "İptal" },
];

export const PAYMENT_METHODS = [
  { value: "cash", label: "Nakit" },
  { value: "bank_transfer", label: "Havale / EFT" },
  { value: "credit_card", label: "Kredi Kartı" },
  { value: "other", label: "Diğer" },
];

export const EXPENSE_CATEGORIES = [
  { value: "software_subscription", label: "Yazılım aboneliği" },
  { value: "hosting_domain", label: "Hosting / domain" },
  { value: "hardware_purchase", label: "Donanım alımı" },
  { value: "subcontractor", label: "Taşeron" },
  { value: "transport", label: "Ulaşım" },
  { value: "food", label: "Yemek" },
  { value: "office", label: "Ofis" },
  { value: "tax", label: "Vergi" },
  { value: "salary", label: "Maaş" },
  { value: "internet_phone", label: "İnternet / telefon" },
  { value: "other", label: "Diğer" },
];

export const TICKET_CHANNELS = [
  { value: "phone", label: "Telefon" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-posta" },
  { value: "website", label: "Web sitesi" },
  { value: "onsite", label: "Yerinde" },
];

export const TICKET_CATEGORIES = [
  { value: "network", label: "Network" },
  { value: "server", label: "Sunucu" },
  { value: "software", label: "Yazılım" },
  { value: "hardware", label: "Donanım" },
  { value: "security", label: "Güvenlik" },
  { value: "backup", label: "Yedekleme" },
  { value: "website", label: "Web sitesi" },
  { value: "other", label: "Diğer" },
];

export const TICKET_STATUSES = [
  { value: "open", label: "Açık" },
  { value: "in_progress", label: "Devam Ediyor" },
  { value: "waiting_customer", label: "Müşteri Bekleniyor" },
  { value: "resolved", label: "Çözüldü" },
  { value: "closed", label: "Kapalı" },
];

export const PRICING_TYPES = [
  { value: "fixed", label: "Sabit" },
  { value: "monthly", label: "Aylık" },
  { value: "hourly", label: "Saatlik" },
  { value: "custom", label: "Özel" },
];

export function labelOf(options: { value: string; label: string }[], value?: string | null) {
  return options.find((item) => item.value === value)?.label ?? value ?? "-";
}

export function formatTRY(value: number | string | null | undefined) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 2,
  }).format(Number(value ?? 0));
}

export function formatNumber(value: number | string | null | undefined) {
  return Number(value ?? 0).toLocaleString("tr-TR");
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("tr-TR");
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function monthKey(value: string | Date | null | undefined) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 7);
}

export function daysUntil(value: string | null | undefined) {
  if (!value) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(value);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function sumBy<T extends DbRow>(rows: T[], key: keyof T) {
  return rows.reduce((sum, item) => sum + Number(item[key] ?? 0), 0);
}

export function customerName(
  customer?: Pick<DbRow, "customer_name" | "contact_person"> | null,
) {
  return customer?.customer_name || customer?.contact_person || "Müşteri seçilmedi";
}

export function tagsToArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function arrayToTags(value?: string[] | null) {
  return (value ?? []).join(", ");
}

export function statusBadgeClass(value?: string | null) {
  switch (value) {
    case "active":
    case "won":
    case "accepted":
    case "paid":
    case "closed":
    case "completed":
    case "done":
    case "resolved":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "overdue":
    case "urgent":
    case "blocked":
    case "blacklisted":
    case "lost":
      return "border-red-200 bg-red-50 text-red-700";
    case "proposal_sent":
    case "negotiation":
    case "waiting_customer":
    case "waiting_supplier":
    case "partially_paid":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "cancelled":
    case "passive":
    case "rejected":
      return "border-zinc-200 bg-zinc-50 text-zinc-600";
    default:
      return "border-border bg-secondary text-foreground";
  }
}

export function exportCSV(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (value: unknown) => {
    const text = value == null ? "" : String(value);
    return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const csv = [
    headers.join(";"),
    ...rows.map((row) => headers.map((header) => escape(row[header])).join(";")),
  ].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function offerItemTotal(item: {
  quantity: number | string;
  unit_price: number | string;
  vat_rate: number | string;
  discount: number | string;
}) {
  const quantity = Number(item.quantity || 0);
  const unit = Number(item.unit_price || 0);
  const discount = Number(item.discount || 0);
  const vatRate = Number(item.vat_rate || 0);
  const net = Math.max(0, quantity * unit - discount);
  const vat = net * (vatRate / 100);
  return { net, vat, total: net + vat };
}
