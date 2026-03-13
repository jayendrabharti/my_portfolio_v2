import localFont from "next/font/local";
import { Manrope, Syne } from "next/font/google";

export const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export const displayFont = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

export const anurati = localFont({
  src: "../public/fonts/anurati.otf",
  variable: "--font-custom",
});
