"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Shield, Headphones } from "lucide-react"
import TokenBalance from "@/components/token-balance"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { toast } from "sonner"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      toast("Its not ready dude", {
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          border: "none"
        }
      })
    }
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Auditor", path: "/auditor" },
    { name: "About", path: "/about" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 md:px-6 flex h-24 items-center">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Left section with logo */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center"
          >
            <Shield className="h-10 w-10 mr-4 text-purple-500" />
            NeuroX
          </Link>
        </div>

        {/* Center section with token balance */}
        <div className="flex-1 flex justify-center">
          <div className="ml-[150px]">
            <TokenBalance />
          </div>
        </div>

        {/* Right section with theme toggle and nav links */}
        <div className="hidden md:flex md:items-center md:gap-10">
          {/* Theme toggle button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors relative overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute"
              >
                {mounted && (theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />)}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-base font-bold transition-colors hover:text-primary relative py-1",
                  pathname === item.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    layoutId="activeNavItem"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Support Icon */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative group"
          >
            <button
              onClick={() => toast("insta - @akshat__38", {
                style: {
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none"
                }
              })}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Headphones className="h-6 w-6" />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Contact
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <div className="container py-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-lg font-medium py-2 transition-colors hover:text-primary",
                    pathname === item.path ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile theme toggle */}
              <div className="flex items-center justify-between py-2 mt-4 border-t border-border">
                <span className="text-muted-foreground">Theme</span>
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={theme}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
