"use client"

import { motion } from "framer-motion"
import { Facebook, Linkedin, Youtube, MessageCircle, ArrowDown, Code, Terminal, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-16">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex space-x-4"
          >
            <Code className="h-12 w-12 text-primary" />
            <Terminal className="h-12 w-12 text-primary" />
            <Cpu className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl"
          >
            WELCOME TO DEVMAESTERS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 max-w-3xl text-lg text-muted-foreground"
          >
            Your one-stop destination for programming knowledge, community discussions, and professional development in
            the digital age.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex space-x-4"
          >
            <Button variant="outline" size="icon" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToContent}
              className="animate-bounce text-primary hover:text-primary/80"
            >
              <ArrowDown className="h-6 w-6" />
              <span className="sr-only">Scroll down</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

