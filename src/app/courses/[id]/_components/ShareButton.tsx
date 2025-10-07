'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { ShareModal } from './SharedModal'

interface ShareButtonProps {
  slug: string
  courseTitle: string
}

export function ShareButton({ slug, courseTitle }: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const courseUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/courses/${slug}`
      : ''

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        size="icon"
        className="fixed right-6 bottom-18 z-40 size-14 rounded-full bg-white text-gray-700 shadow-lg transition-all hover:scale-110 hover:bg-white hover:shadow-xl"
        aria-label="Compartilhar curso"
      >
        <Share2 size={24} />
      </Button>

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseUrl={courseUrl}
        courseTitle={courseTitle}
      />
    </>
  )
}
