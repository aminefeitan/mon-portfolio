"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { findBestResponse, ChatResponse } from "@/app/lib/chatbotEngine";
import { welcomeMessage, initialSuggestions } from "@/app/data/chatbotData";
import { useTheme } from "./ThemeProvider";

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

/* ── Typing Indicator ────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="chatbot-msg-row bot">
      <div className="chatbot-avatar bot">
        <Bot className="w-3.5 h-3.5" />
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
              <Bot className="w-5 h-5" />
              <span className="chatbot-status-dot" />
            </div>
            <div>
              <h3 className="chatbot-header-name">Assistant d&apos;Amine</h3>
              <span className="chatbot-header-status">En ligne · Répond instantanément</span>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="chatbot-close-btn"
            aria-label="Fermer le chat"
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
                  <Bot className="w-3.5 h-3.5" />
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
            placeholder="Posez votre question..."
            className="chatbot-input"
            disabled={isTyping}
          />
          <button
            type="submit"
            className="chatbot-send-btn"
            disabled={!input.trim() || isTyping}
            aria-label="Envoyer le message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* ── Floating Action Button ───────────────────────────── */}
      <button
        onClick={toggleChat}
        className={`chatbot-fab ${isOpen ? "active" : ""}`}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
        id="chatbot-toggle"
      >
        <div className="chatbot-fab-icon">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </div>
        {!isOpen && !hasOpenedRef.current && (
          <span className="chatbot-fab-badge">1</span>
        )}
      </button>
    </>
  );
}
