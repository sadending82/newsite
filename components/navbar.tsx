"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          SadyTrd&apos;s Gallery
        </Link>
        <nav className="flex gap-4">
          <Button variant={pathname === "/" ? "default" : "ghost"} asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant={pathname === "/gallery" ? "default" : "ghost"} asChild>
            <Link href="/gallery">Gallery</Link>
          </Button>
          <Button variant={pathname === "/contact" ? "default" : "ghost"} asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

