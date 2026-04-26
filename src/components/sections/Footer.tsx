import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "../Logo";
import { useLang } from "@/i18n/LanguageContext";

export const Footer = () => {
  const { t } = useLang();
  const cols = [
    { title: t.footer.services, links: t.footer.servicesList },
    { title: t.footer.company, links: t.footer.companyList },
  ];

  return (
    <footer className="border-t border-white/5 bg-navy-deep text-white/70">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">{t.footer.desc}</p>
            <a
              href="#"
              aria-label="LinkedIn"
              className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/10 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
                {c.title}
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="transition-colors hover:text-white">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
              {t.footer.contact}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-electric-bright" />
                <a href="mailto:hello@eclipse-engineering.com" className="hover:text-white">
                  hello@eclipse-engineering.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-electric-bright" />
                <a href="tel:+900000000000" className="hover:text-white">+90 (000) 000 00 00</a>
              </li>
              <li className="flex items-start gap-2.5 text-white/55">
                <MapPin className="mt-0.5 h-4 w-4 text-electric-bright" />
                {t.footer.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Eclipse Engineering. {t.footer.rights}</p>
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
