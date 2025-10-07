'use client'

import { use, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { useCourseBySlug } from '@/hooks/useCourses'
import { useFavorites } from '@/hooks/useFavorites'

import {
  CourseBanner,
  CourseDescription,
  CourseHeader,
  FavoriteButton,
  LoadingSpinner,
} from './_components'

const ShareButton = dynamic(
  () =>
    import('./_components/ShareButton').then((mod) => ({
      default: mod.ShareButton,
    })),
  { ssr: false }
)

interface PageProps {
  params: Promise<{ id: string }>
}

export default function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.id

  const { data: course, isLoading } = useCourseBySlug(slug)
  const { isFavorite, toggleFavorite } = useFavorites()

  const courseIsFavorited = useMemo(
    () => (course ? isFavorite(course.id) : false),
    [course, isFavorite]
  )

  const handleToggleFavorite = () => {
    if (course) {
      toggleFavorite(course.id)
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!course) {
    notFound()
  }

  return (
    <>
      <CourseBanner course={course} />

      <div className="mx-auto max-w-7xl px-4 py-4 lg:py-12">
        <div className="mb-4 md:hidden">
          <FavoriteButton
            isFavorite={courseIsFavorited}
            onToggle={handleToggleFavorite}
          />
        </div>

        <CourseHeader
          title={course.title}
          isFavorite={courseIsFavorited}
          onToggleFavorite={handleToggleFavorite}
        />

        <div className="max-w-4xl">
          <CourseDescription course={course} />
        </div>
      </div>

      <ShareButton slug={slug} courseTitle={course.title} />
    </>
  )
}
