import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import "@/styles/print.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import { BetaFeedbackButton } from "@/components/BetaFeedbackButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProfStudio - Générateur de Cartes à Tâches PFEQ",
  description: "Créez des cartes éducatives alignées au Programme de Formation de l'École Québécoise avec notre IA spécialisée",
  keywords: "PFEQ, cartes à tâches, éducation québécoise, enseignement primaire, générateur pédagogique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${quicksand.variable} font-sans antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
            <Toaster position="top-right" richColors />
            <BetaFeedbackButton />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}