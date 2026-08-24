"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, User, Sparkles } from "lucide-react";
import { findBestResponse, ChatResponse } from "@/app/lib/chatbotEngine";
import { welcomeMessage, initialSuggestions } from "@/app/data/chatbotData";
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
        <strong key={i} className={`font-semibold ${isDark ? "text-indigo-300" : "text-indigo-600"}`}>
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
function ChatBotIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="chatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {/* Chat bubble body */}
      <path
        d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.5L4 21V4z"
        fill="url(#chatGrad)"
        opacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Typing dots inside bubble */}
      <circle cx="8.5" cy="11" r="1.2" fill="currentColor" className="chatbot-icon-dot chatbot-icon-dot-1" />
      <circle cx="12" cy="11" r="1.2" fill="currentColor" className="chatbot-icon-dot chatbot-icon-dot-2" />
      <circle cx="15.5" cy="11" r="1.2" fill="currentColor" className="chatbot-icon-dot chatbot-icon-dot-3" />
    </svg>
  );
}

/* ── Typing Indicator ────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="chatbot-msg-row bot">
      <div className="chatbot-avatar bot">
        <ChatBotIcon className="w-3.5 h-3.5" />
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
  const { t } = useTranslation();
  const isDark = theme === "dark";

  const [isOpen, setIsOpen] = useState(false);
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

  /* Welcome message on first open */
  useEffect(() => {
    if (isOpen && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages([
          {
            id: uid(),
            text: welcomeMessage,
            sender: "bot",
            suggestions: initialSuggestions.map((s) => s.text),
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
        const response: ChatResponse = findBestResponse(trimmed);
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
    [isTyping]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
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
              <ChatBotIcon className="w-5 h-5" />
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
                  <ChatBotIcon className="w-3.5 h-3.5" />
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

      {/* ── Floating Action Button ───────────────────────────── */}
      <button
        onClick={toggleChat}
        className={`chatbot-fab ${isOpen ? "active" : ""}`}
        aria-label={isOpen ? t("chatbot.closeAria") : t("chatbot.openAria")}
        id="chatbot-toggle"
      >
        <span className="chatbot-fab-glow" />
        <div className="chatbot-fab-icon">
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <ChatBotIcon className="w-6 h-6" />
          )}
        </div>
        {!isOpen && (
          <span className="chatbot-fab-label">{t("chatbot.fabLabel")}</span>
        )}
      </button>
    </>
  );
}
