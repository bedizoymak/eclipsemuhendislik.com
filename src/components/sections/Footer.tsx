import { Linkedin, Twitter, Github } from "lucide-react";
import { Logo } from "../Logo";

const cols = [
  {
    title: "Services",
    links: [
      "Managed IT Services",
      "IT Support & Maintenance",
      "Network & Infrastructure",
      "Microsoft 365",
      "Cloud & Server",
      "Cybersecurity",
    ],
  },
  {
    title: "Company",
    links: ["About", "Process", "Case Studies", "FAQ", "Contact"],
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
              Eclipse Mühendislik is an engineering-led IT consulting and managed services company
              based in Turkey, supporting SMEs and growing organizations with reliable, scalable
              technology operations.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
                {c.title}
              </h4>
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
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>hello@eclipse-muhendislik.com</li>
              <li>+90 (000) 000 00 00</li>
              <li className="text-white/55">Istanbul, Turkey</li>
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
