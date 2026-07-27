import type { Metadata } from "next";
import { Rubik, Epilogue } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-epilogue",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://arihantcables.com"),
  title: {
    default:
      "Arihant Cables — Authorised Distributors of Polycab Wires & Cables, Mumbai",
    template: "%s | Arihant Cables",
  },
  description:
    "Arihant Cables — Authorised Distributors of Polycab Wires & Cables in Mumbai for over 30 years. Wide range of high-quality cables ready for immediate dispatch.",
  keywords: [
    "Polycab distributors Mumbai",
    "Polycab cables Mumbai",
    "Polycab wires Mumbai",
    "authorised distributor Polycab",
    "Arihant Cables",
    "cable distributor Mumbai",
    "Lohar Chawl cables",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Arihant Cables",
    title: "Arihant Cables — Authorised Distributors of Polycab Wires & Cables, Mumbai",
    description:
      "Over 30 years of trusted distribution of Polycab Wires & Cables across India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.variable} ${epilogue.variable}`}>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 btn-primary"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
