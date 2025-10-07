import { useEffect, useState } from 'react'

import { Course } from '@/types/course'

import { CourseService } from '@/services/courseService'

export function useCourseData(slug: string) {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const fetchCourse = async () => {
      try {
        setLoading(true)
        const courseData = await CourseService.fetchCourseBySlug(slug)
        setCourse(courseData)
      } catch (error) {
        console.error('Error fetching course:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [slug])

  return { course, loading }
}
