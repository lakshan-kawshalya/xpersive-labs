export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-border-subtle border-t-primary animate-spin"
          aria-hidden="true"
        />
        <p className="text-text-muted text-sm font-medium tracking-wide">Loading</p>
      </div>
    </div>
  );
}
