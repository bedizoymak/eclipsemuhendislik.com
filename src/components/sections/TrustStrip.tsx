const badges = [
  "Microsoft 365",
  "Windows Server",
  "Cisco Networking",
  "Ubiquiti",
  "Fortinet",
  "VMware",
  "Hikvision",
  "Veeam",
];

export const TrustStrip = () => {
  return (
    <section className="border-y border-border bg-background py-10">
      <div className="container-page">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="max-w-md text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Reliability you can plan around.</span>{" "}
            Continuity-focused IT services aligned to how your business actually runs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {badges.map((b) => (
              <span
                key={b}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
