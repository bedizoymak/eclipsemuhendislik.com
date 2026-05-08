import logoDark from "@/assets/logo-dark-bg.png";
import logoLight from "@/assets/logo-light-bg.png";

export const Logo = ({ light = false, className = "" }: { light?: boolean; className?: string }) => (
  <a href="#top" className={`flex items-center ${className}`} aria-label="Eclipse Mühendislik">
    <img
      src={light ? logoDark : logoLight}
      alt="Eclipse Mühendislik"
      className="h-10 w-auto md:h-12 lg:h-14 select-none"
      draggable={false}
    />
  </a>
);
