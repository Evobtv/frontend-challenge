'use client'

import { Suspense, useCallback, useMemo } from 'react'
import { X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Course } from '@/types/course'

import { useCourses, useSearchCourses } from '@/hooks/useCourses'
import { useDebounce } from '@/hooks/useDebounce'
import { useFavorites } from '@/hooks/useFavorites'

import { CourseGrid } from '@/components/(home)/Course'
import { HeroSection } from '@/components/(home)/Hero'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Section } from '@/components/ui/section'
import { CourseGridSkeleton } from '@/components/ui/skeleton'

function HomePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  // Aplica debounce na busca
  const debouncedSearchQuery = useDebounce(searchQuery, 700)

  const { favoriteCourseIds, toggleFavorite } = useFavorites()

  const { data: coursesData, isLoading: isLoadingCourses } = useCourses()
  const { data: searchData, isLoading: isSearching } =
    useSearchCourses(debouncedSearchQuery)

  const displayedCourses = useMemo(
    () =>
      debouncedSearchQuery
        ? searchData?.courses || []
        : coursesData?.courses || [],
    [debouncedSearchQuery, searchData, coursesData]
  )

  const favoriteCourses = useMemo(
    () =>
      (coursesData?.courses || []).filter((course) =>
        favoriteCourseIds.includes(course.id)
      ),
    [coursesData, favoriteCourseIds]
  )

  const isLoading = debouncedSearchQuery ? isSearching : isLoadingCourses

  const sectionTitle = 'Meus cursos'

  const handleClearSearch = useCallback(() => {
    router.push('/', { scroll: false })
  }, [router])

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

      <Section title={sectionTitle}>
        {searchQuery && (
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
              <span>
                Buscando por: <strong>{searchQuery}</strong>
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/20 size-5 rounded-full"
                onClick={handleClearSearch}
              >
                <X className="size-4" />
              </Button>
            </div>
            <span className="text-muted-foreground text-sm">
              {displayedCourses.length} cursos encontrados
            </span>
          </div>
        )}

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

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <>
          <HeroSection />
          <Section title="Meus cursos">
            <CourseGridSkeleton />
          </Section>
        </>
      }
    >
      <HomePageContent />
    </Suspense>
  )
}
