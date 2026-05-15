import {
  ArrowUpRight,
  Server,
  LifeBuoy,
  Lightbulb,
  Cloud,
  ShieldCheck,
  Network,
  Mail,
  Video,
  Cpu,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { usePublicServices } from "@/hooks/useEclipseData";

const icons = [Network, ShieldCheck, Cloud, LifeBuoy, Video, Cpu, Mail, Lightbulb];

export const Services = () => {
  const { t } = useLang();
  const { services: dynamicServices } = usePublicServices();
  const featured = t.services.featured;
  const services = dynamicServices.slice(0, 8).map((s, i) => ({ title: s.title, desc: s.short_description, icon: icons[i % icons.length] }));

  return (
    <section id="services" className="relative bg-secondary/40 py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">{t.services.eyebrow}</span>
            <h2 className="section-title mt-4">{t.services.title}</h2>
          </div>
          <p className="section-sub md:mt-0 md:max-w-md md:text-right">{t.services.sub}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <article className="group relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-white shadow-elevated lg:row-span-2 lg:p-10">
            <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-electric/30 blur-3xl" aria-hidden />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-electric-bright backdrop-blur">
                {t.services.featuredTag}
              </span>
              <div className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <Server className="h-6 w-6 text-electric-bright" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold lg:text-3xl">{featured.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/75">{featured.desc}</p>

              <ul className="mt-6 space-y-2.5">
                {featured.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-white/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric-bright" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-navy-deep transition-transform hover:-translate-y-0.5"
                >
                  {featured.cta} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="reveal group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft card-hover"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-soft text-accent transition-all duration-300 group-hover:bg-gradient-electric group-hover:text-white group-hover:shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-transform group-hover:translate-x-0.5"
                >
                  {t.services.learnMore} <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
