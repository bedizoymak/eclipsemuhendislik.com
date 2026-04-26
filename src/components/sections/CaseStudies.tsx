import { ArrowUpRight, Building2, Factory, Video, Lock } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const icons = [Building2, Factory, Video, Lock];

export const CaseStudies = () => {
  const { t } = useLang();
  const cases = t.cases.items.map((c, i) => ({ ...c, icon: icons[i] }));

  return (
    <section id="cases" className="bg-background py-24 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">{t.cases.eyebrow}</span>
            <h2 className="section-title mt-4">{t.cases.title}</h2>
          </div>
          <p className="section-sub md:mt-0 md:max-w-md md:text-right">{t.cases.sub}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <article
                key={c.company}
                className="reveal group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft card-hover lg:p-8"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-soft text-accent transition-all group-hover:bg-gradient-electric group-hover:text-white group-hover:shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {c.sector}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{c.company}</h3>

                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{t.cases.challenge}</p>
                    <p className="mt-1.5 text-muted-foreground">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">{t.cases.services}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.services.map((s) => (
                        <span key={s} className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border-l-2 border-accent bg-electric-soft/40 px-3 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">{t.cases.outcome}</p>
                    <p className="mt-1 text-foreground">{c.outcome}</p>
                  </div>
                </div>

                <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  {t.cases.cta} <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
