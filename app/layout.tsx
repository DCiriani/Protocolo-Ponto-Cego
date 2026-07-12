import type { Metadata, Viewport } from "next";
import { Manrope, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ponto Cego",
  description:
    "Análise clínica personalizada para ajudar você a enxergar os padrões que influenciam seus relacionamentos.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
        />
      </head>

      <body className={`${manrope.variable} ${bodoni.variable}`}>
        {children}
      </body>
    </html>
  );
}