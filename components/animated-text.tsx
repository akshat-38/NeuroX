"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export const AnimatedText = () => {
  const text = "NeuroX"
  const subtitle = "Your contract our intelligence"
  const [key, setKey] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1)
    }, 10000)

    // Continuous glitch effect every 2 seconds
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 700) // Keep glitch visible for 700ms
    }, 2000)
    
    return () => {
      clearInterval(interval)
      clearInterval(glitchInterval)
    }
  }, [])
  
  return (
    <div className="flex flex-col justify-center items-center min-h-[240px] py-8">
      <AnimatePresence mode="wait">
        <div key={key} className="flex flex-col items-center">
          {/* Main Title */}
          <div className="relative flex items-center mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "7rem" }}
              transition={{ duration: 1.2 }}
              className="h-[4px] bg-gradient-to-r from-purple-500 to-cyan-500 absolute -bottom-1"
            />
            <div className={`flex relative ${isGlitching ? 'glitch' : ''}`}>
              {text.split("").map((char, index) => (
                <motion.span
                  key={`${key}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    x: isGlitching ? Math.random() * 2 - 1 : 0
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 1.2 + index * 0.2,
                    ease: "easeOut"
                  }}
                  className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 relative tracking-tight"
                  style={{
                    textShadow: isGlitching ? '1px 1px #ff00ff80, -1px -1px #00ffff80' : 'none'
                  }}
                >
                  {char}
                  {isGlitching && (
                    <span className="absolute left-0 top-0 opacity-30" style={{ transform: 'translateX(1px)' }}>
                      {char}
                    </span>
                  )}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <div className="flex justify-center w-full mt-1">
            {subtitle.split(" ").map((word, index) => (
              <motion.span
                key={`${key}-subtitle-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 2.8 + index * 0.3,
                  ease: "easeOut"
                }}
                className="text-lg text-white/80 mx-1"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </AnimatePresence>
      <style jsx global>{`
        .glitch {
          animation: glitch 0.1s ease-in-out;
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          25% {
            transform: translate(-1px, 1px);
          }
          50% {
            transform: translate(1px, -1px);
          }
          75% {
            transform: translate(-1px, 0);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  )
} 