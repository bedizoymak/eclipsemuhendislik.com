import { ArrowUpRight, Building2, Factory, Video, Lock } from "lucide-react";

const cases = [
  {
    icon: Building2,
    sector: "Corporate Office",
    company: "Office Network Setup",
    challenge:
      "Multi-floor office with unstable Wi-Fi, ad-hoc switching and no segmentation between guest and corporate traffic.",
    services: ["Structured cabling", "Switching & VLANs", "Enterprise Wi-Fi"],
    outcome: "Stable, segmented network with consistent coverage across every floor and meeting room.",
  },
  {
    icon: Factory,
    sector: "Manufacturing",
    company: "Factory IT Infrastructure",
    challenge:
      "Production floor downtime caused by aging network hardware and inconsistent endpoint configurations.",
    services: ["Network redesign", "Endpoint standardization", "Managed support"],
    outcome: "Stable infrastructure, standardized devices and continuous IT support coverage.",
  },
  {
    icon: Video,
    sector: "Retail · Multi-site",
    company: "CCTV & Surveillance Systems",
    challenge:
      "Fragmented camera systems across branches with no centralized recording or remote visibility.",
    services: ["IP camera rollout", "NVR centralization", "Remote viewing"],
    outcome: "Unified surveillance with centralized recording and secure remote access.",
  },
  {
    icon: Lock,
    sector: "Professional Services",
    company: "Remote Access & VPN",
    challenge:
      "Distributed consultants needed secure access to internal systems without compromising identity controls.",
    services: ["Firewall VPN", "MFA & identity", "Endpoint hardening"],
    outcome: "Secure, audited remote access with zero impact on user productivity.",
  },
];

export const CaseStudies = () => {
  return (
    <section id="cases" className="bg-background py-24 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Projects</span>
            <h2 className="section-title mt-4">Real engineering, real environments.</h2>
          </div>
          <p className="section-sub md:mt-0 md:max-w-md md:text-right">
            A look at how we stabilize, secure and operate IT environments for companies that depend on
            their infrastructure every day.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cases.map((c, i) => (
            <article
              key={c.company}
              className="reveal group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft card-hover lg:p-8"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-soft text-accent transition-all group-hover:bg-gradient-electric group-hover:text-white group-hover:shadow-glow">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {c.sector}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{c.company}</h3>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Challenge</p>
                  <p className="mt-1.5 text-muted-foreground">{c.challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Services</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.services.map((s) => (
                      <span key={s} className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border-l-2 border-accent bg-electric-soft/40 px-3 py-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">Outcome</p>
                  <p className="mt-1 text-foreground">{c.outcome}</p>
                </div>
              </div>

              <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Discuss a similar project <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
