import { Heart } from 'iconsax-reactjs'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
}

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <Button
      variant="outline"
      className="h-8 w-full rounded-xs border-gray-300 lg:w-28.5"
      onClick={onToggle}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
      }
    >
      <Heart
        size={20}
        className={cn(isFavorite && 'fill-evob-red text-evob-red')}
        aria-label="Favorite icon"
      />
      {isFavorite ? 'Favorito' : 'Favoritar'}
    </Button>
  )
}
