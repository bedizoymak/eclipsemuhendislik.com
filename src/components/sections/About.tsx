import { CheckCircle2 } from "lucide-react";

const points = [
  "Clear communication and pragmatic execution",
  "Field-tested engineering across network, server and endpoint",
  "Scalable IT solutions designed around your operations",
];

export const About = () => {
  return (
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <span className="eyebrow">About Eclipse</span>
            <h2 className="section-title mt-4">
              Engineering discipline meets practical IT operations.
            </h2>
            <p className="section-sub">
              Eclipse Mühendislik was built on a simple idea: businesses deserve an IT partner that
              moves quickly, communicates clearly and treats infrastructure like a long-term
              engineering responsibility — not a ticket queue.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-2xl">
              From network design and Microsoft 365 to endpoint deployment and on-site support,
              we operate as your outsourced IT team — combining hands-on field experience with
              structured, documented delivery.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-gradient-card p-8 shadow-card md:p-10">
              <h3 className="font-display text-xl font-semibold text-foreground">
                A technology partner, not a vendor.
              </h3>
              <p className="mt-3 text-muted-foreground">
                We take ownership of outcomes. Whether it's a one-off project or ongoing managed
                service, you get the same engineering rigor, response speed and operational clarity.
              </p>
              <ul className="mt-6 space-y-4">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-foreground">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div>
                  <div className="font-display text-2xl font-semibold text-foreground">SME-first</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Right-sized model</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold text-foreground">Hands-on</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Remote + on-site</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
