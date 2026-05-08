import { MessageCircle } from "lucide-react";

export const WhatsAppFloat = () => (
  <a
    href="https://wa.me/905362629085"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contact Eclipse Mühendislik on WhatsApp"
    className="group fixed bottom-4 right-4 z-[60] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.55)] ring-1 ring-black/5 transition-all duration-200 hover:scale-110 hover:bg-[#1ebe5d] hover:shadow-[0_14px_36px_-6px_rgba(37,211,102,0.7)] active:scale-95 md:bottom-6 md:right-6 md:h-[60px] md:w-[60px]"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" aria-hidden style={{ animationDuration: "2.4s" }} />
    <svg viewBox="0 0 32 32" className="relative h-7 w-7 md:h-8 md:w-8" fill="currentColor" aria-hidden>
      <path d="M16.001 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.46 1.74 6.4L3.2 28.8l6.6-1.72a12.77 12.77 0 0 0 6.2 1.58h.01c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.66-12.8-12.66Zm0 23.27h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.92 1.02 1.05-3.82-.25-.4a10.62 10.62 0 0 1-1.63-5.66c0-5.87 4.78-10.65 10.66-10.65 2.85 0 5.52 1.11 7.53 3.13a10.58 10.58 0 0 1 3.12 7.53c0 5.87-4.78 10.56-10.76 10.56Zm5.84-7.92c-.32-.16-1.9-.94-2.19-1.04-.29-.11-.51-.16-.72.16-.21.32-.83 1.04-1.02 1.26-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6-.96-.86-1.6-1.92-1.79-2.24-.19-.32-.02-.5.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.39-.26-.62-.53-.54-.72-.55l-.62-.01c-.21 0-.56.08-.86.4-.29.32-1.13 1.1-1.13 2.69s1.16 3.12 1.32 3.34c.16.21 2.28 3.49 5.53 4.9.77.33 1.37.53 1.84.68.77.24 1.48.21 2.04.13.62-.09 1.9-.78 2.18-1.53.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z"/>
    </svg>
  </a>
);
