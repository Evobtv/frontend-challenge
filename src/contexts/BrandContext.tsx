'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { BrandData } from '@/types/brand'

interface BrandContextType {
  brandData: BrandData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const BrandContext = createContext<BrandContextType | undefined>(undefined)

interface BrandProviderProps {
  children: React.ReactNode
}

export function BrandProvider({ children }: BrandProviderProps) {
  const [brandData, setBrandData] = useState<BrandData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBrandData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/brand', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch brand data: ${response.statusText}`)
      }

      const data = await response.json()
      setBrandData(data.data || data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching brand data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBrandData()
  }, [])

  const value: BrandContextType = {
    brandData,
    loading,
    error,
    refetch: fetchBrandData,
  }

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
}

export function useBrand() {
  const context = useContext(BrandContext)
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider')
  }
  return context
}
