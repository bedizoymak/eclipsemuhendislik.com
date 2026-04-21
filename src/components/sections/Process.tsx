const steps = [
  {
    n: "01",
    title: "Analyze",
    desc: "We assess your current IT environment, business requirements, risks and operational pain points.",
  },
  {
    n: "02",
    title: "Plan",
    desc: "We design a clear, prioritized solution with timelines, dependencies and measurable outcomes.",
  },
  {
    n: "03",
    title: "Implement",
    desc: "Our engineers execute with documentation, change control and minimal disruption to your team.",
  },
  {
    n: "04",
    title: "Support",
    desc: "We operate, monitor and continuously improve your environment under a managed-service model.",
  },
];

export const Process = () => {
  return (
    <section id="process" className="relative overflow-hidden bg-gradient-hero py-24 text-white md:py-32">
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden />
      <div className="absolute inset-0 bg-gradient-mesh" aria-hidden />
      <div className="container-page relative">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-electric-bright">
            How we work
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] md:text-4xl lg:text-5xl">
            A clear, four-step engineering process.
          </h2>
          <p className="mt-4 text-white/65 md:text-lg">
            Every engagement follows the same disciplined workflow — from first conversation to
            long-term operations.
          </p>
        </div>

        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-semibold text-electric-bright">{s.n}</span>
                {i < steps.length - 1 && (
                  <span className="hidden h-px w-10 bg-gradient-to-r from-electric/60 to-transparent lg:block" />
                )}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
