export interface Course {
  id: number
  title: string
  slug: string
  short_description?: string
  long_description?: string
  featured: boolean
  banner?: string
  banner_mobile?: string
  thumbnail?: string
}

export interface CoursePagination {
  total_pages: number
  current_page: number
  per_page: number
  total_items: number
}

export interface CoursesResponse {
  courses: Course[]
  pagination: CoursePagination
}
