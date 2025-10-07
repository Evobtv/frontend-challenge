import { BrandData } from '@/types/brand'

export class BrandService {
  static async fetchBrandData(): Promise<BrandData> {
    try {
      const response = await fetch('/api/brand', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch brand data: ${response.statusText}`)
      }

      const data = await response.json()
      return data.data || data
    } catch (error) {
      console.error('Error fetching brand data:', error)
      throw error
    }
  }

  static async fetchBrandDataSSR(): Promise<BrandData | null> {
    try {
      const baseUrl = process.env.ORIGIN || 'http://localhost:3024'

      const response = await fetch(`${baseUrl}/api/brand`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          revalidate: 3600,
        },
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return data.data || data
    } catch (error) {
      console.error('Error fetching brand data on SSR:', error)
      return null
    }
  }
}
