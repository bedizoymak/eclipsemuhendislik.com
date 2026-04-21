import { Gauge, Wrench, Layers, Globe2, Lock, Building2 } from "lucide-react";

const reasons = [
  { icon: Gauge, title: "Fast and practical support", desc: "Quick triage, fast response, no bureaucracy. Get unblocked and stay productive." },
  { icon: Wrench, title: "Engineering-based approach", desc: "Documented designs, standards-based implementations, repeatable operations." },
  { icon: Layers, title: "Scalable solutions", desc: "Architectures that grow with your headcount, sites and workloads — without rework." },
  { icon: Globe2, title: "Remote + on-site coverage", desc: "Resolve most issues remotely, dispatch field engineers for hands-on work when needed." },
  { icon: Lock, title: "Security & continuity focused", desc: "Foundational security, backups and resilience designed into every environment we run." },
  { icon: Building2, title: "SME-friendly outsourced IT", desc: "A right-sized model for offices without a dedicated internal IT department." },
];

export const WhyChoose = () => {
  return (
    <section id="why" className="bg-background py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Why Eclipse</span>
          <h2 className="section-title mt-4">Why companies choose Eclipse Mühendislik.</h2>
          <p className="section-sub">
            A pragmatic balance of engineering rigor and field responsiveness — built for the
            realities of growing businesses.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="group bg-card p-8 transition-colors hover:bg-secondary/40">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors group-hover:bg-gradient-electric">
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
