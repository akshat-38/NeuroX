"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, FileText, Shield, Copy, Check } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)

    toast({
      title: "Code Copied",
      description: "The code snippet has been copied to your clipboard.",
    })
  }

  return (
    <div className="w-full max-w-[90%] mx-auto py-12 px-4 md:px-6 md:py-24">
      <motion.div
        className="flex flex-col items-center text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center justify-center p-3 bg-purple-500/20 rounded-full mb-6">
          <AlertTriangle className="h-8 w-8 text-purple-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
          Audit Results
        </h1>
        <p className="mt-2 max-w-[700px] text-muted-foreground md:text-xl">
          Your smart contract has been analyzed by our neural network
        </p>
      </motion.div>

      <Card className="backdrop-blur-sm border border-orange-500/30 bg-black/60 shadow-[0_0_100px_rgba(249,115,22,0.35)] mb-12">
        <CardContent className="p-8">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-2xl p-1 bg-black/40">
                <TabsTrigger value="overview" className="text-base py-3 font-medium">Overview</TabsTrigger>
                <TabsTrigger value="vulnerabilities" className="text-base py-3 font-medium">Vulnerabilities</TabsTrigger>
                <TabsTrigger value="recommendations" className="text-base py-3 font-medium">Recommendations</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
              <div className="grid gap-8 md:grid-cols-3 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:border-orange-500/30 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold mb-3 text-white/90">Security Score</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          className="text-white/10 stroke-current"
                          strokeWidth="8"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                        ></circle>
                        <motion.circle
                          className="text-orange-500 stroke-current"
                          strokeWidth="8"
                          strokeLinecap="round"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeDasharray="251.2"
                          strokeDashoffset="50.24"
                          initial={{ strokeDashoffset: 251.2 }}
                          animate={{ strokeDashoffset: 62.8 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        ></motion.circle>
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-4xl font-bold text-white">7.5</span>
                        <span className="text-sm text-white/60">out of 10</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-base text-orange-500 font-medium text-center mt-4">Medium Risk Level</p>
            </motion.div>
                      <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:border-orange-500/30 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold mb-3 text-white/90">Issues Found</h3>
                  <div className="text-5xl font-bold text-white mb-2">3</div>
                  <p className="text-base text-orange-500 font-medium">Critical Issues</p>
                      </motion.div>
                      <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:border-orange-500/30 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold mb-3 text-white/90">Gas Optimization</h3>
                  <div className="text-5xl font-bold text-white mb-2">85%</div>
                  <p className="text-base text-orange-500 font-medium">Efficiency Score</p>
                      </motion.div>
                  </div>
              
              <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="backdrop-blur-sm border border-orange-500/30 bg-black/40 overflow-hidden">
                    <CardHeader className="border-b border-orange-500/20 bg-black/20">
                      <CardTitle className="text-2xl font-bold text-white">Audit Summary</CardTitle>
                      <CardDescription className="text-base text-white/70">Overall assessment of your smart contract</CardDescription>
              </CardHeader>
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="p-6 backdrop-blur-sm border border-orange-500/30 bg-black/40 rounded-xl">
                    <div className="flex items-start">
                            <AlertTriangle className="h-6 w-6 text-orange-500 mr-4 mt-1" />
                      <div>
                              <h3 className="text-xl font-semibold mb-2 text-white">Moderate Risk Assessment</h3>
                              <p className="text-base text-white/70 leading-relaxed">
                          Your contract has some potential vulnerabilities that should be addressed before deployment to
                          a production environment. While not critical, these issues could lead to unexpected behavior
                          or security risks.
                        </p>
                      </div>
                    </div>
                  </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-6 bg-green-500/5 border border-green-500/30 rounded-xl hover:bg-green-500/10 transition-colors duration-300">
                            <h4 className="text-lg font-semibold flex items-center mb-4 text-white">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        Strengths
                      </h4>
                            <ul className="space-y-3 text-base text-white/70">
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                Good access control implementation
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                Proper use of SafeMath
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                Event emissions for changes
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                Reasonable gas optimization
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                Clear function naming
                              </li>
                      </ul>
                    </div>

                          <div className="p-6 bg-red-500/5 border border-red-500/30 rounded-xl hover:bg-red-500/10 transition-colors duration-300">
                            <h4 className="text-lg font-semibold flex items-center mb-4 text-white">
                              <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                        Weaknesses
                      </h4>
                            <ul className="space-y-3 text-base text-white/70">
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                Potential reentrancy vulnerability
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                Unchecked return values
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                Missing input validation
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                No emergency pause
                              </li>
                              <li className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                Insufficient event logging
                              </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
              </div>
        </TabsContent>

        <TabsContent value="vulnerabilities">
          <motion.div variants={container} initial="hidden" animate="show">
                <Card className="mb-8 backdrop-blur-sm border border-orange-500/30 bg-black/40">
              <CardHeader>
                    <CardTitle className="text-orange-500">Vulnerability Report</CardTitle>
                <CardDescription>We found 2 potential vulnerabilities in your smart contract</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                      <motion.div
                        variants={item}
                        className="p-4 bg-orange-500/5 border border-orange-500/30 rounded-md"
                      >
                    <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="w-full">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium">Reentrancy Risk</h3>
                              <span className="text-xs bg-orange-500/20 text-orange-500 px-2 py-0.5 rounded">
                            Medium Risk
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Line 142: The contract may be vulnerable to reentrancy attacks. Consider using
                          ReentrancyGuard.
                        </p>
                            <div className="bg-orange-500/10 rounded p-3 text-sm">
                              <pre className="font-mono text-xs overflow-x-auto">
                                <code>function withdraw() public {"{"}
    uint amount = balances[msg.sender];
    (bool success, ) = msg.sender.call{"{"}value: amount{"}"}("");
    balances[msg.sender] = 0; // Should be before external call
{"}"}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={item}
                        className="p-4 bg-red-500/5 border border-red-500/30 rounded-md"
                      >
                        <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div className="w-full">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium">Critical Overflow Risk</h3>
                              <span className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded">
                                High Risk
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Line 189: Integer overflow vulnerability detected in unchecked arithmetic operation.
                            </p>
                            <div className="bg-red-500/10 rounded p-3 text-sm">
                              <pre className="font-mono text-xs overflow-x-auto">
                                <code>uint256 totalSupply = a + b; // No overflow check
uint256 newBalance = balance + amount; // Use SafeMath</code>
                              </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                      <motion.div
                        variants={item}
                        className="p-4 bg-green-500/5 border border-green-500/30 rounded-md"
                      >
                    <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="w-full">
                        <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium">Access Control Implementation</h3>
                              <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded">
                                Secure
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                              Line 78: Good implementation of role-based access control using OpenZeppelin.
                            </p>
                            <div className="bg-green-500/10 rounded p-3 text-sm">
                              <pre className="font-mono text-xs overflow-x-auto">
                                <code>modifier onlyAdmin() {"{"}
    require(hasRole(ADMIN_ROLE, msg.sender), "Admin only");
    _;
{"}"}</code>
                              </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="recommendations">
          <motion.div variants={container} initial="hidden" animate="show">
                <Card className="mb-8 backdrop-blur-sm border border-orange-500/30 bg-black/40">
              <CardHeader>
                    <CardTitle className="text-orange-500">Recommendations</CardTitle>
                <CardDescription>Suggested improvements for your smart contract</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                      <motion.div variants={item} className="p-4 bg-orange-500/5 border border-orange-500/30 rounded-md">
                    <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="w-full">
                        <h3 className="font-medium mb-1">Fix Reentrancy Vulnerability</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Update the withdraw function to follow the checks-effects-interactions pattern.
                        </p>
                            <div className="relative bg-orange-500/10 p-3 rounded text-sm font-mono overflow-x-auto">
                          <button
                            className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted-foreground/20"
                            onClick={() =>
                              handleCopy(`function withdraw(uint amount) external {
  // Check
  require(balances[msg.sender] >= amount, "Insufficient balance");
  
  // Effect
  balances[msg.sender] -= amount;
  
  // Interaction
  (bool success, ) = msg.sender.call{value: amount}("");
  require(success, "Transfer failed");
}`)
                            }
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <code>
                            function withdraw(uint amount) external {"{"}
                                <br /> <span className="text-orange-500"> // Check</span>
                            <br /> require(balances[msg.sender] >= amount, "Insufficient balance");
                            <br />
                                <br /> <span className="text-orange-500"> // Effect</span>
                            <br /> balances[msg.sender] -= amount;
                            <br />
                                <br /> <span className="text-orange-500"> // Interaction</span>
                            <br /> (bool success, ) = msg.sender.call{"{"}value: amount{"}"}("");
                            <br /> require(success, "Transfer failed");
                            <br />
                            {"}"}
                          </code>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                      <motion.div variants={item} className="p-4 bg-orange-500/5 border border-orange-500/30 rounded-md">
                    <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="w-full">
                        <h3 className="font-medium mb-1">Check Return Values</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Always check return values from external calls to ensure they succeed.
                        </p>
                            <div className="relative bg-orange-500/10 p-3 rounded text-sm font-mono overflow-x-auto">
                          <button
                            className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted-foreground/20"
                            onClick={() =>
                              handleCopy(`function transferTokens(address token, address to, uint amount) external {
  // Check return value
  bool success = IERC20(token).transfer(to, amount);
  require(success, "Transfer failed");
}`)
                            }
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <code>
                            function transferTokens(address token, address to, uint amount) external {"{"}
                                <br /> <span className="text-orange-500"> // Check return value</span>
                            <br /> bool success = IERC20(token).transfer(to, amount);
                            <br /> require(success, "Transfer failed");
                            <br />
                            {"}"}
                          </code>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                      <motion.div variants={item} className="p-4 bg-orange-500/5 border border-orange-500/30 rounded-md">
                    <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium mb-1">Add ReentrancyGuard</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Consider using OpenZeppelin's ReentrancyGuard for additional protection.
                        </p>
                            <div className="relative bg-orange-500/10 p-3 rounded text-sm font-mono overflow-x-auto">
                          <button
                            className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted-foreground/20"
                            onClick={() =>
                              handleCopy(`import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract YourContract is ReentrancyGuard {
  function withdraw(uint amount) external nonReentrant {
    // Implementation
  }
}`)
                            }
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <code>
                            import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
                            <br />
                            <br />
                            contract YourContract is ReentrancyGuard {"{"}
                            <br /> function withdraw(uint amount) external nonReentrant {"{"}
                                <br /> <span className="text-orange-500"> // Implementation</span>
                            <br /> {"}"}
                            <br />
                            {"}"}
                          </code>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button variant="outline" size="lg" className="flex items-center bg-black/40 border-orange-500/30 hover:bg-black/60">
            <FileText className="mr-3 h-5 w-5" />
            Download Report
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link href="/auditor">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Shield className="mr-3 h-5 w-5" />
              Audit Another Contract
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
