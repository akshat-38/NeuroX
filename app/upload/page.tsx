"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileUp, FileCode, AlertTriangle, CheckCircle, Coins, Info, ArrowRight, Shield, Upload, Star, Zap, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSearchParams, useRouter } from 'next/navigation'
import Link from "next/link"

export default function UploadPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedPlan = searchParams.get('plan')
  
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditComplete, setAuditComplete] = useState(false)
  const [isBetting, setIsBetting] = useState(false)
  const [betAmount, setBetAmount] = useState(10)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [tokenBalance, setTokenBalance] = useState(1250)

  useEffect(() => {
    if (!selectedPlan) {
      router.push('/auditor')
    }
    
    const walletConnected = localStorage.getItem("walletConnected")
    if (walletConnected === "true") {
      setIsWalletConnected(true)
    }

    const balance = localStorage.getItem("tokenBalance")
    if (balance) {
      setTokenBalance(parseInt(balance))
    }
  }, [selectedPlan, router])

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

  const handleAudit = () => {
    if (!file) return

    setIsAuditing(true)

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

  const getPlanIcon = () => {
    switch (selectedPlan) {
      case 'basic':
        return <Star className="h-6 w-6 text-purple-400" />
      case 'pro':
        return <Zap className="h-6 w-6 text-cyan-400" />
      case 'xpert':
        return <Crown className="h-6 w-6 text-yellow-400" />
      default:
        return null
    }
  }

  const getPlanColor = () => {
    switch (selectedPlan) {
      case 'basic':
        return 'from-purple-400 to-purple-600'
      case 'pro':
        return 'from-cyan-400 to-cyan-600'
      case 'xpert':
        return 'from-yellow-400 to-orange-400'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  const getPlanName = () => {
    switch (selectedPlan) {
      case 'basic':
        return 'Basic Plan'
      case 'pro':
        return 'Pro Plan'
      case 'xpert':
        return 'Xpert Plan'
      default:
        return 'Unknown Plan'
    }
  }

  return (
    <div className="w-full py-8 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Selected Plan Banner */}
        <div className="mb-12">
          <div className={cn(
            "flex items-center justify-between p-2 rounded-2xl relative group",
            selectedPlan === 'basic' ? "bg-gradient-to-r from-purple-500/10 via-purple-400/5 to-purple-500/10" :
            selectedPlan === 'pro' ? "bg-gradient-to-r from-cyan-500/10 via-purple-400/5 to-cyan-500/10" :
            "bg-gradient-to-r from-yellow-500/10 via-orange-400/5 to-yellow-500/10"
          )}>
            {/* Animated border gradient */}
            <div className={cn(
              "absolute inset-0 rounded-2xl opacity-75 blur-sm transition-opacity duration-500 group-hover:opacity-100",
              selectedPlan === 'basic' ? "bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500" :
              selectedPlan === 'pro' ? "bg-gradient-to-r from-cyan-500 via-purple-400 to-cyan-500" :
              "bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-500"
            )} />

            {/* Inner content container */}
            <div className="relative w-full bg-black/90 backdrop-blur-xl rounded-xl p-6 flex items-center justify-between">
              {/* Left side with icon and plan details */}
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300",
                  selectedPlan === 'basic' ? "bg-purple-500/20" :
                  selectedPlan === 'pro' ? "bg-cyan-500/20" :
                  "bg-yellow-500/20"
                )}>
                  {/* Icon glow effect */}
                  <div className={cn(
                    "absolute inset-0 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300",
                    selectedPlan === 'basic' ? "bg-purple-500/30" :
                    selectedPlan === 'pro' ? "bg-cyan-500/30" :
                    "bg-yellow-500/30"
                  )} />
                  <div className="relative">
                    {getPlanIcon()}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className={cn(
                    "text-sm font-medium",
                    selectedPlan === 'basic' ? "text-purple-400/70" :
                    selectedPlan === 'pro' ? "text-cyan-400/70" :
                    "text-yellow-400/70"
                  )}>
                    Selected Plan
                  </div>
                  <div className={cn(
                    "text-3xl font-bold tracking-tight",
                    selectedPlan === 'basic' ? "bg-gradient-to-br from-purple-300 to-purple-500 bg-clip-text text-transparent" :
                    selectedPlan === 'pro' ? "bg-gradient-to-br from-cyan-300 to-cyan-500 bg-clip-text text-transparent" :
                    "bg-gradient-to-br from-yellow-300 to-orange-500 bg-clip-text text-transparent"
                  )}>
                    {getPlanName()}
                  </div>
                </div>
              </div>

              {/* Change plan button */}
              <Link href="/auditor">
                <Button 
                  variant="outline" 
                  className={cn(
                    "relative px-6 h-11 font-medium transition-all duration-300 border backdrop-blur-2xl",
                    selectedPlan === 'basic' ? 
                      "bg-purple-500/5 border-purple-400/20 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400/40" :
                    selectedPlan === 'pro' ? 
                      "bg-cyan-500/5 border-cyan-400/20 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/40" :
                      "bg-yellow-500/5 border-yellow-400/20 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-400/40"
                  )}
                >
                  Change Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Upload Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="backdrop-blur-sm border border-white/10 bg-black/80 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300">
            <CardContent className="p-8">
              <div
                className={cn(
                  "flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-white/10 rounded-xl bg-black/40",
                  isDragging ? "border-purple-500 bg-purple-500/5" : "",
                  isAuditing ? "opacity-50" : ""
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!file ? (
                  <div className="flex flex-col items-center text-center p-8">
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <Upload className="h-16 w-16 text-muted-foreground mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-4">Upload Smart Contract</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Drag and drop your smart contract file here, or click to browse
                    </p>
                    <input
                      type="file"
                      id="contract-upload"
                      className="hidden"
                      accept=".sol,.json"
                      onChange={handleFileChange}
                      disabled={isAuditing}
                    />
                    <Button
                      variant="outline"
                      className="bg-black/40 border-white/10 hover:bg-black/60 text-lg px-8 py-6"
                      onClick={() => document.getElementById("contract-upload")?.click()}
                      disabled={isAuditing}
                    >
                      Browse Files
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-6 p-8">
                    <FileCode className="h-20 w-20 text-purple-500" />
                    <h3 className="text-2xl font-medium">{file.name}</h3>
                    <p className="text-lg text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>

                    {/* Betting Controls */}
                    <div className="flex flex-col w-full max-w-md gap-6">
                      <div className="flex items-center justify-between p-6 backdrop-blur-sm border border-white/10 bg-black/40 rounded-lg">
                        <div className="flex items-center">
                          <Button
                            variant={isBetting ? "default" : "outline"}
                            size="default"
                            onClick={handleBetToggle}
                            className={cn(
                              "relative overflow-hidden text-lg",
                              isBetting ? "bg-gradient-to-r from-purple-600 to-cyan-600" : "",
                              auditComplete ? "opacity-50 cursor-not-allowed" : ""
                            )}
                            disabled={auditComplete}
                          >
                            <Coins className="h-5 w-5 mr-2" />
                            Betting {isBetting ? "On" : "Off"}
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-3 h-10 w-10">
                                <Info className="h-5 w-5" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>About Betting</DialogTitle>
                                <DialogDescription>
                                  Place a bet with your NxT tokens on the security of your smart contract.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-3">
                                  <h4 className="font-medium">How it works:</h4>
                                  <ul className="space-y-3 text-base">
                                    <li className="flex items-start">
                                      <div className="mr-3 mt-0.5 h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                      </div>
                                      <span>
                                        <strong>Green card:</strong> Double your tokens for secure contracts
                                      </span>
                                    </li>
                                    <li className="flex items-start">
                                      <div className="mr-3 mt-0.5 h-4 w-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                                      </div>
                                      <span>
                                        <strong>Orange card:</strong> Get half your tokens back for minor issues
                                      </span>
                                    </li>
                                    <li className="flex items-start">
                                      <div className="mr-3 mt-0.5 h-4 w-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <AlertTriangle className="h-3 w-3 text-red-500" />
                                      </div>
                                      <span>
                                        <strong>Red card:</strong> Lose your bet for vulnerable contracts
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {isBetting && (
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-medium">{betAmount} NxT</span>
                          </div>
                        )}
                      </div>

                      <AnimatePresence>
                        {isBetting && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 backdrop-blur-sm border border-white/10 bg-black/40 rounded-lg space-y-6">
                              <div className="space-y-4">
                                <div className="flex justify-between">
                                  <span className="text-lg">Bet Amount:</span>
                                  <span className="text-lg font-medium">{betAmount} NxT</span>
                                </div>
                                <div className="mt-4">
                                  <label className="text-lg font-medium mb-3 block">Bet Amount</label>
                                  <input
                                    type="range"
                                    min="10"
                                    max={tokenBalance}
                                    step="5"
                                    className={cn(
                                      "w-full h-2",
                                      auditComplete ? "opacity-50 cursor-not-allowed" : ""
                                    )}
                                    value={betAmount}
                                    onChange={(e) => setBetAmount(Number(e.target.value))}
                                    disabled={auditComplete}
                                  />
                                  <div className="text-lg text-muted-foreground mt-3">
                                    {betAmount} tokens
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        className="bg-black/40 border-white/10 hover:bg-black/60 text-lg px-8 py-6 font-bold"
                        onClick={() => {
                          setFile(null)
                          setAuditComplete(false)
                          setIsBetting(false)
                        }}
                      >
                        Remove File
                      </Button>
                      <Button
                        onClick={handleAudit}
                        className={cn(
                          "bg-gradient-to-r text-lg px-8 py-6 font-bold",
                          getPlanColor(),
                          auditComplete ? "opacity-50 cursor-not-allowed" : ""
                        )}
                        disabled={auditComplete}
                      >
                        {isBetting ? "Audit & Bet" : "Audit Contract"}
                      </Button>
                    </div>
                  </div>
                )}

                {isAuditing && (
                  <div className="flex flex-col items-center mt-6">
                    <div className="relative w-20 h-20">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <div className="w-full h-full rounded-full border-4 border-t-purple-500 border-r-cyan-500 border-b-purple-500 border-l-cyan-500 border-t-transparent" />
                      </motion.div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileCode className="h-8 w-8 text-purple-500" />
                      </div>
                    </div>
                    <h4 className="text-2xl font-medium mt-6">Analyzing Contract</h4>
                    <p className="text-lg text-muted-foreground mt-2">This may take a few moments...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* How it Works Card */}
          <Card className="backdrop-blur-sm border border-white/10 bg-black/80 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300">
            <CardContent className="p-8 h-full">
              <div className="flex flex-col space-y-8 h-full">
                <div>
                  <h2 className="text-2xl font-bold mb-6">How it Works</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-base">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Place Your Bet</h3>
                        <p className="text-muted-foreground text-sm">Use your NxT tokens to bet on contract audits</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-semibold text-base">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Audit Contracts</h3>
                        <p className="text-muted-foreground text-sm">Our AI analyzes the smart contract for vulnerabilities</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-base">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Earn Rewards</h3>
                        <p className="text-muted-foreground text-sm">Get rewarded with more NxT tokens for successful audits</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Stats Section */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Your Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-purple-900/20 backdrop-blur-sm border border-purple-500/20">
                      <div className="text-sm text-muted-foreground mb-2">Total Bets</div>
                      <div className="text-2xl font-bold">0</div>
                    </div>
                    <div className="p-4 rounded-lg bg-cyan-900/20 backdrop-blur-sm border border-cyan-500/20">
                      <div className="text-sm text-muted-foreground mb-2">Earnings</div>
                      <div className="text-2xl font-bold">0 NxT</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Results */}
        <AnimatePresence>
          {auditComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
              ref={(el) => {
                if (el && auditComplete) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              <Card className="backdrop-blur-sm border border-white/10 bg-black/80 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                      <AlertTriangle className="h-10 w-10 text-yellow-500" />
                    </div>
                    <h4 className="text-2xl font-medium mb-2">Audit Complete</h4>
                    <p className="text-lg text-muted-foreground mb-6">2 potential vulnerabilities found</p>

                    {isBetting && (
                      <div className="w-full max-w-2xl p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-6 text-center">
                        <h5 className="text-xl font-medium mb-2">Betting Result: Orange Card</h5>
                        <p className="text-base text-muted-foreground">
                          You get {Math.floor(betAmount / 2)} NxT tokens back
                        </p>
                      </div>
                    )}

                    <div className="w-full max-w-2xl space-y-4">
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-left">
                        <div className="flex items-start">
                          <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="text-lg font-medium mb-2">Reentrancy Risk</h5>
                            <p className="text-sm text-muted-foreground">Line 142: Consider using ReentrancyGuard</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-left">
                        <div className="flex items-start">
                          <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                          <div>
                            <h5 className="text-lg font-medium mb-2">Unchecked Return Value</h5>
                            <p className="text-sm text-muted-foreground">
                              Line 217: External call return value not checked
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 w-full mt-6">
                        <Button
                          variant="outline"
                          className="flex-1 bg-black/40 border-white/10 hover:bg-black/60 text-xl px-8 py-6"
                          onClick={() => {
                            setFile(null)
                            setAuditComplete(false)
                            setIsBetting(false)
                          }}
                        >
                          New Audit
                        </Button>
                        <Link href="/results" className="flex-1">
                          <Button className="w-full bg-gradient-to-r text-xl px-8 py-6" style={{
                            backgroundImage: `linear-gradient(to right, ${
                              selectedPlan === 'basic' ? 'var(--purple-600)' :
                              selectedPlan === 'pro' ? 'var(--cyan-600)' :
                              'var(--yellow-400)'
                            }, ${
                              selectedPlan === 'basic' ? 'var(--purple-900)' :
                              selectedPlan === 'pro' ? 'var(--cyan-900)' :
                              'var(--orange-400)'
                            })`
                          }}>
                            View Report
                            <ArrowRight className="ml-2 h-6 w-6" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-lg text-muted-foreground">
                        Audit completed successfully
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 