import { HeartSearch } from 'iconsax-reactjs'

import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title?: string
  description: string
  className?: string
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2.5 py-12 text-center',
        className
      )}
    >
      <div className="rounded-full border border-gray-300 bg-white p-2">
        <HeartSearch size={24} color="#292D32" />
      </div>
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      <p className="max-w-3xs text-zinc-600">{description}</p>
    </div>
  )
}
