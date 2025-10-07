'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { BrandData } from '@/types/brand'

import { BrandService } from '@/services/brandService'

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

      const data = await BrandService.fetchBrandData()
      setBrandData(data)
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

interface BrandThemeProviderProps {
  children: React.ReactNode
}

export function BrandThemeProvider({ children }: BrandThemeProviderProps) {
  const { brandData, loading } = useBrand()

  useEffect(() => {
    if (!loading && brandData) {
      const root = document.documentElement
      const colors = brandData.settings?.colors

      if (colors) {
        root.style.setProperty(
          '--brand-primary',
          brandData.color1 || colors.color1
        )
        root.style.setProperty(
          '--brand-secondary',
          brandData.color2 || colors.color2
        )
        root.style.setProperty(
          '--brand-background-main',
          colors.background_main
        )
        root.style.setProperty(
          '--brand-background-secondary',
          colors.background_secondary
        )
        root.style.setProperty(
          '--brand-background-tertiary',
          colors.background_tertiary
        )
        root.style.setProperty('--brand-font-color', colors.color_font)
        root.style.setProperty('--brand-cta-background', colors.background_cta)
        root.style.setProperty('--brand-cta-color', colors.font_cta)
      }

      const fonts = brandData.settings?.fonts
      if (fonts) {
        root.style.setProperty('--brand-font-family', fonts.font_name)
        root.style.setProperty('--brand-font-size', fonts.base_size)

        if (
          fonts.font_link &&
          !document.querySelector(`link[href="${fonts.font_link}"]`)
        ) {
          const linkElement = document.createElement('link')
          linkElement.rel = 'stylesheet'
          linkElement.href = fonts.font_link
          document.head.appendChild(linkElement)
        }
      }
    }
  }, [brandData, loading])

  return <>{children}</>
}
