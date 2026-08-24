"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fr } from "@/app/data/translations/fr";
import { en } from "@/app/data/translations/en";

export type Locale = "fr" | "en";
export type TranslationKey = string;

type Translations = typeof fr;

const translationsMap: Record<Locale, Translations> = {
  fr,
  en,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
  isFrench: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_locale") as Locale;
      if (saved === "fr" || saved === "en") {
        setLocaleState(saved);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("portfolio_locale", newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "fr" ? "en" : "fr");
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string): string => {
      const currentDict = translationsMap[locale] as unknown as Record<string, unknown>;
      const fallbackDict = translationsMap.fr as unknown as Record<string, unknown>;
      const value = getNestedValue(currentDict, key) ?? getNestedValue(fallbackDict, key);
      return value ?? key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        t,
        isFrench: locale === "fr",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
