import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What does an IT consulting company do?",
    a: "We help businesses design, secure, modernize and operate their IT infrastructure — from advisory and architecture to hands-on implementation and ongoing managed support.",
  },
  {
    q: "Is outsourced IT support suitable for SMEs?",
    a: "Yes. SMEs benefit most: you get a full engineering team — network, server, cloud, security and helpdesk — without the cost of building an internal department.",
  },
  {
    q: "Do you provide both remote and on-site support?",
    a: "We resolve the majority of issues remotely for speed, and dispatch field engineers on-site for cabling, hardware, network installation and any work that requires physical presence.",
  },
  {
    q: "Can you manage Microsoft 365 and network infrastructure together?",
    a: "Absolutely. Treating identity, email, devices and network as one integrated environment is exactly how we deliver reliable day-to-day operations.",
  },
  {
    q: "Do you offer project-based and monthly support models?",
    a: "Both. We deliver one-off projects (migrations, deployments, network builds) and ongoing monthly managed-services agreements — often combined for the same client.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="bg-secondary/40 py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title mt-4">Common questions, clearly answered.</h2>
            <p className="section-sub">
              Still have questions? We're happy to walk through your environment in a free initial
              consultation.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b border-border data-[state=open]:bg-card"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-foreground hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
