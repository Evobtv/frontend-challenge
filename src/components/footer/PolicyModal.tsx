'use client'

import { memo } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface PolicyModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export const PolicyModal = memo(function PolicyModal({
  isOpen,
  onClose,
  title,
  content,
}: PolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[85vh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-neutral-800">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto px-1">
          <div
            className="prose prose-sm max-w-none text-neutral-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
})
