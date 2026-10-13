"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Send, User, Sparkles } from "lucide-react";
import { findBestResponse, ChatResponse } from "@/app/lib/chatbotEngine";
import { getWelcomeMessage, getInitialSuggestions } from "@/app/data/chatbotData";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "@/app/lib/i18n";

/* ── Types ───────────────────────────────────────────────────── */
interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  suggestions?: string[];
  timestamp: Date;
}

/* ── Helpers ─────────────────────────────────────────────────── */
let msgCounter = 0;
function uid(): string {
  return `msg-${Date.now()}-${++msgCounter}`;
}

/** Simple markdown-like bold parser: **text** → <strong>text</strong> */
function renderMarkdown(text: string, isDark: boolean) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className={`font-semibold ${isDark ? "text-cyan-300" : "text-cyan-600"}`}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function formatMessage(text: string, isDark: boolean) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {renderMarkdown(line, isDark)}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

/* ── Chat Bot Icon ───────────────────────────────────────────── */
function ChatBotIcon({ className = "w-5 h-5", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/chatbot.png"
      alt="Assistant IA"
      width={48}
      height={48}
      priority={priority}
      className={`rounded-full object-contain ${className}`}
    />
  );
}

/* ── Typing Indicator ────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="chatbot-msg-row bot">
      <div className="chatbot-avatar bot">
        <ChatBotIcon className="w-4 h-4" />
      </div>
      <div className="chatbot-bubble bot chatbot-typing">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

/* ── Chatbot Component ───────────────────────────────────────── */
export default function Chatbot() {
  const { theme } = useTheme();
  const { t, locale } = useTranslation();
  const isDark = theme === "dark";

  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const hasOpenedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll to bottom */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  /* Show teaser popover after delay if not previously dismissed */
  useEffect(() => {
    const isDismissed = sessionStorage.getItem("chatbot_teaser_dismissed");
    if (!isDismissed && !isOpen) {
      const timer = setTimeout(() => {
        setShowTeaser(true);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* Global trigger event for opening chatbot from anywhere (e.g. Hero, Contact) */
  useEffect(() => {
    const handleExternalOpen = () => {
      setIsOpen(true);
      setShowTeaser(false);
      sessionStorage.setItem("chatbot_teaser_dismissed", "true");
    };

    window.addEventListener("open-chatbot", handleExternalOpen);
    return () => window.removeEventListener("open-chatbot", handleExternalOpen);
  }, []);

  /* Welcome message on first open */
  useEffect(() => {
    if (isOpen && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: uid(),
            text: getWelcomeMessage(locale),
            sender: "bot",
            suggestions: getInitialSuggestions(locale).map((s) => s.text),
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, locale]);

  /* If locale changes and the conversation only has the initial welcome message, update it to the active language */
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === "bot") {
        return [
          {
            id: prev[0].id,
            text: getWelcomeMessage(locale),
            sender: "bot",
            suggestions: getInitialSuggestions(locale).map((s) => s.text),
            timestamp: prev[0].timestamp,
          },
        ];
      }
      return prev;
    });
  }, [locale]);

  /* Focus input on open */
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* Send a message */
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: Message = {
        id: uid(),
        text: trimmed,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      // Simulate typing delay (300-900ms)
      const delay = Math.min(300 + trimmed.length * 15, 900);
      setTimeout(() => {
        const response: ChatResponse = findBestResponse(trimmed, locale);
        const botMsg: Message = {
          id: uid(),
          text: response.text,
          sender: "bot",
          suggestions: response.suggestions,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping, locale]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const toggleChat = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setShowTeaser(false);
        sessionStorage.setItem("chatbot_teaser_dismissed", "true");
      }
      return next;
    });
  };

  const handleDismissTeaser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
    sessionStorage.setItem("chatbot_teaser_dismissed", "true");
  };

  const handleTeaserClick = () => {
    setIsOpen(true);
    setShowTeaser(false);
    sessionStorage.setItem("chatbot_teaser_dismissed", "true");
  };

  return (
    <>
      {/* ── Chat Window ──────────────────────────────────────── */}
      <div
        className={`chatbot-window ${isOpen ? "open" : "closed"}`}
        role="dialog"
        aria-label="Chat avec l'assistant d'Amine"
      >
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-header-avatar">
              <ChatBotIcon className="w-8 h-8" priority />
              <span className="chatbot-status-dot" />
            </div>
            <div>
              <h3 className="chatbot-header-name">{t("chatbot.name")}</h3>
              <span className="chatbot-header-status">{t("chatbot.status")}</span>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="chatbot-close-btn"
            aria-label={t("chatbot.closeAria")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chatbot-msg-row ${msg.sender}`}>
              {msg.sender === "bot" && (
                <div className="chatbot-avatar bot">
                  <ChatBotIcon className="w-4 h-4" />
                </div>
              )}
              <div className={`chatbot-bubble ${msg.sender}`}>
                {formatMessage(msg.text, isDark)}
              </div>
              {msg.sender === "user" && (
                <div className="chatbot-avatar user">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {/* Suggestions (only show for last bot message) */}
          {!isTyping &&
            messages.length > 0 &&
            messages[messages.length - 1].sender === "bot" &&
            messages[messages.length - 1].suggestions && (
              <div className="chatbot-suggestions">
                {messages[messages.length - 1].suggestions!.map((s, i) => (
                  <button
                    key={i}
                    className="chatbot-suggestion-btn"
                    onClick={() => handleSuggestionClick(s)}
                  >
                    <Sparkles className="w-3 h-3" />
                    {s}
                  </button>
                ))}
              </div>
            )}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chatbot.inputPlaceholder")}
            className="chatbot-input"
            disabled={isTyping}
          />
          <button
            type="submit"
            className="chatbot-send-btn"
            disabled={!input.trim() || isTyping}
            aria-label={t("chatbot.sendAria")}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* ── Teaser Popover Bubble ────────────────────────────── */}
      {showTeaser && !isOpen && (
        <div
          className="chatbot-teaser"
          onClick={handleTeaserClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleTeaserClick();
          }}
          aria-label={t("chatbot.teaserText")}
        >
          <div className="chatbot-teaser-content">
            <div className="chatbot-teaser-badge">
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin-slow" />
              <span>{t("chatbot.teaserBadge")}</span>
            </div>
            <p className="chatbot-teaser-text">{t("chatbot.teaserText")}</p>
          </div>
          <button
            onClick={handleDismissTeaser}
            className="chatbot-teaser-dismiss"
            aria-label={t("chatbot.dismissTeaserAria")}
          >
            <X className="w-3 h-3" />
          </button>
          <div className="chatbot-teaser-arrow" />
        </div>
      )}

      {/* ── Floating Action Button (FAB) ────────────────────── */}
      <button
        onClick={toggleChat}
        className={`chatbot-fab ${isOpen ? "active" : ""}`}
        aria-label={isOpen ? t("chatbot.closeAria") : t("chatbot.openAria")}
        id="chatbot-toggle"
      >
        {/* Radar wave rings when unopened to draw attention */}
        {!isOpen && (
          <>
            <span className="chatbot-fab-pulse-ring" />
            <span className="chatbot-fab-beacon" />
          </>
        )}
        <span className="chatbot-fab-glow" />
        <div className="chatbot-fab-icon">
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <ChatBotIcon className="w-9 h-9 md:w-8 md:h-8" priority />
          )}
        </div>
        {!isOpen && (
          <span className="chatbot-fab-label hidden md:inline-flex items-center">
            {t("chatbot.fabLabel")}
          </span>
        )}
      </button>
    </>
  );
}
