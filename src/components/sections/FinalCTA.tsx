import { ArrowRight, Phone, Mail, MapPin, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { CONTACT } from "@/i18n/translations";

export const FinalCTA = () => {
  const { t } = useLang();

  const cards = [
    {
      icon: MapPin,
      label: t.cta.addressLabel,
      value: CONTACT.address,
      href: CONTACT.mapsUrl,
      external: true,
    },
    {
      icon: Phone,
      label: t.cta.phoneLabel,
      value: CONTACT.phone,
      href: `tel:${CONTACT.phoneTel}`,
    },
    {
      icon: MessageCircle,
      label: t.cta.whatsappLabel,
      value: CONTACT.phone,
      href: CONTACT.whatsappUrl,
      external: true,
    },
    {
      icon: Mail,
      label: t.cta.emailLabel,
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
  ];

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-gradient-hero py-24 md:py-28">
      <div className="absolute inset-0 bg-gradient-mesh opacity-70" aria-hidden />
      <div className="absolute inset-0 grid-pattern opacity-25" aria-hidden />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-bright animate-pulse-glow" />
            {t.cta.badge}
          </span>

          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">{t.cta.sub}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button size="xl" variant="hero" asChild>
              <a href={`mailto:${CONTACT.email}`}>
                {t.cta.contact} <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button size="xl" variant="outline-light" asChild>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4" />
                {t.cta.whatsapp}
              </a>
            </Button>
          </div>
        </div>

        {/* Contact info cards */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group rounded-xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur transition-all hover:border-electric-bright/40 hover:bg-white/[0.07]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-electric/15 text-electric-bright ring-1 ring-electric/20">
                <c.icon className="h-4.5 w-4.5" strokeWidth={2} />
              </span>
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                {c.label}
              </div>
              <div className="mt-1.5 text-sm leading-relaxed text-white group-hover:text-electric-bright transition-colors break-words">
                {c.value}
              </div>
            </a>
          ))}
        </div>

        {/* Map */}
        <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-elevated">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/7]">
            <iframe
              title="Eclipse Mühendislik konumu"
              src={CONTACT.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[40%] contrast-[1.05]"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
          <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 bg-navy-deep/60 px-5 py-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-2.5 text-sm text-white/75">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric-bright" />
              <span>{CONTACT.address}</span>
            </div>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-electric px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-electric-bright"
            >
              <Navigation className="h-3.5 w-3.5" />
              {t.cta.directions}
            </a>
          </div>
        </div>

        <div className="mt-10 inline-flex w-full items-center justify-center gap-2 text-sm text-white/60">
          <Phone className="h-4 w-4" />
          {t.cta.prefer}{" "}
          <a href={`tel:${CONTACT.phoneTel}`} className="font-semibold text-white hover:text-electric-bright">
            {CONTACT.phone}
          </a>
        </div>
      </div>
    </section>
  );
};
