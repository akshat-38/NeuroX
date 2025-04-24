"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Users, Award, Github, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function AboutPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="w-full py-8 px-4 md:px-6 md:py-16">
      <motion.div
        className="flex flex-col items-center text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-4">
          <Shield className="h-6 w-6 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">About NeuroX</h1>
        <p className="mt-4 max-w-[800px] text-muted-foreground md:text-xl">
          Revolutionizing smart contract security with neural intelligence
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 mb-12 items-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={item} className="order-2 md:order-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">Our Mission</h2>
          <p className="text-muted-foreground mb-4 text-lg">
            At NeuroX, we're on a mission to make blockchain technology safer for everyone. We believe that security
            should be accessible, transparent, and powered by the latest advancements in artificial intelligence.
          </p>
          <p className="text-muted-foreground mb-4 text-lg">
            Our neural network-based auditing platform is designed to identify vulnerabilities that traditional methods
            might miss, providing developers with comprehensive insights into their smart contracts' security posture.
          </p>
          <p className="text-muted-foreground text-lg">
            We're committed to continuous improvement, constantly training our models on the latest exploit patterns and
            security best practices to stay ahead of potential threats.
          </p>
        </motion.div>

        <motion.div variants={item} className="order-1 md:order-2 flex justify-center items-center">
          <div className="relative w-full max-w-[500px] aspect-square">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <motion.div whileHover={{ rotate: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="w-full h-full backdrop-blur-sm border border-white/10 bg-black/80 rounded-3xl overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center mb-6"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(168, 85, 247, 0.5)",
                        "0 0 30px rgba(34, 211, 238, 0.5)",
                        "0 0 20px rgba(168, 85, 247, 0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Zap className="h-12 w-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">Neural Security</h3>
                  <p className="text-center text-muted-foreground">Protecting blockchain assets with AI</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">Our Technology</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Neural Analysis",
              description:
                "Our proprietary neural networks are trained on thousands of smart contracts to identify patterns associated with vulnerabilities.",
              icon: <Zap className="h-10 w-10 text-purple-600" />,
            },
            {
              title: "Token Rewards",
              description:
                "Earn NxT tokens for using our platform, participating in security challenges, and contributing to our ecosystem.",
              icon: <Award className="h-10 w-10 text-cyan-600" />,
            },
            {
              title: "Community Driven",
              description:
                "Join our growing community of security researchers, developers, and blockchain enthusiasts.",
              icon: <Users className="h-10 w-10 text-purple-600" />,
            },
          ].map((feature, index) => (
            <motion.div key={index} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Card className="h-full backdrop-blur-sm border border-white/10 bg-black/80">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <motion.div
                    className="mb-4 rounded-full p-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10"
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bombardiro Card */}
          <Card className="bg-black/40 border border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-purple-500/50">
                <Image
                  src="/crocodile-plane.jpg"
                  alt="Bombardiro Crocodillo"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                Bombardiro Crocodillo
              </h3>
              <p className="text-purple-500 mb-2">Founder & CEO</p>
              <p className="text-muted-foreground text-sm mb-4">
                Former security researcher at Ethereum Foundation with 8+ years in blockchain security.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-purple-500">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-purple-500">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-purple-500">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Lirili's Card */}
          <Card className="bg-black/40 border border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-purple-500/50">
                <Image
                  src="/elephant-cactus.jpg"
                  alt="Lirili Larila"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                Lirili Larila
              </h3>
              <p className="text-purple-500 mb-2">CTO</p>
              <p className="text-muted-foreground text-sm mb-4">
                AI specialist with a PhD in Machine Learning and 5+ years experience in neural networks.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-purple-500">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-purple-500">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-purple-500">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* La Vaca's Card */}
          <Card className="bg-black/40 border border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-purple-500/50">
                <Image
                  src="/saturn-cow.jpg"
                  alt="La Vaca Saturno Saturnita"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                La Vaca Saturno Saturnita
              </h3>
              <p className="text-purple-500 mb-2">Head of Research</p>
              <p className="text-muted-foreground text-sm mb-4">
                Smart contract auditor who has identified vulnerabilities in major DeFi protocols.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-purple-500">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-purple-500">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-purple-500">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">Join Us in Securing the Blockchain</h2>
        <p className="text-muted-foreground max-w-[700px] mx-auto">
          Whether you're a developer looking to secure your smart contracts or a security researcher interested in
          contributing to our platform, we'd love to hear from you. Together, we can build a safer blockchain ecosystem.
        </p>
      </motion.div>
    </div>
  )
}
