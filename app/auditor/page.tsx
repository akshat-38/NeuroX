"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, FileCode, AlertTriangle, CheckCircle, Coins, Info, ArrowRight, Shield, Upload, Star, Zap, Crown, Lock, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import Link from "next/link"
import ConnectWallet from "@/components/connect-wallet"

export default function AuditorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditComplete, setAuditComplete] = useState(false)
  const [isBetting, setIsBetting] = useState(false)
  const [betAmount, setBetAmount] = useState(10)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [tokenBalance, setTokenBalance] = useState(1250) // Default balance
  const [showTransferMessage, setShowTransferMessage] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro' | 'xpert' | null>(null)
  const [showXpertConfirm, setShowXpertConfirm] = useState(false)
  const [showProConfirm, setShowProConfirm] = useState(false)
  const [proFreeTests, setProFreeTests] = useState(5)

  useEffect(() => {
    // Check if wallet is connected from localStorage
    const walletConnected = localStorage.getItem("walletConnected")
    if (walletConnected === "true") {
      setIsWalletConnected(true)
    }

    // Get token balance from localStorage
    const balance = localStorage.getItem("tokenBalance")
    if (balance) {
      setTokenBalance(parseInt(balance))
    }

    // Get remaining free tests from localStorage
    const freeTests = localStorage.getItem("proFreeTests")
    if (freeTests) {
      setProFreeTests(parseInt(freeTests))
    }
  }, [])

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleAudit = () => {
    if (!file) return
    if (!selectedPlan) {
      toast("Select a Plan", {
        description: "Please select an audit plan to continue.",
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          border: "none"
        }
      })
      return
    }

    setIsAuditing(true)

    // Simulate audit process
    setTimeout(() => {
      setIsAuditing(false)
      setAuditComplete(true)

      if (isBetting) {
        toast("Audit Complete with Betting", {
          description: `Your bet of ${betAmount} NxT tokens has been placed.`
        })
      } else {
        toast("Audit Complete", {
          description: "Your smart contract has been analyzed successfully."
        })
      }
    }, 3000)
  }

  const handleBetToggle = () => {
    if (!isWalletConnected) {
      toast("Wallet Not Connected", {
        description: "Please connect your wallet to place bets.",
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          border: "none"
        }
      })
      return
    }

    setIsBetting(!isBetting)
  }

  const handleConnect = (address: string) => {
    setWalletAddress(address)
    setIsWalletConnected(true)
    localStorage.setItem("walletConnected", "true")
  }

  const truncateAddress = (address: string) => {
    return address.slice(0, 6) + "..." + address.slice(-4)
  }

  const handleTransfer = () => {
    setShowTransferMessage(true)
    setTimeout(() => {
      setShowTransferMessage(false)
    }, 3000)
  }

  const handleXpertSelect = () => {
    if (!isWalletConnected) {
      toast("Wallet Not Connected", {
        description: "Please connect your wallet to select the Xpert plan.",
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          border: "none"
        }
      });
      return;
    }
    setShowXpertConfirm(true);
  };

  const handleXpertConfirm = () => {
    if (tokenBalance < 200) {
      toast("Insufficient Balance", {
        description: "You need 200 NxT tokens to select the Xpert plan.",
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          border: "none"
        }
      });
      return;
    }
    setTokenBalance(prev => prev - 200);
    setSelectedPlan('xpert');
    setShowXpertConfirm(false);
    toast("Xpert Plan Selected", {
      description: "200 NxT tokens have been deducted from your balance.",
      style: {
        backgroundColor: "#22c55e",
        color: "white",
        border: "none"
      }
    });
  };

  const handleProSelect = () => {
    if (proFreeTests > 0) {
      setSelectedPlan('pro')
      setShowProConfirm(true)
    } else {
      toast("No Free Tests Remaining", {
        description: "You've used all your free tests. Please use NxT tokens for further audits.",
        style: {
          backgroundColor: "#ef4444",
          color: "white",
          border: "none"
        }
      })
    }
  }

  const handleProConfirm = () => {
    const newTestCount = proFreeTests - 1
    setProFreeTests(newTestCount)
    localStorage.setItem("proFreeTests", newTestCount.toString())
    setShowProConfirm(false)
    toast("Pro Plan Selected", {
      description: `${newTestCount} free tests remaining.`,
      style: {
        backgroundColor: "#22c55e",
        color: "white",
        border: "none"
      }
    })
  }

  return (
    <div className="w-full py-4 px-4 md:px-8 md:py-8">
      <motion.div
        className="flex flex-col items-center text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 via-purple-400 to-cyan-600 bg-clip-text text-transparent">
            Smart Contract Auditor
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-400 max-w-[800px]">
          Upload your smart contract file and our neural network will analyze it for vulnerabilities
        </p>
      </motion.div>

      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-center gap-3 mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Choose Your Plan &nbsp;:
          </h2>
                          <Dialog>
                            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full p-1.5 hover:bg-white/5 transition-colors group"
              >
                <HelpCircle className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
                              </Button>
                            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] bg-black/95 border-purple-500/20">
              <DialogHeader className="pb-4">
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Tiered Audit Plans (Smart & Scalable)
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Choose the perfect AI-powered audit tier for your smart contract needs
                                </DialogDescription>
                              </DialogHeader>
              <div className="overflow-y-auto pr-6 -mr-6 max-h-[60vh] space-y-6 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                {/* Basic Plan Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Star className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-400">Basic Plan (Free Tier)</h3>
                      <p className="text-xs text-purple-300">Perfect for small contracts and quick scans</p>
                    </div>
                                      </div>
                  <div className="pl-11">
                    <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                          Quick scan for small contracts
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                          Syntax error detection
                                    </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                          Naming improvements suggestions
                                    </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                          Minor logic flaw detection
                                    </li>
                                  </ul>
                      <div className="mt-3 pt-3 border-t border-purple-500/20 space-y-1.5">
                        <div className="flex items-center gap-2 text-purple-300 text-xs">
                          <FileCode className="h-3.5 w-3.5" />
                          Limit: 1 file per audit
                        </div>
                        <div className="flex items-center gap-2 text-purple-300 text-xs">
                          <Coins className="h-3.5 w-3.5" />
                          Betting cap: max 500 NxT tokens
                          </div>
                      </div>
                                </div>
                                </div>
                              </div>

                {/* Pro Plan Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-cyan-400" />
                                </div>
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400">Pro Plan (Freemium Tier)</h3>
                      <p className="text-xs text-cyan-300">Ideal for medium-sized codebases</p>
                                </div>
                              </div>
                  <div className="pl-11">
                    <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/20">
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                          Full ERC-20/721 contract analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                          Medium-sized codebase support
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                          All features from Basic tier
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                          Enhanced betting capabilities
                        </li>
                      </ul>
                      <div className="mt-3 pt-3 border-t border-cyan-500/20 space-y-1.5">
                        <div className="flex items-center gap-2 text-cyan-300 text-xs">
                          <Zap className="h-3.5 w-3.5" />
                          First 5 audits free
                        </div>
                        <div className="flex items-center gap-2 text-cyan-300 text-xs">
                          <Coins className="h-3.5 w-3.5" />
                          Pay with NxT tokens after free audits
                            </div>
                      </div>
                    </div>
                        </div>
                      </div>

                {/* Xpert Plan Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Crown className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400">Xpert Plan (Pro Tier)</h3>
                      <p className="text-xs text-yellow-300">For complex contract systems and professional teams</p>
                    </div>
                      </div>
                  <div className="pl-11">
                    <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/20">
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0" />
                          Multiple file support (entire contract systems)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0" />
                          AI-powered logic flaw explanations
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0" />
                          Detailed gas optimization suggestions
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-yellow-400 flex-shrink-0" />
                          Complex audit job support
                        </li>
                      </ul>
                      <div className="mt-3 pt-3 border-t border-yellow-500/20 space-y-1.5">
                        <div className="flex items-center gap-2 text-yellow-300 text-xs">
                          <Lock className="h-3.5 w-3.5" />
                          Premium tier - NxT tokens required
                        </div>
                        <div className="flex items-center gap-2 text-yellow-300 text-xs">
                          <Coins className="h-3.5 w-3.5" />
                          Highest token betting potential
                        </div>
                      </div>
                    </div>
                          </div>
                        </div>
                      </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8 mt-8 mb-24">
          {/* Basic Plan */}
          <Card className={cn(
            "backdrop-blur-sm border rounded-2xl transition-all duration-300 relative overflow-hidden bg-[#12071f]",
            selectedPlan === 'basic' 
              ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]" 
              : "border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:scale-105"
          )}>
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 backdrop-blur-md">
                  <Star className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Basic</h3>
                <p className="text-3xl font-bold mb-8">Free</p>
                <ul className="text-left space-y-6 mb-8 w-full">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                    <span className="text-white">Basic vulnerability scan</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                    <span className="text-white">Common issues detection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0" />
                    <span className="text-white">Basic report generation</span>
                  </li>
                </ul>
                {/* Basic Plan Button */}
                {selectedPlan === 'basic' ? (
                  <Link href="/upload?plan=basic" className="w-full">
                        <Button
                      className="w-full text-lg py-6 relative overflow-hidden group bg-gradient-to-r from-purple-600 to-purple-900"
                    >
                      Proceed to Upload
                          </Button>
                        </Link>
                ) : (
                  <Button 
                    onClick={() => setSelectedPlan('basic')}
                    className="w-full text-lg py-6 relative overflow-hidden group bg-purple-500/10 hover:bg-purple-500/20 border-0"
                  >
                    Select Plan
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className={cn(
            "backdrop-blur-sm border rounded-2xl transition-all duration-300 relative transform scale-110 z-10 overflow-visible bg-[#011B2B]",
            selectedPlan === 'pro' 
              ? "border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.4)]" 
              : "border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] hover:scale-115"
          )}>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white px-6 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] border border-cyan-300/50 backdrop-blur-xl">
                RECOMMENDED
              </div>
                      </div>
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent pointer-events-none" />
            <CardContent className="p-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 flex items-center justify-center mb-6 backdrop-blur-md">
                  <Zap className="h-7 w-7 text-cyan-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Pro</h3>
                <p className="text-3xl font-bold mb-8 text-white">
                  {proFreeTests}/{5} Free Tests
                </p>
                <ul className="text-left space-y-6 mb-8 w-full">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-300 flex-shrink-0" />
                    <span className="text-white">All Basic features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-300 flex-shrink-0" />
                    <span className="text-white">Priority scanning</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-300 flex-shrink-0" />
                    <span className="text-white">Detailed analysis report</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-300 flex-shrink-0" />
                    <span className="text-white">Code optimization tips</span>
                  </li>
                </ul>
                {/* Pro Plan Button */}
                {selectedPlan === 'pro' ? (
                  <Link href="/upload?plan=pro" className="w-full">
                    <Button 
                      className="w-full text-lg py-6 relative overflow-hidden group bg-gradient-to-r from-cyan-400 to-purple-400"
                    >
                      Proceed to Upload
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={handleProSelect}
                    className="w-full text-lg py-6 relative overflow-hidden group bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border-0"
                  >
                    <span className="text-xl font-semibold text-cyan-300">
                      Select Plan {proFreeTests > 0 ? `(${proFreeTests} Free Left)` : '(Paid)'}
                    </span>
                  </Button>
              )}
            </div>
          </CardContent>
        </Card>

          {/* Xpert Plan */}
          <Card className={cn(
            "backdrop-blur-sm border rounded-2xl transition-all duration-300 relative overflow-visible bg-[#1B1600]",
            selectedPlan === 'xpert' 
              ? "border-yellow-400 shadow-[0_0_40px_rgba(234,179,8,0.4)]" 
              : "border-yellow-400/30 shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:shadow-[0_0_40px_rgba(234,179,8,0.25)] hover:scale-105"
          )}>
            <div className="absolute -top-4 -right-4 z-20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.6)] border-2 border-yellow-300/50 backdrop-blur-xl transform hover:scale-110 transition-transform duration-200">
                <Crown className="h-6 w-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/20 via-orange-500/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/30 via-transparent to-transparent pointer-events-none" />
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 flex items-center justify-center mb-6 backdrop-blur-md">
                  <Crown className="h-6 w-6 text-yellow-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Xpert</h3>
                <p className="text-3xl font-bold mb-8 text-white">Pay per Use</p>
                <ul className="text-left space-y-6 mb-8 w-full">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white">All Pro features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white">Advanced vulnerability detection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white">Custom report formats</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white">Priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-white">Unlimited retests</span>
                  </li>
                </ul>
                {/* Xpert Plan Button */}
                {selectedPlan === 'xpert' ? (
                  <Link href="/upload?plan=xpert" className="w-full">
                    <Button 
                      className="w-full text-lg py-6 relative overflow-hidden group bg-gradient-to-r from-yellow-400 to-orange-400"
                    >
                      Proceed to Upload
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={handleXpertSelect}
                    className="w-full text-lg py-6 relative overflow-hidden group bg-gradient-to-r from-yellow-400/20 to-orange-400/20 hover:from-yellow-400/30 hover:to-orange-400/30 border-0"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Lock className="h-5 w-5 text-yellow-300" />
                      <span className="text-xl font-semibold text-yellow-300">
                        Select Plan
                      </span>
                    </div>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showProConfirm} onOpenChange={setShowProConfirm}>
        <DialogContent className="sm:max-w-[400px] bg-black/95 border-cyan-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Confirm Pro Plan
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Use one of your free tests
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-300">Free Tests Remaining</span>
                <span className="text-xl font-bold text-cyan-300">{proFreeTests}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              This will use one of your free tests. After using all free tests, you'll need NxT tokens for further audits.
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setShowProConfirm(false)}
              variant="outline"
              className="border-cyan-500/20 hover:bg-cyan-500/10 text-cyan-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleProConfirm}
              className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white hover:opacity-90"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showXpertConfirm} onOpenChange={setShowXpertConfirm}>
        <DialogContent className="sm:max-w-[400px] bg-black/95 border-yellow-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Confirm Xpert Plan
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Unlock premium features with our Xpert plan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-300">Cost</span>
                <span className="text-xl font-bold text-yellow-300">200 NxT</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-yellow-300">Your Balance</span>
                <span className="text-lg text-yellow-300">{tokenBalance} NxT</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              By confirming, 200 NxT tokens will be deducted from your balance.
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setShowXpertConfirm(false)}
              variant="outline"
              className="border-yellow-500/20 hover:bg-yellow-500/10 text-yellow-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleXpertConfirm}
              disabled={tokenBalance < 200 || !isWalletConnected}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:opacity-90"
            >
              Confirm & Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
