"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const WHATSAPP_NUMBER = "94742366282"; // E.164 format, no + or spaces
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

function buildWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

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
    window.open(buildWhatsAppURL(message), "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleCustomMessage = () => {
    window.open(
      buildWhatsAppURL("Hi Xpersive Labs! I'd like to get in touch."),
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
                <WhatsAppIcon />
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
                <WhatsAppIcon size={26} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
