import { Wrench, Gauge, Rocket, ShieldCheck, LifeBuoy, Layers } from "lucide-react";

const reasons = [
  { icon: Wrench, title: "Engineering-driven solutions", desc: "Hands-on field engineering, real environments, no theoretical overhead." },
  { icon: Layers, title: "Reliable & scalable systems", desc: "Architectures that grow with your headcount, sites and workloads — without rework." },
  { icon: Rocket, title: "Fast deployment", desc: "Tight project execution with clear milestones and minimal disruption to operations." },
  { icon: ShieldCheck, title: "Secure infrastructure", desc: "Foundational security and resilience designed into every environment we operate." },
  { icon: LifeBuoy, title: "Long-term support", desc: "Predictable, engineering-led support relationships — not ticket factories." },
  { icon: Gauge, title: "Operational continuity", desc: "Proactive monitoring and disciplined runbooks that keep your business moving." },
];

export const WhyChoose = () => {
  return (
    <section id="why" className="bg-secondary/40 py-24 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Why Eclipse</span>
          <h2 className="section-title mt-4">Built for businesses that depend on IT.</h2>
          <p className="section-sub">
            A pragmatic balance of engineering rigor and field responsiveness — built for the realities of
            growing organizations.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="reveal group bg-card p-8 transition-all duration-300 hover:bg-electric-soft/40"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-300 group-hover:bg-gradient-electric group-hover:shadow-glow">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
