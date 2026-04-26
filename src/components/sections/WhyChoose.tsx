import { Wrench, Gauge, Rocket, ShieldCheck, LifeBuoy, Layers } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const icons = [Wrench, Layers, Rocket, ShieldCheck, LifeBuoy, Gauge];

export const WhyChoose = () => {
  const { t } = useLang();
  const reasons = t.why.items.map((r, i) => ({ ...r, icon: icons[i] }));

  return (
    <section id="why" className="bg-secondary/40 py-24 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">{t.why.eyebrow}</span>
          <h2 className="section-title mt-4">{t.why.title}</h2>
          <p className="section-sub">{t.why.sub}</p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="reveal group bg-card p-8 transition-all duration-300 hover:bg-electric-soft/40"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-300 group-hover:bg-gradient-electric group-hover:shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
