import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  return (
    <section id="contact" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 shadow-elevated md:p-16 lg:p-20">
          <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden />
          <div className="absolute inset-0 bg-gradient-mesh" aria-hidden />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-electric/30 blur-3xl" aria-hidden />

          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
                Let's talk
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.05] text-white md:text-4xl lg:text-5xl">
                Ready for IT operations you can actually rely on?
              </h2>
              <p className="mt-5 max-w-xl text-white/70 md:text-lg">
                Tell us about your environment and goals. We'll respond within one business day with
                a clear next step — whether that's a consultation, a quote or a quick technical
                review.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button size="xl" variant="hero" asChild>
                  <a href="mailto:hello@eclipse-muhendislik.com">
                    Contact Us <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button size="xl" variant="outline-light" asChild>
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
              <h3 className="font-display text-lg font-semibold text-white">Direct contact</h3>
              <p className="mt-2 text-sm text-white/60">
                Reach the engineering team directly. We respond personally — no call centers.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-center gap-3 text-sm text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Mail className="h-4 w-4 text-electric-bright" />
                  </span>
                  hello@eclipse-muhendislik.com
                </li>
                <li className="flex items-center gap-3 text-sm text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Phone className="h-4 w-4 text-electric-bright" />
                  </span>
                  +90 (000) 000 00 00
                </li>
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5 text-xs text-white/50">
                Average first response: under 1 business day.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
