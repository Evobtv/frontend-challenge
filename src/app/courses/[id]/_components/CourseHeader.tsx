import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { FavoriteButton } from './FavoriteButton'

interface CourseHeaderProps {
  title: string
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function CourseHeader({
  title,
  isFavorite,
  onToggleFavorite,
}: CourseHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <h1 className="lg:text-3.5xl text-evob-dark flex-1 text-2xl font-bold">
        {title}
      </h1>

      <div className="hidden gap-2 md:flex lg:gap-3">
        <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
        <Button
          variant="default"
          className="bg-evob-primary hover:bg-evob-primary/90 h-8 w-28.5 rounded-xs text-xs font-medium"
          onClick={() => {
            toast.success('Curso iniciado!')
          }}
          aria-label="Iniciar curso"
        >
          Iniciar curso
        </Button>
      </div>
    </div>
  )
}
