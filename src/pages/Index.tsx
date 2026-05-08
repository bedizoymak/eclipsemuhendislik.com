import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Credibility } from "@/components/sections/Credibility";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  const ref = useReveal();
  return (
    <div ref={ref} className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <WhyChoose />
        <Process />
        <CaseStudies />
        <Credibility />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
