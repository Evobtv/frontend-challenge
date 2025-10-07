import { Course, CoursesResponse } from '@/types/course'

export class CourseService {
  static async fetchCourses(
    page: number = 1,
    limit: number = 10
  ): Promise<CoursesResponse> {
    try {
      const url = new URL('/api/courses', window.location.origin)
      url.searchParams.append('page', page.toString())
      url.searchParams.append('limit', limit.toString())

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.statusText}`)
      }

      const data = await response.json()
      return data.data || data
    } catch (error) {
      console.error('Error fetching courses:', error)
      throw error
    }
  }

  static async searchCourses(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<CoursesResponse> {
    try {
      const url = new URL('/api/courses', window.location.origin)
      url.searchParams.append('page', page.toString())
      url.searchParams.append('limit', limit.toString())
      url.searchParams.append('search', query)

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 180, // Cache for 3 minutes
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to search courses: ${response.statusText}`)
      }

      const data = await response.json()
      return data.data || data
    } catch (error) {
      console.error('Error searching courses:', error)
      throw error
    }
  }

  static async fetchCourseBySlug(slug: string): Promise<Course | null> {
    try {
      const response = await fetch(`/api/courses/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(
          `Failed to fetch course by slug: ${response.statusText}`
        )
      }

      const data = await response.json()
      return data.data || data
    } catch (error) {
      console.error('Error fetching course by slug:', error)
      throw error
    }
  }
}
