"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
];

/* ─── Magnetic hook (desktop only) ─────────────────────────────────── */
function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      if (Math.hypot(dx, dy) < 80) setOffset({ x: dx * strength, y: dy * strength });
    },
    [strength],
  );
  const onMouseLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;
    el.addEventListener("mousemove", onMouseMove as EventListener);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove as EventListener);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return { ref, offset };
}

/* ─── Magnetic nav link ─────────────────────────────────────────────── */
function MagneticNavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const { ref, offset } = useMagnetic(0.3);
  const { shouldAnimate } = useMotionSafe();

  const linkClass = `relative text-sm font-medium transition-colors duration-200 hover:text-primary flex flex-col items-center gap-1 pb-1 ${isActive ? "text-[#8285fb]" : "text-white/70"}`;

  if (!shouldAnimate) {
    return (
      <li className="relative">
        <Link href={href} className={linkClass}>
          {label}
          {isActive && <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary" />}
        </Link>
      </li>
    );
  }

  return (
    <motion.li
      ref={ref as React.RefObject<HTMLLIElement>}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      className="relative"
    >
      <Link href={href} className={linkClass}>
        {label}
        {isActive && (
          <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary" />
        )}
      </Link>
    </motion.li>
  );
}

/* ─── Magnetic CTA ──────────────────────────────────────────────────── */
function MagneticCTA() {
  const { ref, offset } = useMagnetic(0.4);
  const [hovered, setHovered] = useState(false);
  const { shouldAnimate } = useMotionSafe();

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ x: 0, y: 0 }}
      {...(shouldAnimate
        ? {
            animate: { x: offset.x, y: offset.y },
            transition: { type: "spring" as const, stiffness: 200, damping: 20, mass: 0.5 },
          }
        : {})}
    >
      <Link
        href="/contact"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/30"
        style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
      >
        <motion.span
          className="absolute inset-0 bg-white/15 rounded-full"
          style={{ x: "-100%" }}
          {...(shouldAnimate
            ? { animate: { x: hovered ? "0%" : "-100%" }, transition: { duration: 0.3, ease: "easeInOut" as const } }
            : {})}
        />
        <span className="relative">Get in Touch</span>
        <motion.span
          className="relative flex items-center"
          style={{ x: 0 }}
          {...(shouldAnimate
            ? { animate: { x: hovered ? 3 : 0 }, transition: { duration: 0.2 } }
            : {})}
        >
          <ArrowRight size={14} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { shouldAnimate } = useMotionSafe();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "backdrop-blur-xl bg-dark/80 border-b border-white/5 shadow-lg" : "bg-transparent"
    }`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo/brandmark.svg"
              alt="Xpersive Labs mark"
              width={28}
              height={28}
              priority
              aria-hidden="true"
            />
            <span className="font-display text-xl font-bold text-gradient transition-all duration-300"
              style={isScrolled ? { textShadow: "0 0 20px rgba(109,113,249,0.5)" } : {}}>
              Xpersive Labs
            </span>
          </Link>
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium select-none"
            style={{ background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.2)", color: "var(--color-success)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "badge-pulse 2s ease-in-out infinite" }} />
            Available for projects
          </span>
        </div>

        {/* Desktop nav */}
        {shouldAnimate ? (
          <motion.ul className="hidden md:flex items-center gap-8" layout>
            {navLinks.map((link) => (
              <MagneticNavLink key={link.href} href={link.href} label={link.label} isActive={pathname === link.href} />
            ))}
          </motion.ul>
        ) : (
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticNavLink key={link.href} href={link.href} label={link.label} isActive={pathname === link.href} />
            ))}
          </ul>
        )}

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <MagneticCTA />
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-9 h-9 text-white rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav"
          >
            {shouldAnimate ? (
              <AnimatePresence mode="wait" initial={false}>
                {isMobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            ) : (
              isMobileOpen ? <X size={20} /> : <Menu size={20} />
            )}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      {shouldAnimate ? (
        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                key="backdrop"
                className="fixed inset-0 z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
              />
              <motion.div
                key="menu"
                id="mobile-nav"
                className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center"
                style={{ background: "var(--color-dark-elevated)" }}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: [0.215, 0.61, 0.355, 1.0] }}
              >
                <button
                  className="absolute top-4 right-6 flex items-center justify-center w-9 h-9 text-white/50 hover:text-white transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
                <nav className="flex flex-col items-center gap-6">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.35, ease: [0.215, 0.61, 0.355, 1.0] }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium select-none"
                    style={{ background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.2)", color: "var(--color-success)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "badge-pulse 2s ease-in-out infinite" }} />
                    Available for projects
                  </motion.span>
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: [0.215, 0.61, 0.355, 1.0] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`font-display font-bold transition-colors duration-200 ${
                          pathname === link.href ? "text-gradient" : "text-white/75 hover:text-white"
                        }`}
                        style={{ fontSize: 32 }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + navLinks.length * 0.06, duration: 0.35 }}
                    className="mt-4"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileOpen(false)}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
                    >
                      Get in Touch
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      ) : (
        isMobileOpen && (
          <>
            <div
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <div
              id="mobile-nav"
              className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center"
              style={{ background: "var(--color-dark-elevated)" }}
            >
              <button
                className="absolute top-4 right-6 flex items-center justify-center w-9 h-9 text-white/50 hover:text-white transition-colors"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
              <nav className="flex flex-col items-center gap-6">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium select-none"
                  style={{ background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.2)", color: "var(--color-success)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "badge-pulse 2s ease-in-out infinite" }} />
                  Available for projects
                </span>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`font-display font-bold transition-colors duration-200 ${
                      pathname === link.href ? "text-gradient" : "text-white/75 hover:text-white"
                    }`}
                    style={{ fontSize: 32 }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
                  >
                    Get in Touch
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </nav>
            </div>
          </>
        )
      )}
    </header>
  );
}
