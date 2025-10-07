import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
  titleClassName?: string
}

export function Section({
  children,
  title,
  description,
  className,
  titleClassName,
}: SectionProps) {
  return (
    <section className={cn('mx-auto max-w-7xl px-4 py-12', className)}>
      {(title || description) && (
        <div className="mb-10">
          {title && (
            <h2 className={cn('text-3.5xl mb-4', titleClassName)}>{title}</h2>
          )}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
