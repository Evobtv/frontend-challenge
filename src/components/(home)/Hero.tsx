'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface HeroSectionProps {
  title?: string
  subtitle?: string
}

const HERO_IMAGES = [
  '/images/hero-banner-1.webp',
  '/images/hero-banner-2.webp',
  '/images/hero-banner-3.webp',
  '/images/hero-banner-4.webp',
]

const ROTATION_INTERVAL = 5000

export function HeroSection({
  title = 'Aprenda a criar uma plataforma LMS do zero',
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const rotateImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(rotateImage, ROTATION_INTERVAL)
    return () => clearInterval(interval)
  }, [rotateImage])

  return (
    <section className="relative h-[28.75rem] overflow-hidden bg-black text-white lg:h-[33.75rem]">
      <div className="absolute inset-0">
        {HERO_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="Hero background"
            fill
            priority={index === 0}
            fetchPriority={index === 0 ? 'high' : 'low'}
            loading={index === 0 ? 'eager' : 'lazy'}
            sizes="100vw"
            quality={75}
            className={cn(
              'absolute inset-0 object-cover object-center transition-opacity duration-1000',
              index === currentIndex ? 'opacity-35 lg:opacity-100' : 'opacity-0'
            )}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
        <div className="flex max-w-[26.25rem] flex-col gap-5 lg:gap-24">
          <h1 className="mb-6 text-[2rem] leading-tight font-bold lg:text-[3.25rem]">
            {title}
          </h1>
          <Button
            className="hover:bg-evob-hover max-w-48"
            aria-label="Conheça as aulas"
          >
            Conheça as aulas
          </Button>
        </div>
      </div>
      <div
        className="bg-evob-primary absolute bottom-0 left-0 hidden h-full w-full md:block md:max-w-2/3 lg:max-w-1/2"
        style={{ clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)' }}
      />
    </section>
  )
}
