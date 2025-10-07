'use client'

import { memo, useCallback, useMemo, useState } from 'react'
import { Heart } from 'iconsax-reactjs'
import { Flame } from 'lucide-react'
import Image from 'next/image'

import { Course } from '@/types/course'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface CourseImageProps {
  course: Course
  onClick: () => void
}

const CourseImage = memo(function CourseImage({
  course,
  onClick,
}: CourseImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const imageUrl = useMemo(
    () => course.thumbnail || course.banner || '/placeholder-course.jpg',
    [course.thumbnail, course.banner]
  )

  const handleLoad = useCallback(() => setIsImageLoading(false), [])
  const handleError = useCallback(() => {
    setImageError(true)
    setIsImageLoading(false)
  }, [])

  if (imageError || !imageUrl) return null

  return (
    <div className="h-[9.8125rem]" onClick={onClick}>
      {isImageLoading && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-200">
          <div className="border-t-evob-primary size-8 animate-spin rounded-full border-2 border-gray-300" />
        </div>
      )}
      <Image
        src={imageUrl}
        alt={course.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
})

interface CourseBadgeProps {
  featured?: boolean
}

const CourseBadge = memo(function CourseBadge({ featured }: CourseBadgeProps) {
  if (!featured) return null

  return (
    <div className="absolute bottom-3 left-3 flex items-center gap-2">
      <span className="bg-evob-red p-1.5">
        <Flame size={12} className="fill-evob-secondary text-evob-secondary" />
      </span>
      <span className="bg-evob-secondary font-quattrocento px-3 py-1 text-xs font-bold text-white uppercase">
        Online
      </span>
    </div>
  )
})

interface FavoriteIconButtonProps {
  isFavorited: boolean
  onToggle: (e: React.MouseEvent) => void
}

const FavoriteIconButton = memo(function FavoriteIconButton({
  isFavorited,
  onToggle,
}: FavoriteIconButtonProps) {
  return (
    <div className="absolute top-3 right-3">
      <Button
        variant={isFavorited ? 'secondary' : 'default'}
        size="icon-sm"
        onClick={onToggle}
        className={cn(
          'hover:bg-evob-primary rounded-full p-2 transition-all',
          isFavorited
            ? 'bg-black/35 text-white'
            : 'hover:text-evob-primary bg-black/35 text-gray-600'
        )}
        aria-pressed={isFavorited}
        aria-label={
          isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
        }
      >
        <Heart
          size={16}
          color="#FFFFFF"
          variant={isFavorited ? 'Bold' : 'Linear'}
        />
      </Button>
    </div>
  )
})

interface CourseCardProps {
  course: Course
  onAccess?: (course: Course) => void
  onFavorite?: (course: Course) => void
  isFavorited?: boolean
}

export const CourseCard = memo(function CourseCard({
  course,
  onAccess,
  onFavorite,
  isFavorited = false,
}: CourseCardProps) {
  const handleAccess = useCallback(() => {
    onAccess?.(course)
  }, [course, onAccess])

  const handleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onFavorite?.(course)
    },
    [course, onFavorite]
  )

  return (
    <div className="group flex min-h-[22.3125rem] cursor-default flex-col overflow-hidden bg-white">
      <div
        className="relative flex flex-col justify-between bg-gray-200"
        onClick={handleAccess}
      >
        <CourseImage course={course} onClick={handleAccess} />
        <FavoriteIconButton
          isFavorited={isFavorited}
          onToggle={handleFavorite}
        />
        <CourseBadge featured={course.featured} />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="mb-2 line-clamp-2 text-2xl text-zinc-950 transition-colors">
            {course.title}
          </h3>

          {course.short_description && (
            <p className="line-clamp-2 truncate text-sm text-gray-600">
              {course.short_description}
            </p>
          )}
        </div>

        <Button
          variant="secondary"
          onClick={handleAccess}
          className="h-12 w-full"
          aria-label={`Acessar o curso ${course.title}`}
        >
          Acessar
        </Button>
      </div>
    </div>
  )
})

interface CourseGridProps {
  courses: Course[]
  loading?: boolean
  onCourseAccess?: (course: Course) => void
  onCourseFavorite?: (course: Course) => void
  favoritedCourses?: number[]
}

export function CourseGrid({
  courses,
  loading = false,
  onCourseAccess,
  onCourseFavorite,
  favoritedCourses = [],
}: CourseGridProps) {
  const favoritesSet = useMemo(
    () => new Set(favoritedCourses),
    [favoritedCourses]
  )

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="overflow-hidden bg-white">
            <div className="aspect-video animate-pulse bg-gray-200" />
            <div className="space-y-3 p-4">
              <div className="h-4 animate-pulse rounded bg-gray-200" />
              <div className="h-6 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="h-10 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-2 text-xl font-semibold">Nenhum curso encontrado</h3>
        <p className="text-gray-600">
          Tente ajustar sua busca ou explore outras categorias
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onAccess={onCourseAccess}
          onFavorite={onCourseFavorite}
          isFavorited={favoritesSet.has(course.id)}
        />
      ))}
    </div>
  )
}
