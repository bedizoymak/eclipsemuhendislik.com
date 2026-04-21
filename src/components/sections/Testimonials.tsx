import { Quote } from "lucide-react";

const items = [
  {
    quote:
      "Eclipse stabilized our network and Microsoft 365 environment within weeks. Communication is direct, and execution is exactly what was promised.",
    name: "Operations Director",
    company: "Logistics Group, Istanbul",
  },
  {
    quote:
      "They behave like an in-house IT team. Tickets are resolved fast, and infrastructure decisions are explained in plain language we can act on.",
    name: "Finance Manager",
    company: "Professional Services Firm",
  },
  {
    quote:
      "What we value most is continuity. Our environment is documented, monitored and supported — we no longer worry about single points of failure.",
    name: "General Manager",
    company: "Mid-sized Manufacturer",
  },
];

export const Testimonials = () => {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Client voices</span>
          <h2 className="section-title mt-4">Trusted for speed, clarity and operational continuity.</h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="relative flex flex-col rounded-2xl border border-border bg-gradient-card p-8 shadow-soft"
            >
              <Quote className="h-7 w-7 text-accent/30" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.company}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
