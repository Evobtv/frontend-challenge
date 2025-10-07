import { useEffect, useState } from 'react'

import { Course } from '@/types/course'

const FAVORITES_KEY = 'favoriteCourses'

export function useFavoriteCourse(course: Course | null) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (!course) return

    const favorites = getFavoritesFromStorage()
    setIsFavorite(favorites.includes(course.id))
  }, [course])

  const toggleFavorite = () => {
    if (!course) return

    const favorites = getFavoritesFromStorage()

    if (isFavorite) {
      removeFavorite(favorites, course.id)
      setIsFavorite(false)
    } else {
      addFavorite(favorites, course.id)
      setIsFavorite(true)
    }
  }

  return { isFavorite, toggleFavorite }
}

function getFavoritesFromStorage(): number[] {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
}

function addFavorite(favorites: number[], courseId: number): void {
  const updatedFavorites = [...favorites, courseId]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
}

function removeFavorite(favorites: number[], courseId: number): void {
  const updatedFavorites = favorites.filter((id) => id !== courseId)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
}
