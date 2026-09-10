"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const AUTO_OPEN_DELAY_MS = 45_000;
const PULSE_DURATION_MS = 8_000;
const AUTO_OPEN_STORAGE_KEY = "wa-widget-opened";

interface QuickReply {
  id: string;
  emoji: string;
  label: string;
  message: string;
}

const QUICK_REPLIES: QuickReply[] = [
  {
    id: "price",
    emoji: "💰",
    label: "How much does a website cost?",
    message:
      "Hi Xpersive Labs! I'd like to know how much a website costs. Can you give me a rough idea?",
  },
  {
    id: "timeline",
    emoji: "⏱️",
    label: "How long does it take?",
    message:
      "Hi Xpersive Labs! I'm wondering how long it typically takes to build a website. What's your usual timeline?",
  },
  {
    id: "international",
    emoji: "🌍",
    label: "Do you work internationally?",
    message:
      "Hi Xpersive Labs! I'm based outside Sri Lanka — do you work with international clients?",
  },
  {
    id: "shopify",
    emoji: "🛍️",
    label: "Do you build Shopify stores?",
    message:
      "Hi Xpersive Labs! I'm interested in an ecommerce store. Do you work with Shopify?",
  },
  {
    id: "project",
    emoji: "💬",
    label: "I want to discuss my project",
    message:
      "Hi Xpersive Labs! I have a project I'd like to discuss. When would be a good time to chat?",
  },
];

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [pulsing, setPulsing] = useState(true);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Auto-open once after 45 seconds on first visit only
  useEffect(() => {
    const hasAutoOpened = sessionStorage.getItem(AUTO_OPEN_STORAGE_KEY);
    if (hasAutoOpened) {
      setPulsing(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
      setPulsing(false);
      sessionStorage.setItem(AUTO_OPEN_STORAGE_KEY, "true");
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Stop pulse after 8 seconds regardless
  useEffect(() => {
    const timer = setTimeout(() => setPulsing(false), PULSE_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleQuickReply = (message: string) => {
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleCustomMessage = () => {
    window.open(
      buildWhatsAppUrl("Hi Xpersive Labs! I'd like to get in touch."),
      "_blank",
      "noopener,noreferrer",
    );
    setIsOpen(false);
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      aria-label="WhatsApp contact widget"
    >
      {/* CHAT PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="wa-panel"
          >
            {/* HEADER */}
            <div className="wa-header">
              <div className="wa-avatar">
                <div className="wa-avatar-circle">
                  <Image
                    src="/logo/brandmark.svg"
                    alt="Xpersive Labs"
                    width={24}
                    height={24}
                  />
                </div>
                <span className="wa-online-dot" />
              </div>
              <div className="wa-header-text">
                <p className="wa-name">Xpersive Labs</p>
                <p className="wa-status">
                  <span className="wa-online-text">● Online</span>
                  &nbsp;· Replies within a few hours
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="wa-close"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* BUBBLE */}
            <div className="wa-body">
              <div className="wa-bubble">
                <p>👋 Hi! How can we help you today?</p>
                <p>
                  Pick a question below or send us a custom message on
                  WhatsApp.
                </p>
              </div>

              {/* QUICK REPLIES */}
              <div className="wa-replies">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply.message)}
                    className="wa-reply-btn"
                  >
                    <span className="wa-reply-emoji">{reply.emoji}</span>
                    <span>{reply.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="wa-footer">
              <button onClick={handleCustomMessage} className="wa-open-btn">
                <WhatsAppIcon color="white" />
                Open WhatsApp
              </button>
              <p className="wa-disclaimer">
                Powered by WhatsApp · Your number stays private until you
                message us
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING BUTTON */}
      <div className="relative">
        {/* Pulse ring (shows for first 8s on first visit) */}
        {pulsing && (
          <>
            <span className="wa-pulse-ring wa-pulse-ring-1" />
            <span className="wa-pulse-ring wa-pulse-ring-2" />
          </>
        )}

        {/* Tooltip (shows when closed) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            className="wa-tooltip"
          >
            Chat with us on WhatsApp
          </motion.div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`wa-fab ${isOpen ? "wa-fab-open" : ""}`}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={24} color="white" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <WhatsAppIcon size={34} color="white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export function WhatsAppIcon({ size = 24, color }: { size?: number; color?: string }) {
  // FontAwesome's auto-injected CSS sets `width`/`height: 1em` on `.svg-inline--fa`,
  // which overrides the plain `width`/`height` SVG attributes — use inline `style`
  // instead, since it wins on specificity over that class-based rule.
  // The glyph's own artwork sits slightly above center in its viewBox, so a small
  // negative bottom margin nudges it down to look optically centered next to text
  // or inside a circular button.
  return (
    <FontAwesomeIcon
      icon={faWhatsapp}
      style={{ width: size, height: size, marginBottom: -size * 0.08 }}
      color={color}
    />
  );
}
