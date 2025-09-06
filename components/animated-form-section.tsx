"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedFormSectionProps {
  children: ReactNode
  delay?: number
}

export function AnimatedFormSection({ children, delay = 0 }: AnimatedFormSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
