import logoDark from "@/assets/logo-dark-bg.png";
import logoLight from "@/assets/logo-light-bg.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  light?: boolean;
  className?: string;
  size?: "header" | "footer";
};

const logoSizes = {
  header: "h-12 w-[96px] md:h-14 md:w-[112px] lg:h-16 lg:w-[128px]",
  footer: "h-20 w-[160px] lg:h-24 lg:w-[190px]",
};

export const Logo = ({ light = false, className, size = "header" }: LogoProps) => (
  <a href="#top" className={cn("flex shrink-0 items-center", className)} aria-label="Eclipse Mühendislik">
    {/* Both images stay mounted to avoid src-swap flicker while scrolling. */}
    <span className={cn("relative block", logoSizes[size])}>
      <img
        src={logoDark}
        alt="Eclipse Mühendislik"
        draggable={false}
        className={`absolute inset-0 h-full w-full select-none object-contain ${light ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={logoLight}
        alt=""
        aria-hidden
        draggable={false}
        className={`absolute inset-0 h-full w-full select-none object-contain ${light ? "opacity-0" : "opacity-100"}`}
      />
    </span>
  </a>
);
