const REGIONS = ["🇦🇺 Australia", "🇬🇧 United Kingdom", "🇺🇸 United States"];

export default function TrustBar() {
  return (
    <section
      className="relative z-10 bg-bg-card py-5"
      style={{
        borderTop: "1px solid rgba(109,113,249,0.08)",
        borderBottom: "1px solid rgba(109,113,249,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
          <span className="text-text-muted">Trusted by businesses in</span>
          {REGIONS.map((region, i) => (
            <span key={region} className="flex items-center gap-2">
              {i > 0 && <span className="text-text-muted">·</span>}
              <span className="font-medium text-text-secondary">{region}</span>
            </span>
          ))}
        </div>
        <p className="font-mono text-xs text-text-muted opacity-70">
          Built with Next.js · TypeScript · Python
        </p>
      </div>
    </section>
  );
}
