import { ArrowRight, Zap, Headset, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";

const NetworkBackdrop = () => (
  <svg
    className="absolute inset-0 h-full w-full opacity-[0.18]"
    viewBox="0 0 1200 700"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden
  >
    <defs>
      <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(var(--electric-bright))" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(var(--electric-bright))" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--electric))" stopOpacity="0.7" />
        <stop offset="100%" stopColor="hsl(var(--electric-bright))" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    {[
      [120, 140], [300, 90], [520, 180], [760, 110], [980, 220], [1100, 120],
      [200, 380], [440, 320], [680, 420], [880, 360], [1060, 460],
      [140, 580], [380, 540], [620, 600], [840, 560], [1020, 620],
    ].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="22" fill="url(#nodeGlow)" />
        <circle cx={x} cy={y} r="2.5" fill="hsl(var(--electric-bright))" />
      </g>
    ))}
    {[
      [120, 140, 300, 90], [300, 90, 520, 180], [520, 180, 760, 110], [760, 110, 980, 220],
      [200, 380, 440, 320], [440, 320, 680, 420], [680, 420, 880, 360], [880, 360, 1060, 460],
      [120, 140, 200, 380], [520, 180, 440, 320], [760, 110, 680, 420], [980, 220, 880, 360],
      [200, 380, 140, 580], [440, 320, 380, 540], [680, 420, 620, 600], [880, 360, 840, 560],
      [380, 540, 620, 600], [620, 600, 840, 560], [840, 560, 1020, 620],
    ].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#lineGrad)" strokeWidth="1" />
    ))}
  </svg>
);

export const Hero = () => {
  const { t } = useLang();
  const trust = [
    { icon: Zap, label: t.hero.trust.rapid },
    { icon: Headset, label: t.hero.trust.remote },
    { icon: Layers, label: t.hero.trust.scalable },
  ];
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-hero pt-32 pb-24 md:pt-40 md:pb-32"
    >
      <div className="absolute inset-0 bg-gradient-mesh animate-drift" aria-hidden />
      <div className="absolute inset-0 grid-pattern opacity-25" aria-hidden />
      <NetworkBackdrop />
      {/* Glow accents */}
      <div
        className="absolute -top-24 right-[-10%] h-[460px] w-[460px] rounded-full bg-electric/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute bottom-[-15%] left-[-8%] h-[420px] w-[420px] rounded-full bg-electric-bright/15 blur-[120px]"
        aria-hidden
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-bright animate-pulse-glow" />
            {t.hero.badge}
          </span>

          <h1 className="mt-7 animate-slide-up font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
            {t.hero.title1}
            <span>{t.hero.titleAccent}</span>
            .
          </h1>

          <p
            className="mx-auto mt-7 max-w-2xl animate-slide-up text-lg leading-relaxed text-white/75"
            style={{ animationDelay: "120ms" }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="mt-10 flex animate-slide-up flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "220ms" }}
          >
            <Button size="xl" variant="hero" asChild>
              <a href="#contact">
                {t.hero.ctaQuote} <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button size="xl" variant="outline-light" asChild>
              <a href="#services">{t.hero.ctaServices}</a>
            </Button>
          </div>

          <ul
            className="mx-auto mt-14 grid max-w-2xl animate-slide-up grid-cols-1 gap-3 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-6"
            style={{ animationDelay: "320ms" }}
          >
            {trust.map((t) => (
              <li key={t.label} className="flex items-center justify-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-electric-bright ring-1 ring-white/10">
                  <t.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-white/85">{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
