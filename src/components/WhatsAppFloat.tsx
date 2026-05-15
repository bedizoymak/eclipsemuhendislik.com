import { MessageCircle } from "lucide-react";
import { usePublicSettings } from "@/hooks/useEclipseData";
import { getWhatsappUrl } from "@/lib/eclipseContent";

export const WhatsAppFloat = () => {
  const { settings } = usePublicSettings();

  return (
    <a
      href={getWhatsappUrl(settings.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Eclipse Mühendislik ile WhatsApp üzerinden iletişime geç"
      className="group fixed bottom-4 right-4 z-[60] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-navy text-white shadow-glow ring-1 ring-navy-deep/5 transition-all duration-200 hover:scale-110 hover:bg-navy-soft hover:shadow-elevated active:scale-95 md:bottom-6 md:right-6 md:h-[60px] md:w-[60px]"
    >
      <span className="absolute inset-0 rounded-full bg-navy opacity-60 animate-ping" aria-hidden style={{ animationDuration: "2.4s" }} />
      <MessageCircle className="relative h-7 w-7 md:h-8 md:w-8" />
    </a>
  );
};
