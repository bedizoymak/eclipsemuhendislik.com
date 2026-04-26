import { Search, PenTool, Wrench, LifeBuoy } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const icons = [Search, PenTool, Wrench, LifeBuoy];

export const Process = () => {
  const { t } = useLang();
  const steps = t.process.steps.map((s, i) => ({
    ...s,
    icon: icons[i],
    n: String(i + 1).padStart(2, "0"),
  }));

  return (
    <section id="process" className="bg-gradient-section py-24 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.process.eyebrow}</span>
          <h2 className="section-title mt-4">{t.process.title}</h2>
          <p className="section-sub mx-auto">{t.process.sub}</p>
        </div>

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
            aria-hidden
          />
          <ol className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.n}
                  className="reveal relative flex flex-col items-start"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-electric text-white shadow-glow">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="font-display text-xs font-bold tracking-[0.22em] text-accent">
                      {t.process.stepLabel} {s.n}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
