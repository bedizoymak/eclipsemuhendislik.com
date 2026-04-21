import { Cpu, Cloud, Network, Laptop, ShieldCheck, Mail } from "lucide-react";

const ecosystem = [
  { icon: Mail, label: "Microsoft 365" },
  { icon: Cloud, label: "Azure" },
  { icon: Network, label: "Network Infrastructure" },
  { icon: Laptop, label: "Endpoint Management" },
  { icon: ShieldCheck, label: "Security Operations" },
  { icon: Cpu, label: "Server & Virtualization" },
];

export const Credibility = () => {
  return (
    <section className="bg-background py-24 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="eyebrow">Credibility</span>
            <h2 className="section-title mt-4">
              Technology-focused, vendor-aware, solution-driven.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We help businesses make practical technology decisions across infrastructure, cloud
              platforms, user support, endpoint operations and secure connectivity — without bias toward
              any single vendor.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">10+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Service domains</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">SME</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Right-sized model</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">TR</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Nationwide support</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {ecosystem.map((e) => (
              <div
                key={e.label}
                className="flex flex-col items-start gap-3 bg-card p-6 transition-colors hover:bg-secondary/40"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-electric-soft text-accent">
                  <e.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-foreground">{e.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
