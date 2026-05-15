import { Linkedin, Mail, Phone, MapPin, MessageCircle, Navigation } from "lucide-react";
import logoDark from "@/assets/logo-dark-bg.png";
import { useLang } from "@/i18n/LanguageContext";
import { usePublicSettings } from "@/hooks/useEclipseData";
import { getWhatsappUrl } from "@/lib/eclipseContent";

export const Footer = () => {
  const { t } = useLang();
  const { settings } = usePublicSettings();
  const whatsappUrl = getWhatsappUrl(settings.whatsapp);
  const cols = [
    { title: t.footer.services, links: t.footer.servicesList },
    { title: t.footer.company, links: t.footer.companyList },
  ];

  return (
    <footer className="border-t border-white/5 bg-navy text-white/70">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <a href="#top" aria-label="Eclipse Mühendislik" className="inline-block">
              <img src={logoDark} alt="Eclipse Mühendislik" className="h-auto w-[180px] select-none lg:w-[200px]" draggable={false} />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">{settings.footer_description || t.footer.desc}</p>
            <div className="mt-6 flex items-center gap-3">
              {settings.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              <a
                href={whatsappUrl}
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
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-white">
                      {l}
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
                <span>{settings.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-electric-bright" />
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-electric-bright" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp · {settings.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-electric-bright" />
                <a href={`mailto:${settings.email}`} className="break-all hover:text-white">
                  {settings.email}
                </a>
              </li>
            </ul>
            <a
              href={settings.map_url || "#"}
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
          <p>© {new Date().getFullYear()} {settings.company_name}. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white">{t.footer.terms}</a>
            <a href="#" className="hover:text-white">{t.footer.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
