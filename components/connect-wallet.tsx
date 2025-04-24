"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

// Add Ethereum provider type declaration
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
    }
  }
}

interface ConnectWalletProps {
  onConnect: (address: string) => void
  className?: string
}

export default function ConnectWallet({ onConnect, className = "" }: ConnectWalletProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)

    try {
      // Check if MetaMask is installed
      if (typeof window !== "undefined" && window.ethereum) {
        // Request account access
        // @ts-ignore
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        if (accounts && accounts.length > 0) {
          onConnect(accounts[0])
        }

        // Store connection state in localStorage
        localStorage.setItem("walletConnected", "true")

        // Show welcome toast with token bonus
        toast("Wallet Connected Successfully!", {
          description: "Welcome to NeuroX! You've received 100 NxT tokens as a welcome bonus."
        })
      } else {
        toast("MetaMask Not Found", {
          description: "Please install MetaMask to connect your wallet",
          style: {
            backgroundColor: "#ef4444",
            color: "white",
            border: "none"
          }
        })
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error)
      toast("Connection Failed", {
        description: "There was an error connecting to your wallet",
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          border: "none"
        }
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 ${className}`}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 bg-white opacity-0"
            animate={{
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </Button>
      </motion.div>
    </div>
  )
}
