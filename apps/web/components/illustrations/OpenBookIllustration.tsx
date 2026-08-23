interface OpenBookIllustrationProps {
  className?: string;
}

export default function OpenBookIllustration({
  className,
}: OpenBookIllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left page */}
      <path
        d="M60 20C48 14 30 12 10 16V72C30 68 48 70 60 76V20Z"
        stroke="var(--color-primary)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Right page */}
      <path
        d="M60 20C72 14 90 12 110 16V72C90 68 72 70 60 76V20Z"
        stroke="var(--color-primary)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Left page text lines */}
      <line x1="20" y1="30" x2="46" y2="27" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="1.25" />
      <line x1="20" y1="40" x2="46" y2="37" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="1.25" />
      <line x1="20" y1="50" x2="46" y2="47" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="1.25" />

      {/* Right page text lines */}
      <line x1="74" y1="27" x2="100" y2="30" stroke="var(--color-accent)" strokeOpacity="0.3" strokeWidth="1.25" />
      <line x1="74" y1="37" x2="100" y2="40" stroke="var(--color-accent)" strokeOpacity="0.3" strokeWidth="1.25" />
      <line x1="74" y1="47" x2="94" y2="49" stroke="var(--color-accent)" strokeOpacity="0.3" strokeWidth="1.25" />
    </svg>
  );
}
