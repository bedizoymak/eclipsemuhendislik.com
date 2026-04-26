import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-gradient-hero py-24 md:py-28">
      <div className="absolute inset-0 bg-gradient-mesh opacity-70" aria-hidden />
      <div className="absolute inset-0 grid-pattern opacity-25" aria-hidden />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-bright animate-pulse-glow" />
            Let's talk operations
          </span>

          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Need a more reliable IT operation?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Let's evaluate your infrastructure, support model and operational risks — and build a more
            stable technology environment for your business.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button size="xl" variant="hero" asChild>
              <a href="mailto:hello@eclipse-engineering.com">
                Contact Us <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button size="xl" variant="outline-light" asChild>
              <a href="mailto:hello@eclipse-engineering.com">Request a Quote</a>
            </Button>
          </div>

          <div className="mt-10 inline-flex items-center gap-2 text-sm text-white/60">
            <Phone className="h-4 w-4" />
            Prefer to talk?{" "}
            <a href="tel:+900000000000" className="font-semibold text-white hover:text-electric-bright">
              +90 (000) 000 00 00
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
