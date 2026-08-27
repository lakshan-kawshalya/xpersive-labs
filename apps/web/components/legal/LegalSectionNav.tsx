interface LegalSection {
  id: string;
  label: string;
}

interface LegalSectionNavProps {
  sections: LegalSection[];
}

export function LegalSectionNav({ sections }: LegalSectionNavProps) {
  return (
    <nav className="hidden lg:block sticky top-28 self-start">
      <p
        className="text-xs font-bold uppercase mb-4"
        style={{ color: "var(--color-text-muted)", letterSpacing: "0.12em" }}
      >
        On this page
      </p>
      <ul className="space-y-2.5 border-l border-border-subtle pl-4">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-sm text-text-muted hover:text-primary transition-colors leading-snug"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
