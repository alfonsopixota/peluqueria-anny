import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "El Frasco de Anny Del Agua | Peluquería de Autor en Jerez",
  description: "Especialistas en coloración, corte y tratamientos capilares de autor en el corazón de Jerez. Una experiencia de lujo para tu cabello.",
  keywords: ["peluquería jerez", "anny del agua", "peluquería de autor", "balayage jerez", "tratamientos capilares"],
  authors: [{ name: "Anny del Agua" }],
  openGraph: {
    title: "El Frasco de Anny Del Agua",
    description: "Tu santuario de belleza en Jerez.",
    url: "https://elfrascodeanny.com",
    siteName: "El Frasco de Anny",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
