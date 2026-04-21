import { ArrowUpRight, Factory, Briefcase, Store } from "lucide-react";

const cases = [
  {
    icon: Factory,
    sector: "Manufacturing",
    company: "Anadolu Üretim A.Ş.",
    challenge:
      "Recurring network instability across the production floor and inconsistent endpoint configurations causing daily downtime.",
    services: ["Network redesign", "Endpoint standardization", "Managed support"],
    outcome: "Stable infrastructure, standardized devices and continuous IT support coverage.",
  },
  {
    icon: Briefcase,
    sector: "Professional Services",
    company: "Marmara Danışmanlık",
    challenge:
      "Microsoft 365 tenant misconfigurations, fragmented email security and endpoint management gaps across consultants.",
    services: ["M365 administration", "Identity & MFA", "Endpoint management"],
    outcome: "Secure collaboration, hardened identities and a smoother day-to-day support experience.",
  },
  {
    icon: Store,
    sector: "Retail · Multi-branch",
    company: "Ege Perakende Group",
    challenge:
      "Weak inter-branch connectivity and fragmented camera/network systems with no centralized visibility or support.",
    services: ["Branch connectivity", "CCTV integration", "Centralized support"],
    outcome: "Centralized operations, consistent uptime and unified visibility across all branches.",
  },
];

export const CaseStudies = () => {
  return (
    <section id="cases" className="bg-background py-24 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">References</span>
            <h2 className="section-title mt-4">Practical results across industries.</h2>
          </div>
          <p className="section-sub md:mt-0 md:max-w-md md:text-right">
            A look at how we stabilize, secure and operate IT environments for companies that depend on
            their infrastructure every day.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.company}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-soft text-accent">
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
                Discuss a similar engagement <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
