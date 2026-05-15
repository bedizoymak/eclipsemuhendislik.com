import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLang } from "@/i18n/LanguageContext";

type SubLink = { label: string; href: string; desc?: string };
type NavItem = { label: string; href?: string; children?: SubLink[] };

export const Header = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  const nav: NavItem[] = [
    {
      label: t.nav.itServices,
      children: [
        { label: t.nav.items.support.label, href: "#services", desc: t.nav.items.support.desc },
        { label: t.nav.items.consulting.label, href: "#services", desc: t.nav.items.consulting.desc },
        { label: t.nav.items.managed.label, href: "#services", desc: t.nav.items.managed.desc },
      ],
    },
    {
      label: t.nav.cloudServices,
      children: [
        { label: t.nav.items.cloud.label, href: "#services", desc: t.nav.items.cloud.desc },
        { label: t.nav.items.security.label, href: "#services", desc: t.nav.items.security.desc },
        { label: t.nav.items.network.label, href: "#services", desc: t.nav.items.network.desc },
      ],
    },
    {
      label: t.nav.microsoft365,
      children: [
        { label: t.nav.items.m365.label, href: "#services", desc: t.nav.items.m365.desc },
        { label: t.nav.items.azure.label, href: "#services", desc: t.nav.items.azure.desc },
      ],
    },
    { label: t.nav.about, href: "#why" },
    { label: t.nav.resources, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const footer = document.querySelector("footer");
      setOverFooter(Boolean(footer && footer.getBoundingClientRect().top <= 112));
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        overFooter
          ? "bg-navy backdrop-blur-lg border-b border-white/10 shadow-soft"
          : scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20 lg:h-[5.5rem]">
        <Logo light={!scrolled || overFooter} />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    overFooter ? "text-white/80 hover:text-white" : scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>
                {openMenu === item.label && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="w-80 rounded-xl border border-border bg-popover p-2 shadow-elevated">
                      {item.children.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary"
                        >
                          <div className="text-sm font-semibold text-foreground">{c.label}</div>
                          {c.desc && <div className="mt-0.5 text-xs text-muted-foreground">{c.desc}</div>}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  overFooter ? "text-white/80 hover:text-white" : scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher light={!scrolled || overFooter} />
          <Button variant="hero" size="sm" asChild>
            <a href="#contact">{t.nav.getQuote}</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher light={!scrolled || overFooter} />
          <button
            aria-label="Toggle menu"
            className={`p-2 -mr-2 ${overFooter ? "text-white" : scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <nav className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-border/60 last:border-0">
                  <button
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-semibold text-foreground"
                    onClick={() => setMobileGroup(mobileGroup === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${mobileGroup === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileGroup === item.label && (
                    <div className="pb-2 pl-3">
                      {item.children.map((c) => (
                        <a
                          key={c.label}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                        >
                          {c.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  {item.label}
                </a>
              ),
            )}
            <Button variant="hero" size="sm" className="mt-3" asChild>
              <a href="#contact" onClick={() => setOpen(false)}>{t.nav.getQuote}</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
