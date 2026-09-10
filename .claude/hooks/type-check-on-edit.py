#!/usr/bin/env python3
"""PostToolUse hook: runs apps/web's type-check after editing a .ts/.tsx file
in apps/web, so type errors surface immediately instead of at the next
manual build. Non-blocking — feeds errors back as context, since the edit
already happened."""
import json
import os
import subprocess
import sys


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        sys.exit(0)

    file_path = data.get("tool_input", {}).get("file_path", "")

    if not (file_path.endswith(".ts") or file_path.endswith(".tsx")):
        sys.exit(0)

    if "apps/web/" not in file_path.replace(os.sep, "/"):
        sys.exit(0)

    project_dir = os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd())
    web_dir = os.path.join(project_dir, "apps", "web")

    if not os.path.isdir(web_dir):
        sys.exit(0)

    try:
        result = subprocess.run(
            ["npm", "run", "type-check", "--silent"],
            cwd=web_dir,
            capture_output=True,
            text=True,
            timeout=120,
        )
    except (subprocess.TimeoutExpired, OSError):
        sys.exit(0)

    if result.returncode != 0:
        output = (result.stdout + result.stderr).strip()
        print(f"TypeScript errors after editing {file_path}:\n{output}", file=sys.stderr)
        sys.exit(2)

    sys.exit(0)


if __name__ == "__main__":
    main()
