import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What does an outsourced IT company do?",
    a: "An outsourced IT company takes ownership of part or all of your IT operations — support, infrastructure, security, cloud and user management — so your team can focus on the business while a dedicated partner ensures continuity and reliability.",
  },
  {
    q: "Is outsourced IT support suitable for SMEs?",
    a: "Yes. SMEs and growing companies often don't need a full internal IT department but still depend heavily on stable infrastructure. An outsourced model gives them senior engineering coverage at a predictable cost.",
  },
  {
    q: "Do you provide both remote and on-site support?",
    a: "Most issues are resolved remotely for speed. When physical intervention is required — cabling, hardware, on-site rollouts, branch work — our field engineers are dispatched.",
  },
  {
    q: "Can you manage Microsoft 365, networks and devices together?",
    a: "Yes. We deliberately operate across these layers as one accountable partner: Microsoft 365 and identity, network and connectivity, endpoints and security — managed under a single engagement.",
  },
  {
    q: "Do you work on a project basis or monthly support model?",
    a: "Both. We deliver infrastructure projects (network, M365, cloud, security) as well as ongoing managed support agreements. Many clients combine the two.",
  },
  {
    q: "Do you support office relocations, new device setups and branch connectivity?",
    a: "Yes — office moves, new branch openings, device rollouts and connectivity setup are core field engineering capabilities for us.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="bg-background py-24 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-title mt-4">Answers for decision-makers.</h2>
            <p className="section-sub">
              Common questions we hear from operations, finance and IT stakeholders evaluating an
              outsourced IT engagement.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
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
