import clsx from 'clsx'
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  className?: string
}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button className={clsx("border border-white/50 px-3 py-1.5 rounded-full font-normal text-white text-sm text-center text-nowrap", className)}>
      {children}
    </button>
  )
}
