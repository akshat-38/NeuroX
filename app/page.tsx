"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, FileCode, Lock, Zap, Users, BarChart } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import ConnectWallet from "@/components/connect-wallet"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedText } from "@/components/animated-text"
import CongratsCard from "@/components/congrats-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function LandingPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [showCongrats, setShowCongrats] = useState(false)
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Adjust the scroll range to make components appear and disappear
  const opacity = useTransform(scrollYProgress, 
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [0, 1, 1, 1, 0, 0]
  )
  const y = useTransform(scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [50, 0, 0, 0, 0, -50]
  )

  useEffect(() => {
    // Check if wallet is connected from localStorage
    const walletConnected = localStorage.getItem("walletConnected")
    const address = localStorage.getItem("walletAddress")
    if (walletConnected === "true" && address) {
      setIsConnected(true)
      setWalletAddress(address)
    }
  }, [])

  const handleConnect = (address: string) => {
    setIsConnected(true)
    setWalletAddress(address)
    setShowCongrats(true)
    localStorage.setItem("walletConnected", "true")
    localStorage.setItem("walletAddress", address)
  }

  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full pt-0 pb-12 md:pt-0 md:pb-16 lg:pt-0 lg:pb-20 xl:pb-24 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <AnimatedText />
          <div className="grid gap-4 lg:grid-cols-[1fr_350px] lg:gap-8 xl:grid-cols-[1fr_450px] mt-4">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              style={{ opacity, y }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none animated-gradient-text bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500">
                  Secure Your Smart Contracts with Neural Intelligence
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-2xl">
                  NeuroX uses advanced AI to audit your smart contracts, identifying vulnerabilities before they become
                  exploits.
                </p>
              </div>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.1 }}
                >
                  <Link
                    href="/auditor"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white"
                    prefetch={true}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.5),0_0_0_1px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.7),0_0_0_1px_rgba(255,255,255,0.3)] transition-shadow duration-200"></span>
                    <span className="relative flex items-center transform transition-transform duration-200 group-hover:scale-105">
                      Start Auditing
                      <svg
                        className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.1 }}
                >
                  <Link
                    href="/auditor"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white"
                    prefetch={true}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.5),0_0_0_1px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(234,88,12,0.7),0_0_0_1px_rgba(255,255,255,0.3)] transition-shadow duration-200"></span>
                    <span className="relative flex items-center transform transition-transform duration-200 group-hover:scale-105">
                      Bet
                      <svg
                        className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center mt-4"
              style={{ opacity, y }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-[370px] h-[485px]">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="animate-float"
                >
                  <Card className="w-full h-full backdrop-blur-sm border border-white/10 bg-black/40 rounded-3xl overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                      <motion.div
                        className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center mb-6 glow"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(168, 85, 247, 0.5)",
                            "0 0 30px rgba(34, 211, 238, 0.5)",
                            "0 0 20px rgba(168, 85, 247, 0.5)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Shield className="h-12 w-12 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-center mb-3 glow-text">Neural Contract Shield</h3>
                      <p className="text-center text-muted-foreground text-base">
                        Advanced protection powered by neural networks
                      </p>
                      {!isConnected ? (
                        <div className="flex flex-col items-center">
                          <ConnectWallet onConnect={handleConnect} className="mt-6 text-lg px-8 py-6" />
                          <p className="text-base text-purple-400 mt-2">[ & Get 100NxT ]</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Button variant="outline" className="mt-6 border-purple-500/50 text-lg px-8 py-6">
                            Connected
                          </Button>
                          <p className="text-base text-purple-400 mt-2">[ " {truncateAddress(walletAddress)} " ]</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
            style={{ opacity, y }}
            transition={{ delay: 0.3 }}
          >
            {[
              { icon: Shield, value: "500+", label: "Contracts Audited" },
              { icon: FileCode, value: "$10M+", label: "Assets Protected" },
              { icon: Users, value: "2,500+", label: "Active Users" },
              { icon: BarChart, value: "99.8%", label: "Accuracy Rate" },
            ].map((stat, index) => (
              <motion.div key={index} className="flex flex-col items-center text-center p-4">
                <div className="mb-2 rounded-full p-2 bg-purple-500/10">
                  <stat.icon className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            style={{ opacity, y }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight animated-gradient-text bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500">
                Advanced Smart Contract Security
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our neural network identifies vulnerabilities that traditional auditors miss.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8"
            style={{ opacity, y }}
            transition={{ delay: 0.5 }}
          >
            {[
              {
                title: "Neural Analysis",
                description: "Our AI scans your code for vulnerabilities using advanced pattern recognition.",
                icon: <Zap className="h-10 w-10 text-purple-500" />,
              },
              {
                title: "Code Verification",
                description: "Verify your smart contract against known exploits and vulnerabilities.",
                icon: <FileCode className="h-10 w-10 text-cyan-500" />,
              },
              {
                title: "Secure Deployment",
                description: "Get recommendations for secure deployment and best practices.",
                icon: <Lock className="h-10 w-10 text-purple-500" />,
              },
            ].map((feature, index) => (
              <motion.div key={index}>
                <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Card className="backdrop-blur-sm border border-white/10 bg-black/40 h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <motion.div
                        className="mb-4 rounded-full p-2 bg-muted"
                        whileHover={{ rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            style={{ opacity, y }}
            transition={{ delay: 0.6 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight animated-gradient-text bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500">
                Ready to Secure Your Smart Contracts?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Start your first audit today and protect your blockchain assets.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/auditor" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white" prefetch={true}>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.5),0_0_0_1px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.7),0_0_0_1px_rgba(255,255,255,0.3)] transition-shadow duration-200"></span>
                  <span className="relative flex items-center transform transition-transform duration-200 group-hover:scale-105">
                    Start Auditing
                    <svg
                      className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/auditor" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white" prefetch={true}>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.5),0_0_0_1px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_25px_rgba(234,88,12,0.7),0_0_0_1px_rgba(255,255,255,0.3)] transition-shadow duration-200"></span>
                <span className="relative flex items-center transform transition-transform duration-200 group-hover:scale-105">
                  Bet
                  <svg
                    className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <CongratsCard isOpen={showCongrats} onClose={() => setShowCongrats(false)} />
    </div>
  )
}
