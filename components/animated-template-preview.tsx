"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"

interface AnimatedTemplatePreviewProps {
  children: React.ReactNode
  templateKey: string
}

export function AnimatedTemplatePreview({ children, templateKey }: AnimatedTemplatePreviewProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={templateKey}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="w-full h-full px-[px]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
