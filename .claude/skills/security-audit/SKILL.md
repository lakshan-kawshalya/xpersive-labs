---
name: security-audit
description: Xpersive Labs (apps/web) security audit — repo-specific invariants layered on top of the generic nextjs-security checklist. Use when asked to audit, review, or harden this repo's security, or before merging any change that touches proxy.ts, app/api/*, env vars, or CLAUDE.md.
---

# Xpersive Labs security audit

This repo went through a full security hardening pass in PR #7
(`fix/security-hardening-audit`). Load the general-purpose `nextjs-security`
skill for the full audit methodology (dependency CVEs, headers, live testing
playbook, findings-report format). This skill adds the invariants specific to
*this* codebase that a generic audit won't know to check — verify these first,
then run the general checklist for anything new.

## Standing invariants (verify these haven't regressed)

1. **`/keystatic` and `/api/keystatic/*` must stay behind Basic Auth.**
   Keystatic's `storage: { kind: "local" }` ships with zero auth of its own.
   The gate lives in `proxy.ts` (page routes, via the middleware matcher) and
   in `app/api/keystatic/[...params]/route.ts` (API routes, which fall
   outside the middleware matcher and must gate themselves). If either gate
   is missing or `KEYSTATIC_BASIC_AUTH_USER`/`PASSWORD` isn't enforced
   fail-closed (no env vars set → deny, not allow), that's a Critical finding.
   Test: `curl -s -o /dev/null -w '%{http_code}' localhost:3000/keystatic` → `401`.

2. **CSP `script-src` must not silently gain `unsafe-eval` back**, and a
   nonce-based CSP must not be reintroduced without re-checking `next build`
   output for static→dynamic regressions first. This was deliberately tried
   and reverted (see PR #7) because it forced every page from `○`/`●`
   (static/SSG) to `ƒ` (dynamic). If someone proposes nonce/hash-based CSP
   again, treat "does `next build` still show static rendering for
   `/about`, `/services`, `/blog/[slug]`, etc.?" as a required check, not
   an afterthought.

3. **EmailJS credentials must stay server-only.** The contact form posts to
   `/api/contact`, which validates input with Zod, checks Origin/Host (API
   routes get no built-in CSRF protection), verifies the Turnstile token via
   Cloudflare's `siteverify`, and only then sends the email itself using
   `EMAILJS_SERVICE_ID`/`EMAILJS_TEMPLATE_ID`/`EMAILJS_PUBLIC_KEY` (no
   `NEXT_PUBLIC_` prefix). If any of these three env vars get re-prefixed
   with `NEXT_PUBLIC_`, or the contact page starts calling `@emailjs/browser`
   directly again, that's the abuse-vector regression this was built to close.

4. **No real secret values in any tracked file, ever — especially `CLAUDE.md`.**
   This already happened once: a Supabase `DATABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   and `RESEND_API_KEY` sat in plaintext in `CLAUDE.md` in this *public* repo
   for months before being caught. `CLAUDE.md`'s env var section is meant to
   be a schema/placeholder reference only — it says so in the file itself now.
   A `PreToolUse` hook (`.claude/hooks/block-secrets.py`) catches JWT-shaped
   tokens, embedded-credential DB URLs, and known API-key prefixes on
   Edit/Write outside `.env*` files, but don't rely on the hook alone — if
   you're about to paste a real value into a tracked file, stop and ask
   whether it belongs in `.env.local` / the hosting platform's env config
   instead.

5. **Region-detection (`proxy.ts` / `lib/geo/*`) trusts client-supplied
   `X-Forwarded-For`.** This is a known, accepted low-severity gap (only
   affects which regional homepage variant renders) — don't re-flag it as
   new without checking `lib/geo/ip.test.ts` first to see if it's already
   documented as accepted risk.

## When something changes in a security-sensitive area

Touching any of these should trigger at least a quick pass through the
invariants above, not just the diff at hand:

- `proxy.ts`, `next.config.ts` (headers/CSP)
- `app/api/**/route.ts`
- `lib/auth/keystaticAuth.ts`, `lib/turnstile.ts`, `lib/contactSchema.ts`
- Any `.env*` file, or `CLAUDE.md`'s "Environment Variables" section
- `package.json` (dependency bumps — re-run `npm audit --audit-level=moderate`
  and cross-check against the GitHub Advisory Database, not just the CVE ID
  someone mentions in a ticket; see PR #7's findings report for why — the
  originally-requested CVE IDs there didn't match reality, but real
  equivalent advisories did)

## Full audit workflow

For a ground-up audit (not just verifying these invariants), invoke the
`nextjs-security` skill and follow its Static Audit Checklist → Dependency
Audit → Live Testing Playbook → Findings Report sequence. Present findings
before applying fixes; this repo's owner has previously asked to review and
choose which fixes to apply rather than have everything auto-fixed.
