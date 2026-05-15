import { Linkedin, Mail, Phone, MapPin, MessageCircle, Navigation } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT } from "@/i18n/translations";

export const Footer = () => {
  const { t } = useLang();
  const serviceLinks = t.footer.servicesList.map((label) => ({ label, href: "#services" }));
  const companyLinks = [
    { label: t.footer.companyList[0], href: "#why" },
    { label: t.footer.companyList[1], href: "#cases" },
    { label: t.footer.companyList[2], href: "#why" },
    { label: t.footer.companyList[3], href: "#faq" },
    { label: t.footer.companyList[4], href: "#contact" },
  ].filter((link) => Boolean(link.label));
  const cols = [
    { title: t.footer.services, links: serviceLinks },
    { title: t.footer.company, links: companyLinks },
  ];

  return (
    <footer className="border-t border-white/5 bg-navy text-white/70">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light size="footer" className="inline-flex" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">{t.footer.desc}</p>
            <div className="mt-6 flex items-center gap-3">
              {/* TODO: Add the real Eclipse Mühendislik LinkedIn URL when available. */}
              <span
                role="img"
                aria-label="LinkedIn"
                title="LinkedIn bağlantısı yakında eklenecek"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/35"
              >
                <Linkedin className="h-4 w-4" />
              </span>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/10 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">{c.title}</h4>
              <ul className="mt-5 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">{t.footer.contact}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-white/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric-bright" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-electric-bright" />
                <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-electric-bright" />
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp · {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-electric-bright" />
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Navigation className="h-3.5 w-3.5 text-electric-bright" />
              {t.footer.directions}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {CONTACT.company}. {t.footer.rights}</p>
          {/* TODO: Restore privacy, terms and cookie links after dedicated legal pages are added. */}
        </div>
      </div>
    </footer>
  );
};
