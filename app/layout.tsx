import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import { LanguageProvider } from "./lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amine-rachidi.dev"),
  title: {
    default: "Amine Rachidi | Élève en Ingénierie Logicielle",
    template: "%s | Amine Rachidi",
  },
  description:
    "Portfolio d'Amine Rachidi, élève en 2ème année du cycle ingénieur à l'ENSIASD Taroudannt. Spécialisé en développement Full Stack, analyse territoriale et solutions logicielles (React, Next.js, Spring Boot, FastAPI, Python).",
  keywords: [
    "Amine Rachidi",
    "Ingénieur Logiciel",
    "Full Stack Developer",
    "ENSIASD Taroudannt",
    "React",
    "Next.js",
    "Spring Boot",
    "FastAPI",
    "Python",
    "Portfolio",
    "Maroc",
  ],
  authors: [{ name: "Amine Rachidi", url: "https://github.com/aminefeitan" }],
  creator: "Amine Rachidi",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://amine-rachidi.dev",
    title: "Amine Rachidi | Élève en Ingénierie Logicielle",
    description:
      "Portfolio d'Amine Rachidi, élève en 2ème année du cycle ingénieur à l'ENSIASD Taroudannt. Découvrez ses projets Full Stack, son parcours et ses compétences.",
    siteName: "Amine Rachidi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amine Rachidi | Élève en Ingénierie Logicielle",
    description:
      "Portfolio d'Amine Rachidi — Projets Full Stack, analyse territoriale et solutions numériques.",
    creator: "@aminefeitan",
  },
};

/* Inline script to prevent flash of wrong theme (runs before paint) */
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
