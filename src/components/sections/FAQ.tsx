import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/i18n/LanguageContext";

export const FAQ = () => {
  const { t } = useLang();
  return (
    <section id="faq" className="bg-background py-24 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          <div>
            <span className="eyebrow">{t.faq.eyebrow}</span>
            <h2 className="section-title mt-4">{t.faq.title}</h2>
            <p className="section-sub">{t.faq.sub}</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
