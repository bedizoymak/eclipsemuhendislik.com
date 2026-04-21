import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

type SubLink = { label: string; href: string; desc?: string };
type NavItem = { label: string; href?: string; children?: SubLink[] };

const nav: NavItem[] = [
  {
    label: "IT Services",
    children: [
      { label: "IT Support & Maintenance", href: "#services", desc: "Helpdesk, preventive maintenance, on-site." },
      { label: "IT Consulting", href: "#services", desc: "Architecture and modernization advisory." },
      { label: "Managed IT Services", href: "#services", desc: "Full-environment ownership and operations." },
    ],
  },
  {
    label: "Cloud Services",
    children: [
      { label: "Cloud & Server Solutions", href: "#services", desc: "Virtualization, hybrid cloud, Windows Server." },
      { label: "Cybersecurity", href: "#services", desc: "Endpoint, firewall, MFA, backups." },
      { label: "Network Infrastructure", href: "#services", desc: "Switching, firewalls, Wi-Fi coverage." },
    ],
  },
  {
    label: "Microsoft 365",
    children: [
      { label: "Microsoft 365 Setup & Administration", href: "#services", desc: "Tenant, identity, Teams, SharePoint." },
      { label: "Azure & Cloud Management", href: "#services", desc: "Workloads, identity and governance." },
    ],
  },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Logo light={!scrolled} />

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
                    scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"
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
                  scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden lg:flex">
          <Button variant="hero" size="sm" asChild>
            <a href="#contact">Get a Quote</a>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className={`lg:hidden p-2 -mr-2 ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
              <a href="#contact" onClick={() => setOpen(false)}>Get a Quote</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
