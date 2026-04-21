import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "../Logo";

const cols = [
  {
    title: "Services",
    links: [
      "Managed IT Services",
      "IT Support & Maintenance",
      "IT Consulting",
      "Network Infrastructure",
      "Microsoft 365",
      "Azure & Cloud",
      "Cybersecurity",
      "CCTV Integration",
    ],
  },
  {
    title: "Company",
    links: ["About", "References", "Why Eclipse", "FAQ", "Contact"],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-navy-deep text-white/70">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Eclipse Mühendislik is an engineering-led IT consulting and managed services company based
              in Turkey, supporting SMEs and growing organizations with reliable, scalable technology
              operations.
            </p>
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
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 text-electric-bright" />
                <a href="mailto:hello@eclipse-muhendislik.com" className="hover:text-white">
                  hello@eclipse-muhendislik.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-electric-bright" />
                <a href="tel:+900000000000" className="hover:text-white">+90 (000) 000 00 00</a>
              </li>
              <li className="flex items-start gap-2.5 text-white/55">
                <MapPin className="mt-0.5 h-4 w-4 text-electric-bright" />
                Levent, Istanbul · Turkey
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Eclipse Mühendislik. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
