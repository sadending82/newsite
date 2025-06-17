"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery"},
  { href: "/contact", label: "Contact"},
  { href: "/faq", label: "FAQ" },
  { href: "/updates", label: "Updates"}
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 w-full bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-500">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Sady&apos;s Memory Box
        </Link>


        <nav className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Button key={item.href} variant={pathname === item.href ? "default" : "ghost"}>
              <Link key={item.href} href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
          <Menu className = "h-5 w-5"/>
          <span className="sr-only">Open Menu</span>
        </Button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial= {{ opacity: 0 }}
                animate= {{ opacity: 1 }}
                exit= {{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/50"
                onClick={toggleMobileMenu}
              />

              <motion.div
                initial={{ x: "100%"}}
                animate={{ x: 0 }}
                exit={{ x: "100%"}}
                transition={{ type: "spring", damping: 25, stiffeness: 200 }}
                className="md:hidden fixed right-0 top-0 h-screen bg-white w-64 flex flex-col"
              >
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="font-semibold">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col p-4 space-y-4 bg-white ">
                  {navItems.map((item) => (
                    <Button key={item.href} variant={pathname === item.href ? "default" : "ghost"}>
                      <Link key={item.href} href={item.href}>{item.label}</Link>
                    </Button>
                  ))}
                </nav>
              </motion.div>
              </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

