import {
  ArrowUpRight,
  Server,
  LifeBuoy,
  Lightbulb,
  Cloud,
  ShieldCheck,
  Network,
  Mail,
  Video,
  Cpu,
} from "lucide-react";

const featured = {
  icon: Server,
  title: "Managed IT Services",
  desc: "Continuous monitoring, support and infrastructure ownership for businesses that need a dependable, engineering-led IT partner.",
  bullets: [
    "Proactive monitoring & maintenance",
    "Single accountable engineering team",
    "Documented standards & runbooks",
    "Predictable monthly engagement",
  ],
};

const services = [
  { icon: Network, title: "Network Infrastructure", desc: "Switching, firewalls, structured cabling and Wi-Fi engineered for performance and uptime." },
  { icon: ShieldCheck, title: "Cybersecurity", desc: "Endpoint protection, MFA, firewalls, backups and policy hardening built into every environment." },
  { icon: Cloud, title: "Cloud & Server", desc: "Virtualization, hybrid cloud and Windows Server architectures designed for resilience and scale." },
  { icon: LifeBuoy, title: "IT Support", desc: "Responsive helpdesk and preventive maintenance that keeps users productive and downtime minimal." },
  { icon: Video, title: "CCTV Systems", desc: "IP camera systems, NVR setup and remote viewing integrated with your network infrastructure." },
  { icon: Cpu, title: "Automation", desc: "Operational automation across endpoints, monitoring and routine IT tasks — fewer errors, faster delivery." },
  { icon: Mail, title: "Microsoft 365", desc: "Tenant configuration, identity, email, Teams, SharePoint and ongoing M365 governance." },
  { icon: Lightbulb, title: "IT Consulting", desc: "Independent advisory on architecture, vendor selection, modernization and IT roadmaps." },
];

export const Services = () => {
  return (
    <section id="services" className="relative bg-secondary/40 py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Services</span>
            <h2 className="section-title mt-4">A complete IT portfolio, one accountable partner.</h2>
          </div>
          <p className="section-sub md:mt-0 md:max-w-md md:text-right">
            From day-to-day support to infrastructure engineering — coordinated under a single,
            engineering-led operation.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <article className="group relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white shadow-elevated lg:row-span-2 lg:p-10">
            <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-electric/30 blur-3xl" aria-hidden />
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

          {services.map((s, i) => (
            <article
              key={s.title}
              className="reveal group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft card-hover"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-soft text-accent transition-all duration-300 group-hover:bg-gradient-electric group-hover:text-white group-hover:shadow-glow">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-transform group-hover:translate-x-0.5"
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
