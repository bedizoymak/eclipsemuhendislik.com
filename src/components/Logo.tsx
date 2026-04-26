import { Eclipse } from "lucide-react";

export const Logo = ({ light = false }: { light?: boolean }) => (
  <a href="#top" className="group flex items-center gap-2.5">
    <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-electric shadow-glow">
      <Eclipse className="h-5 w-5 text-white" strokeWidth={2.25} />
    </span>
    <span className={`font-display text-lg font-semibold tracking-tight ${light ? "text-white" : "text-foreground"}`}>
      Eclipse <span className="text-accent">Engineering</span>
    </span>
  </a>
);
