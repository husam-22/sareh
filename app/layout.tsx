import type { Metadata } from "next";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: "صَرْح | استشارات عقارية وهندسية وإدارة بناء", template: "%s | صَرْح" },
  description: site.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl" id="top"><body><a className="skip-link" href="#main-content">تجاوز إلى المحتوى</a><Header />{children}<Footer /></body></html>;
}
