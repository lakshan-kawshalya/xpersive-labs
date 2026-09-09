import { HelpCircle } from "lucide-react";

interface LegalTocSection {
  id: string;
  label: string;
}

interface LegalTocSidebarProps {
  sections: LegalTocSection[];
}

export function LegalTocSidebar({ sections }: LegalTocSidebarProps) {
  return (
    <aside className="hidden lg:block lg:col-span-4 sticky top-28">
      <div
        className="bg-bg-card rounded-2xl p-6 border border-border-subtle"
        style={{ boxShadow: "0 4px 20px rgba(39,40,72,0.05)" }}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
          <h3 className="font-display font-bold text-sm tracking-wide text-text-primary uppercase">
            Table of Contents
          </h3>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
            {sections.length} Sections
          </span>
        </div>

        <div className="max-h-[calc(100vh-260px)] overflow-y-auto pr-2 space-y-1 text-xs text-text-secondary">
          {sections.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block px-3 py-2 rounded-lg border-l-2 border-transparent hover:border-primary hover:text-text-primary hover:bg-primary/4 transition-all"
            >
              {i + 1}. {section.label}
            </a>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <HelpCircle size={16} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-text-muted">Need clarification?</p>
              <a
                href="mailto:hello@xpersivelabs.com"
                className="text-xs font-semibold text-primary hover:underline"
              >
                hello@xpersivelabs.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
