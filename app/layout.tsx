import "./globals.css";
import "./pokedex.css";
import React from "react";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "Pokédex — browse Pokémon by type",
    template: "%s | Pokédex",
  },
  description:
    "Browse Pokémon by type with artwork, stats, and evolution chains powered by PokéAPI.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    type: "website",
    title: "Pokédex",
    description:
      "Browse Pokémon by type with artwork, stats, and evolution chains.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pokédex",
    description: "Browse Pokémon by type using PokéAPI data.",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Web Browser",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/pokemon-solid"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${roboto.variable} ${roboto.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />
          {children}
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
