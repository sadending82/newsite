import { Inter } from "next/font/google"
import localFont from "next/font/local"

export const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-english",
    adjustFontFallback: true,
    });
 
 export const japaneseFont = localFont({
   src: "../public/fonts/rounded-l-mplus-1c-regular.ttf",
   display: "swap",
   variable: "--font-japanese",
 });