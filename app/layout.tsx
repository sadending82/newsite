import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { inter, japaneseFont } from "@/components/fonts"
import { BackgroundProvider } from "@/components/BackgroundContext"
import BackgroundWrapper from "@/components/BackgroundWrapper"
import {Toaster} from "react-hot-toast"



export const metadata: Metadata = {
  title: "SadyTrd's Memory Box",
  description: "SadyTrdの思い出箱です。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.className} ${japaneseFont.variable}`}>
      <body className={`g-gradient-to-b from-transparent to-white`}>
        <BackgroundProvider>
          <BackgroundWrapper>
            {children}
            <Toaster position="top-center" containerClassName={japaneseFont.className} toastOptions={{duration: 2000}}/>
          </BackgroundWrapper>
        </BackgroundProvider>
      </body>
    </html>
  )
}

