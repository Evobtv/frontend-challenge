'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Course } from '@/types/course'

import { useCourses, useSearchCourses } from '@/hooks/useCourses'
import { useFavorites } from '@/hooks/useFavorites'

import { CourseGrid } from '@/components/(home)/Course'
import { HeroSection } from '@/components/(home)/Hero'
import { EmptyState } from '@/components/ui/empty-state'
import { Section } from '@/components/ui/section'

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const { favoriteCourseIds, toggleFavorite } = useFavorites()

  const { data: coursesData, isLoading: isLoadingCourses } = useCourses()
  const { data: searchData, isLoading: isSearching } =
    useSearchCourses(searchQuery)

  const displayedCourses = useMemo(
    () =>
      searchQuery ? searchData?.courses || [] : coursesData?.courses || [],
    [searchQuery, searchData, coursesData]
  )

  const favoriteCourses = useMemo(
    () =>
      (coursesData?.courses || []).filter((course) =>
        favoriteCourseIds.includes(course.id)
      ),
    [coursesData, favoriteCourseIds]
  )

  const isLoading = searchQuery ? isSearching : isLoadingCourses

  const sectionTitle = searchQuery
    ? `Resultados para "${searchQuery}"`
    : 'Meus cursos'

  const sectionDescription = searchQuery
    ? `${displayedCourses.length} cursos encontrados`
    : undefined

  const handleCourseAccess = useCallback(
    (course: Course) => {
      router.push(`/courses/${course.slug}`)
    },
    [router]
  )

  const handleCourseFavorite = useCallback(
    (course: Course) => {
      toggleFavorite(course.id)
    },
    [toggleFavorite]
  )

  return (
    <>
      <HeroSection />

      <Section title={sectionTitle} description={sectionDescription}>
        <CourseGrid
          courses={displayedCourses}
          loading={isLoading}
          onCourseAccess={handleCourseAccess}
          onCourseFavorite={handleCourseFavorite}
          favoritedCourses={favoriteCourseIds}
        />
      </Section>

      <Section title="Meus favoritos">
        {favoriteCourses.length === 0 ? (
          <EmptyState description="Parece que você ainda não tem cursos favoritados" />
        ) : (
          <CourseGrid
            courses={favoriteCourses}
            loading={isLoadingCourses}
            onCourseAccess={handleCourseAccess}
            onCourseFavorite={handleCourseFavorite}
            favoritedCourses={favoriteCourseIds}
          />
        )}
      </Section>
    </>
  )
}
