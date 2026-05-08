import logoDark from "@/assets/logo-dark-bg.png";
import logoLight from "@/assets/logo-light-bg.png";

export const Logo = ({ light = false, className = "" }: { light?: boolean; className?: string }) => (
  <a href="#top" className={`flex items-center shrink-0 ${className}`} aria-label="Eclipse Mühendislik">
    {/* Both images mounted; we toggle visibility instantly to avoid src-swap delay/flicker */}
    <span className="relative block h-14 w-[110px] sm:h-16 sm:w-[125px] lg:h-[80px] lg:w-[145px]">
      <img
        src={logoDark}
        alt="Eclipse Mühendislik"
        draggable={false}
        className={`absolute inset-0 h-full w-full object-contain select-none ${light ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={logoLight}
        alt=""
        aria-hidden
        draggable={false}
        className={`absolute inset-0 h-full w-full object-contain select-none ${light ? "opacity-0" : "opacity-100"}`}
      />
    </span>
  </a>
);
