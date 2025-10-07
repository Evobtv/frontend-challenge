'use client'

import { useEffect } from 'react'
import { useBrand } from '@/contexts/BrandContext'
import Image from 'next/image'

import { cn } from '@/lib/utils'

interface BrandLogoProps {
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function BrandLogo({
  width = 91,
  height = 32,
  className = '',
  priority = false,
}: BrandLogoProps) {
  const { brandData, loading, error } = useBrand()

  if (loading) {
    return (
      <div
        className={cn('animate-pulse rounded bg-gray-200', className)}
        style={{ width, height }}
      />
    )
  }

  if (error || !brandData?.logo) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded bg-gray-100 text-sm text-gray-500',
          className
        )}
        style={{ width, height }}
      >
        Logo
      </div>
    )
  }

  return (
    <Image
      src={brandData.logo}
      alt={brandData.name || 'Brand Logo'}
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={{
        objectFit: 'contain',
      }}
    />
  )
}

interface BrandFaviconProps {
  size?: number
}

export function BrandFavicon({ size = 32 }: BrandFaviconProps) {
  const { brandData, loading } = useBrand()

  useEffect(() => {
    if (!loading && brandData?.logo) {
      const link =
        (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
        document.createElement('link')

      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = brandData.logo

      if (!document.querySelector("link[rel*='icon']")) {
        document.getElementsByTagName('head')[0].appendChild(link)
      }
    }
  }, [brandData, loading])

  if (loading || !brandData?.logo) {
    return null
  }

  return (
    <Image
      src={brandData.logo}
      alt="Favicon"
      width={size}
      height={size}
      style={{
        objectFit: 'contain',
      }}
    />
  )
}
