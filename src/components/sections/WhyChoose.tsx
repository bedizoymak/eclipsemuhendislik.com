import { Wrench, MessageSquare, Globe2, Building2, Layers, ShieldCheck } from "lucide-react";

const reasons = [
  { icon: Wrench, title: "Practical field engineering mindset", desc: "Hands-on problem solving, real environments, no theoretical overhead." },
  { icon: MessageSquare, title: "Fast and clear communication", desc: "Direct technical contact, transparent updates, no bureaucratic friction." },
  { icon: Globe2, title: "Remote + on-site support capability", desc: "Resolve most issues remotely, dispatch engineers when hands-on work is needed." },
  { icon: Building2, title: "SME-friendly outsourced IT model", desc: "A right-sized engagement for offices without a dedicated internal IT team." },
  { icon: Layers, title: "Scalable and maintainable infrastructure", desc: "Architectures that grow with your headcount, sites and workloads — without rework." },
  { icon: ShieldCheck, title: "Continuity, security and usability", desc: "Foundational security and resilience designed into every environment we operate." },
];

export const WhyChoose = () => {
  return (
    <section id="why" className="bg-secondary/40 py-24 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Why Eclipse</span>
          <h2 className="section-title mt-4">Why Eclipse Mühendislik?</h2>
          <p className="section-sub">
            A pragmatic balance of engineering rigor and field responsiveness — built for the realities of
            growing businesses.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="group bg-card p-8 transition-colors hover:bg-electric-soft/40">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors group-hover:bg-gradient-electric">
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
