const clients = [
  "NORTHWIND",
  "ATLAS GROUP",
  "MERIDIAN",
  "BLUEHARBOR",
  "VECTOR CO.",
  "SUMMIT IND.",
];

export const TrustStrip = () => {
  return (
    <section className="border-b border-border bg-background py-12">
      <div className="container-page">
        <p className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Trusted by growing companies
          </span>{" "}
          that need reliable, scalable and well-managed IT operations.
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((c) => (
            <div
              key={c}
              className="flex items-center justify-center"
            >
              <span className="font-display text-sm font-bold tracking-[0.22em] text-muted-foreground/60 transition-colors hover:text-foreground">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
