import { Search, PenTool, Wrench, LifeBuoy } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Analysis",
    desc: "We audit your current environment, map dependencies and identify operational risks before recommending anything.",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Design",
    desc: "Architecture, vendor selection and a clear engineering plan — sized to your team, sites and growth horizon.",
  },
  {
    n: "03",
    icon: Wrench,
    title: "Implementation",
    desc: "Field-engineered deployment of network, cloud, security and endpoint systems with documented standards.",
  },
  {
    n: "04",
    icon: LifeBuoy,
    title: "Support",
    desc: "Ongoing monitoring, proactive maintenance and responsive support — keeping the environment stable long-term.",
  },
];

export const Process = () => {
  return (
    <section id="process" className="bg-gradient-section py-24 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title mt-4">A clear engineering workflow.</h2>
          <p className="section-sub mx-auto">
            Every engagement follows the same disciplined four-step process — from honest assessment to
            long-term operational ownership.
          </p>
        </div>

        <div className="relative mt-16">
          {/* connector line */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
            aria-hidden
          />
          <ol className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.n}
                className="reveal relative flex flex-col items-start"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-electric text-white shadow-glow">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-xs font-bold tracking-[0.22em] text-accent">
                    STEP {s.n}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
