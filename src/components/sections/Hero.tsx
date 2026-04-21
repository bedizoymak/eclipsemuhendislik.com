import { ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-network.jpg";

const stats = [
  { icon: Clock, value: "24/7", label: "Support Availability" },
  { icon: Zap, value: "Fast", label: "Response Times" },
  { icon: ShieldCheck, value: "Reliable", label: "IT Operations" },
];

export const Hero = () => {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-gradient-hero pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 bg-gradient-mesh" aria-hidden />
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-bright animate-pulse-glow" />
              Engineering-led Managed IT
            </span>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Engineering Reliable{" "}
              <span className="bg-gradient-to-r from-electric-bright to-white bg-clip-text text-transparent">
                IT Operations
              </span>{" "}
              for Modern Businesses.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Eclipse Mühendislik partners with SMEs and growing companies across Turkey to design,
              secure and operate IT infrastructure that simply works — with the responsiveness of a
              field engineering team and the discipline of a long-term technology partner.
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

            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1.5">
                  <s.icon className="h-5 w-5 text-electric-bright" />
                  <dt className="font-display text-2xl font-semibold text-white">{s.value}</dt>
                  <dd className="text-xs uppercase tracking-wider text-white/55">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-electric opacity-20 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-elevated">
              <img
                src={heroImage}
                alt="Abstract network topology with cloud and security nodes representing managed IT infrastructure"
                width={1536}
                height={1152}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl border border-white/10 bg-navy/70 px-4 py-3 backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" />
                <p className="text-xs font-medium text-white/80">
                  Network · Cloud · Endpoint <span className="text-white/40">— monitored 24/7</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
