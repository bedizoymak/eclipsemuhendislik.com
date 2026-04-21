import {
  ArrowUpRight,
  Server,
  LifeBuoy,
  Lightbulb,
  Network,
  Cloud,
  ShieldCheck,
  Video,
  Laptop,
  Headset,
  Mail,
} from "lucide-react";

const services = [
  {
    icon: Server,
    title: "Managed IT Services",
    desc: "End-to-end ownership of your IT environment with monitoring, maintenance and proactive operations.",
  },
  {
    icon: LifeBuoy,
    title: "IT Support & Maintenance",
    desc: "Responsive helpdesk and preventive maintenance that keeps users productive and downtime minimal.",
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    desc: "Independent advisory on architecture, vendor selection, modernization and IT roadmaps for SMEs.",
  },
  {
    icon: Network,
    title: "Network Design & Infrastructure",
    desc: "Structured cabling, switching, firewalls and Wi-Fi coverage engineered for performance and reliability.",
  },
  {
    icon: Mail,
    title: "Microsoft 365 Setup & Administration",
    desc: "Tenant configuration, identity, email, Teams, SharePoint and ongoing M365 governance.",
  },
  {
    icon: Cloud,
    title: "Cloud & Server Solutions",
    desc: "Virtualization, hybrid cloud and Windows Server environments designed for resilience and scale.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity & Protection",
    desc: "Foundational security: firewalls, endpoint protection, backups, MFA and policy hardening.",
  },
  {
    icon: Video,
    title: "CCTV / Surveillance Integration",
    desc: "IP camera systems, NVR setup and remote viewing integrated with your network infrastructure.",
  },
  {
    icon: Laptop,
    title: "Endpoint & Device Deployment",
    desc: "Standardized device imaging, configuration and deployment for new hires and office rollouts.",
  },
  {
    icon: Headset,
    title: "Remote & On-site Support",
    desc: "Fast remote troubleshooting backed by a field-engineering team available for on-site interventions.",
  },
];

export const Services = () => {
  return (
    <section id="services" className="relative bg-secondary/40 py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Services</span>
            <h2 className="section-title mt-4">
              Full-stack IT services, delivered with engineering precision.
            </h2>
          </div>
          <p className="section-sub md:mt-0 md:max-w-md md:text-right">
            From day-to-day support to infrastructure projects — one accountable partner across
            your entire IT environment.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-soft text-accent transition-colors group-hover:bg-gradient-electric group-hover:text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100"
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
