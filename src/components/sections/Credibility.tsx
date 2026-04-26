import { Cpu, Cloud, Network, Laptop, ShieldCheck, Mail } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const icons = [Mail, Cloud, Network, Laptop, ShieldCheck, Cpu];

export const Credibility = () => {
  const { t } = useLang();
  const ecosystem = t.credibility.items.map((label, i) => ({ label, icon: icons[i] }));

  return (
    <section className="bg-background py-24 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="eyebrow">{t.credibility.eyebrow}</span>
            <h2 className="section-title mt-4">{t.credibility.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.credibility.desc}</p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {t.credibility.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-semibold text-foreground">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {ecosystem.map((e) => {
              const Icon = e.icon;
              return (
                <div
                  key={e.label}
                  className="flex flex-col items-start gap-3 bg-card p-6 transition-colors hover:bg-secondary/40"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-electric-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{e.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
