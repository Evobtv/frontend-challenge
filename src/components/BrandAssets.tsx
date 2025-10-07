'use client'

import { useEffect } from 'react'
import { useBrand } from '@/contexts/BrandContext'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { BrandAssetService } from '@/services/brandService'

interface BrandLogoProps {
  variant?: 'desktop' | 'mobile'
  theme?: 'light' | 'dark'
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function BrandLogo({
  variant = 'desktop',
  theme = 'light',
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

  if (error) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded bg-gray-100 text-sm text-gray-500',
          className
        )}
        style={{ width, height }}
      >
        Logo not available
      </div>
    )
  }

  const logoUrl =
    variant === 'mobile'
      ? BrandAssetService.getMobileLogoUrl(brandData, theme)
      : BrandAssetService.getLogoUrl(brandData, theme)

  return (
    <Image
      src={logoUrl}
      alt={brandData?.name || 'Brand Logo'}
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={{
        objectFit: 'contain',
      }}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.src = variant === 'mobile' ? '/logo-mobile.png' : '/logo.png'
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
    if (!loading && brandData) {
      const faviconUrl = BrandAssetService.getFaviconUrl(brandData)

      const link =
        (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
        document.createElement('link')

      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = faviconUrl

      if (!document.querySelector("link[rel*='icon']")) {
        document.getElementsByTagName('head')[0].appendChild(link)
      }
    }
  }, [brandData, loading])

  if (loading || !brandData) {
    return null
  }

  const faviconUrl = BrandAssetService.getFaviconUrl(brandData)

  return (
    <Image
      src={faviconUrl}
      alt="Favicon"
      width={size}
      height={size}
      style={{
        objectFit: 'contain',
      }}
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.src = '/favicon.ico'
      }}
    />
  )
}

interface BrandHeaderProps {
  showLogo?: boolean
  logoVariant?: 'desktop' | 'mobile'
  className?: string
}

export function BrandHeader({
  showLogo = true,
  logoVariant = 'desktop',
  className = '',
}: BrandHeaderProps) {
  const { brandData, loading, error } = useBrand()

  if (loading) {
    return (
      <header
        className={cn(
          'flex items-center justify-between bg-gray-100 p-4',
          className
        )}
      >
        <div className="h-12 w-48 animate-pulse rounded bg-gray-200" />
      </header>
    )
  }

  if (error) {
    return (
      <header
        className={cn(
          'flex items-center justify-between bg-gray-100 p-4',
          className
        )}
      >
        <div className="text-gray-500">Brand not available</div>
      </header>
    )
  }

  const primaryColor = BrandAssetService.getPrimaryColor(brandData)
  const secondaryColor = BrandAssetService.getSecondaryColor(brandData)

  return (
    <header
      className={cn('flex items-center justify-between p-4', className)}
      style={{
        backgroundColor:
          brandData?.settings?.colors?.background_header || primaryColor,
        color: brandData?.settings?.colors?.font_header || secondaryColor,
      }}
    >
      {showLogo && (
        <BrandLogo
          variant={logoVariant}
          width={logoVariant === 'mobile' ? 120 : 200}
          height={logoVariant === 'mobile' ? 36 : 60}
          priority
        />
      )}

      {brandData && (
        <div className="flex flex-col items-end">
          <h1 className="text-lg font-semibold">{brandData.name}</h1>
          {brandData.description && (
            <p className="text-sm opacity-80">{brandData.description}</p>
          )}
        </div>
      )}
    </header>
  )
}
