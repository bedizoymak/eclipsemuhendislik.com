import { useLang } from "@/i18n/LanguageContext";
import { Globe } from "lucide-react";

export const LanguageSwitcher = ({ light = false }: { light?: boolean }) => {
  const { lang, setLang } = useLang();

  const base = "px-2 py-1 text-xs font-semibold uppercase tracking-wider rounded transition-colors";
  const activeCls = light ? "bg-white/15 text-white" : "bg-foreground/10 text-foreground";
  const inactiveCls = light ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground";

  return (
    <div
      className={`flex items-center gap-1 rounded-lg border px-1.5 py-1 ${
        light ? "border-white/15 bg-white/5 backdrop-blur" : "border-border bg-background"
      }`}
      role="group"
      aria-label="Language switcher"
    >
      <Globe className={`h-3.5 w-3.5 ${light ? "text-white/60" : "text-muted-foreground"}`} />
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`${base} ${lang === "en" ? activeCls : inactiveCls}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("tr")}
        aria-pressed={lang === "tr"}
        className={`${base} ${lang === "tr" ? activeCls : inactiveCls}`}
      >
        TR
      </button>
    </div>
  );
};
