import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Shield, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface CongratsCardProps {
  isOpen: boolean
  onClose: () => void
}

export default function CongratsCard({ isOpen, onClose }: CongratsCardProps) {
  const router = useRouter()

  const handleBet = () => {
    onClose()
    router.push("/auditor")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md p-8 bg-gradient-to-br from-purple-900/90 to-cyan-900/90 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.3),0_0_60px_rgba(168,85,247,0.3),0_0_90px_rgba(34,211,238,0.3)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center text-center space-y-6">
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center mb-4 glow"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 30px rgba(34, 211, 238, 0.5)",
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Shield className="h-10 w-10 text-white" />
              </motion.div>

              <h2 className="text-3xl font-bold text-white">Congratulations!</h2>
              <p className="text-xl text-white/80">
                You've received 100 NxT tokens as a welcome bonus!
              </p>
              <p className="text-sm text-white/60">
                Your tokens have been added to your wallet. Welcome to NeuroX!
              </p>

              <Button
                onClick={handleBet}
                className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-6 text-lg hover:from-purple-700 hover:to-cyan-700"
              >
                Bet
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 