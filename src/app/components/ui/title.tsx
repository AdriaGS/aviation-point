import React from 'react'

import { cn } from '@/lib/utils'

type TitleSize = 'sm' | 'md' | 'lg' | 'xl'

interface TitleProps {
  children: React.ReactNode
  size?: TitleSize
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const sizeClasses: Record<TitleSize, string> = {
  sm: 'text-lg sm:text-xl',
  md: 'text-xl sm:text-2xl',
  lg: 'text-2xl sm:text-3xl',
  xl: 'text-3xl sm:text-4xl'
}

export function Title({ children, size = 'md', className, as: Component = 'h2' }: TitleProps) {
  return (
    <Component
      className={cn(
        'font-bold tracking-tight text-gray-900 dark:text-white',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  )
}