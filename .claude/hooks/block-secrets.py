#!/usr/bin/env python3
"""PreToolUse hook: blocks Edit/Write calls that would put a real-looking
credential into a tracked (non-.env*) file. This repo already had a Supabase
DB password, service role key, and Resend API key committed to CLAUDE.md in
a public repo — this exists to catch that failure mode before it recurs."""
import json
import os
import re
import sys

PATTERNS = [
    (r"eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}", "JWT-shaped token"),
    (r"postgres(?:ql)?://[^:\s\"']+:[^@\s\"']+@", "database URL with embedded credentials"),
    (r"sk_(live|test)_[A-Za-z0-9]{10,}", "Stripe-style secret key"),
    (r"re_[A-Za-z0-9_]{16,}", "Resend-style API key"),
    (r"AKIA[A-Z0-9]{16}", "AWS access key ID"),
    (r"AIza[A-Za-z0-9_-]{35}", "Google API key"),
]


def is_env_file(path: str) -> bool:
    basename = os.path.basename(path)
    return basename.startswith(".env") and basename != ".env.example"


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        sys.exit(0)

    tool_input = data.get("tool_input", {})
    file_path = tool_input.get("file_path", "")

    if not file_path or is_env_file(file_path):
        sys.exit(0)

    content = "\n".join(
        str(tool_input.get(key, ""))
        for key in ("content", "new_string", "new_str")
    )

    findings = [label for pattern, label in PATTERNS if re.search(pattern, content)]

    if findings:
        print(
            f"Blocked write to {file_path}: content looks like it contains a real "
            f"credential ({', '.join(findings)}). Secrets belong in gitignored "
            f".env* files or the hosting platform's env config, never in tracked "
            f"source or docs (this exact mistake happened once already in this "
            f"repo's CLAUDE.md). If this is a false positive, confirm with the "
            f"user before retrying.",
            file=sys.stderr,
        )
        sys.exit(2)

    sys.exit(0)


if __name__ == "__main__":
    main()
