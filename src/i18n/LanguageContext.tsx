import { createContext, useContext, useEffect, ReactNode } from "react";
import { translations, type Lang, type Translations } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

const LanguageContext = createContext<Ctx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const lang: Lang = "tr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = "tr";
    }
  }, []);

  const setLang = () => undefined;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
