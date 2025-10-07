import { useQuery } from '@tanstack/react-query'

import { CourseService } from '@/services/courseService'

export function useCourses(page: number = 1, limit: number = 100) {
  return useQuery({
    queryKey: ['courses', page, limit],
    queryFn: () => CourseService.fetchCourses(page, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useSearchCourses(
  query: string,
  page: number = 1,
  limit: number = 100
) {
  return useQuery({
    queryKey: ['courses', 'search', query, page, limit],
    queryFn: () => CourseService.searchCourses(query, page, limit),
    enabled: !!query.trim(),
    staleTime: 3 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  })
}

export function useCourseBySlug(slug: string) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => CourseService.fetchCourseBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
