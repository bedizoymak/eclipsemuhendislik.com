import { ArrowRight, Zap, Headset, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dashboard.jpg";

const trust = [
  { icon: Zap, label: "Fast Response" },
  { icon: Headset, label: "Remote & On-site Support" },
  { icon: Layers, label: "Scalable IT Solutions" },
];

export const Hero = () => {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-gradient-hero pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 bg-gradient-mesh" aria-hidden />
      <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-bright animate-pulse-glow" />
              Engineering-led Managed IT
            </span>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Reliable IT Operations for{" "}
              <span className="bg-gradient-to-r from-electric-bright to-white bg-clip-text text-transparent">
                Growing Businesses
              </span>{" "}
              in Turkey.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Eclipse Mühendislik helps SMEs and growing companies design, secure, support and modernize
              their IT infrastructure with practical field expertise, responsive service and long-term
              operational discipline.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="xl" variant="hero" asChild>
                <a href="#contact">
                  Get a Quote <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button size="xl" variant="outline-light" asChild>
                <a href="#services">Explore Services</a>
              </Button>
            </div>

            <ul className="mt-12 grid max-w-xl grid-cols-1 gap-3 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-6">
              {trust.map((t) => (
                <li key={t.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-electric-bright ring-1 ring-white/10">
                    <t.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-white/85">{t.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-electric opacity-20 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-elevated">
              <img
                src={heroImage}
                alt="IT operations dashboard showing network topology, server health and security monitoring for managed IT services"
                width={1280}
                height={1024}
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/95 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl border border-white/10 bg-navy/70 px-4 py-3 backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" />
                <p className="text-xs font-medium text-white/85">
                  Network · Cloud · Endpoint <span className="text-white/45">— continuously monitored</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
