import {
  ArrowUpRight,
  Server,
  LifeBuoy,
  Lightbulb,
  Cloud,
  ShieldCheck,
  Network,
  Mail,
  CloudCog,
  Video,
} from "lucide-react";

const featured = {
  icon: Server,
  title: "Managed IT Services",
  desc: "Ongoing monitoring, support, operational continuity and infrastructure ownership for companies that need a dependable outsourced IT partner.",
  bullets: [
    "24/7 monitoring & proactive maintenance",
    "Single accountable point of contact",
    "Documented standards & runbooks",
    "Predictable monthly engagement",
  ],
};

const services = [
  { icon: LifeBuoy, title: "IT Support & Maintenance", desc: "Responsive helpdesk and preventive maintenance that keeps users productive and downtime minimal." },
  { icon: Lightbulb, title: "IT Consulting", desc: "Independent advisory on architecture, vendor selection, modernization and IT roadmaps." },
  { icon: Cloud, title: "Cloud & Server Solutions", desc: "Virtualization, hybrid cloud and Windows Server environments designed for resilience and scale." },
  { icon: ShieldCheck, title: "Cybersecurity", desc: "Foundational security: firewalls, endpoint protection, backups, MFA and policy hardening." },
  { icon: Network, title: "Network Infrastructure", desc: "Structured cabling, switching, firewalls and Wi-Fi coverage engineered for performance." },
  { icon: Mail, title: "Microsoft 365 Setup & Administration", desc: "Tenant configuration, identity, email, Teams, SharePoint and ongoing M365 governance." },
  { icon: CloudCog, title: "Azure & Cloud Management", desc: "Workload deployment, identity, cost governance and operations across Azure environments." },
  { icon: Video, title: "CCTV / Surveillance Integration", desc: "IP camera systems, NVR setup and remote viewing integrated with your network infrastructure." },
];

export const Services = () => {
  return (
    <section id="services" className="relative bg-secondary/40 py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Services</span>
            <h2 className="section-title mt-4">A full IT service portfolio, one accountable partner.</h2>
          </div>
          <p className="section-sub md:mt-0 md:max-w-md md:text-right">
            From day-to-day support to infrastructure projects — coordinated under engineering-led
            operations.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Featured */}
          <article className="group relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white shadow-elevated lg:row-span-2 lg:p-10">
            <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-electric-bright backdrop-blur">
                Featured
              </span>
              <div className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <featured.icon className="h-6 w-6 text-electric-bright" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold lg:text-3xl">{featured.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/75">{featured.desc}</p>

              <ul className="mt-6 space-y-2.5">
                {featured.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-white/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-bright" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-navy-deep transition-transform hover:-translate-y-0.5"
                >
                  Discuss managed IT <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {/* Service grid */}
          {services.map((s) => (
            <article
              key={s.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-soft text-accent transition-colors group-hover:bg-gradient-electric group-hover:text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent"
              >
                Learn more <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
