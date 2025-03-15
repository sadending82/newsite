import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SadyTrd's Site",
  description: "SadyTrdのウェブサイトです。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-gradient-to-b from-transparent to-white`}>
        <div className="bg-[url('/Images/ID1.png?height=1080&width=1920')] bg-cover bg-center min-h-screen">
          <div className="bg-[url('/Images/ID3.png?height=1080&width=1920')] bg-cover bg-center min-h-screen bg-fixed">
            <div className="bg-white bg-opacity-80 min-h-screen">
              <Navbar />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

