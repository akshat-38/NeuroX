"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-2 text-center text-[20px] text-muted-foreground ml-[150px]"
        >
          <div>
            © {new Date().getFullYear()} NeuroX. All rights reserved.
          </div>
          <div className="flex flex-col items-center gap-1 text-sm">
            <span className="text-muted-foreground">
              Built for YUKTI-NIR START-UP CHALLENGE 2025
            </span>
            <span className="font-bold bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
              @aksh
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
