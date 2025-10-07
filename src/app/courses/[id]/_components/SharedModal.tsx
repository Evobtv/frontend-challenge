'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  courseUrl: string
  courseTitle: string
}

export function ShareModal({
  isOpen,
  onClose,
  courseUrl,
  courseTitle,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(courseUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Link copiado para a área de transferência!')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      toast.error('Erro ao copiar o link.')
    } finally {
      setCopied(false)
    }
  }

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `Confira este curso: ${courseTitle}\n${courseUrl}`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start text-base font-medium text-neutral-800">
            Compartilhar curso
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 border border-gray-300">
          <Input
            type="text"
            value={courseUrl}
            readOnly
            className="flex-1 border-none bg-transparent text-sm text-gray-600 outline-none"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="size-8 text-gray-600 hover:text-gray-800"
            aria-label="Copiar link"
          >
            <Copy size={20} />
          </Button>
        </div>

        <Button
          onClick={handleWhatsAppShare}
          className="bg-evob-green hover:bg-evob-green/90 h-9 w-full text-xs font-medium text-neutral-50 transition-colors"
          aria-label="Compartilhar via Whatsapp"
        >
          <FaWhatsapp size={16} />
          Compartilhar via Whatsapp
        </Button>

        <Separator />

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-9 w-19 text-center text-xs font-medium text-neutral-700 hover:text-gray-800"
            aria-label="Fechar modal de compartilhamento"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
