"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, ChevronDown, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function TokenBalance() {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [balance, setBalance] = useState(1250)
  const [isConnected, setIsConnected] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Check if wallet is connected from localStorage
    const walletConnected = localStorage.getItem("walletConnected")
    if (walletConnected === "true") {
      setIsConnected(true)
    }

    // Get balance from localStorage
    const storedBalance = localStorage.getItem("tokenBalance")
    if (storedBalance) {
      setBalance(parseInt(storedBalance))
    } else {
      // Set initial balance
      localStorage.setItem("tokenBalance", "1250")
    }
  }, [])

  const handleTransfer = () => {
    toast("Transfer Initiated", {
      description: "Your NxT tokens are being transferred to your wallet."
    })
  }

  if (!mounted) return null

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        animate={{
          y: [0, -2, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <Card className="transition-all duration-300 ease-in-out border-2 border-purple-500/30 bg-background/60 backdrop-blur-sm hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
          <CardContent className="p-4 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: [0, 10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Coins className="h-6 w-6 mr-3 text-purple-500" />
            </motion.div>
            <span className="font-medium text-lg">
              <span className="text-purple-500">{balance.toLocaleString()}</span> NxT
            </span>
            <motion.div
              animate={{
                rotate: isHovered ? 180 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4 ml-2 text-purple-500" />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="absolute top-full mt-2 w-72 z-50 border-2 border-purple-500/30 bg-background/95 backdrop-blur-sm">
              <CardContent className="p-4 text-sm">
                <div className="flex justify-between mb-3">
                  <span className="text-muted-foreground">Available:</span>
                  <span>{balance.toLocaleString()} NxT</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-muted-foreground">Staked:</span>
                  <span>500 NxT</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-medium">{(balance + 500).toLocaleString()} NxT</span>
                </div>

                <div className="pt-2 border-t border-border">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-sm mt-2 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500/50"
                      onClick={handleTransfer}
                      disabled={!isConnected}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Transfer to Wallet
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
