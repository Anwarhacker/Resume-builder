"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"

interface AnimatedTemplatePreviewProps {
  children: React.ReactNode
  templateKey: string
  templates?: any[]
  onTemplateSelect?: (template: string) => void
}

export function AnimatedTemplatePreview({ children, templateKey, templates, onTemplateSelect }: AnimatedTemplatePreviewProps) {
  if (templates && onTemplateSelect) {
    return (
      <div className="bg-gray-50 p-8 rounded-2xl">
        <div className="whitespace-nowrap overflow-x-auto overflow-y-hidden pb-4" style={{scrollbarWidth: 'thin'}}>
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`inline-block mr-8 cursor-pointer ${template.name === templateKey ? 'ring-4 ring-blue-500 rounded-2xl' : ''}`}
              style={{ width: '400px', verticalAlign: 'top' }}
              onClick={() => onTemplateSelect(template.name)}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-2 bg-gray-100 text-center">
                  <span className="text-sm font-medium capitalize text-gray-700">{template.name}</span>
                </div>
                <div className="transform scale-50 origin-top-left" style={{ width: '800px', height: '600px' }}>
                  {template.component}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

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
