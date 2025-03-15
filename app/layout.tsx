import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { BackgroundProvider } from "@/components/BackgroundContext"
import BackgroundWrapper from "@/components/BackgroundWrapper"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="ja">
      <body className={`${inter.className} bg-gradient-to-b from-transparent to-white`}>
        <BackgroundProvider>
          <BackgroundWrapper>
            {children}
          </BackgroundWrapper>
        </BackgroundProvider>
      </body>
    </html>
  )
}

