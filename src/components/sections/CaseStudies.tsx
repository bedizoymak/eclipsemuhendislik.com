import { ArrowRight } from "lucide-react";

const cases = [
  {
    sector: "Logistics",
    company: "Northbound Lojistik",
    problem: "Frequent Wi-Fi dropouts across a 3-floor warehouse and office disrupting handheld scanners and VoIP calls.",
    solution: "Site survey, structured cabling refresh and a managed Wi-Fi mesh with VLAN segmentation for IoT and staff.",
    outcome: "Zero coverage gaps, 99.9% uptime since deployment and unified remote management of all access points.",
  },
  {
    sector: "Professional Services",
    company: "Meridian Consulting",
    problem: "Scattered email, file storage and devices after rapid headcount growth created security and access risks.",
    solution: "Microsoft 365 tenant rebuild, identity hardening with MFA, OneDrive/SharePoint migration and endpoint baseline.",
    outcome: "Centralized identity, standardized devices and a documented IT baseline supporting 4× user growth.",
  },
  {
    sector: "Manufacturing",
    company: "Atlas Üretim",
    problem: "Aging on-prem server, no offsite backups and no monitoring — a single failure could halt production planning.",
    solution: "Virtualized server stack, hybrid cloud backups, monitoring and a managed-services agreement with on-call response.",
    outcome: "Recovery objectives reduced from days to hours, with proactive alerting catching issues before users notice.",
  },
];

export const CaseStudies = () => {
  return (
    <section id="cases" className="bg-secondary/40 py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Selected work</span>
            <h2 className="section-title mt-4">Real engagements. Measurable outcomes.</h2>
          </div>
          <p className="section-sub md:mt-0 md:max-w-sm md:text-right">
            A snapshot of how we partner with growing companies to stabilize and scale their IT.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.company}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative h-32 overflow-hidden bg-gradient-hero">
                <div className="absolute inset-0 grid-pattern opacity-50" />
                <div className="absolute inset-0 bg-gradient-mesh" />
                <div className="relative flex h-full items-end justify-between p-5">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {c.sector}
                  </span>
                  <span className="font-display text-sm font-semibold text-electric-bright">Case Study</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-semibold text-foreground">{c.company}</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Challenge</dt>
                    <dd className="mt-1 text-foreground/90">{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Solution</dt>
                    <dd className="mt-1 text-foreground/90">{c.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-accent">Outcome</dt>
                    <dd className="mt-1 font-medium text-foreground">{c.outcome}</dd>
                  </div>
                </dl>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-transform group-hover:translate-x-0.5"
                >
                  Discuss a similar project <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
