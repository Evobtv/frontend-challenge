import { useCallback, useEffect, useState } from 'react'

const FAVORITES_KEY = 'favoriteCourses'

export function useFavorites() {
  const [favoriteCourseIds, setFavoriteCourseIds] = useState<number[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      try {
        setFavoriteCourseIds(JSON.parse(stored))
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error)
        setFavoriteCourseIds([])
      }
    }
  }, [])

  const toggleFavorite = useCallback((courseId: number) => {
    setFavoriteCourseIds((prev) => {
      const newFavorites = prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
      return newFavorites
    })
  }, [])

  const isFavorite = useCallback(
    (courseId: number) => favoriteCourseIds.includes(courseId),
    [favoriteCourseIds]
  )

  return {
    favoriteCourseIds,
    toggleFavorite,
    isFavorite,
  }
}
