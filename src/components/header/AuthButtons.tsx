'use client'

import { memo } from 'react'
import { LogIn, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

interface AuthButtonsProps {
  isMobile?: boolean
}

export const AuthButtons = memo(function AuthButtons({
  isMobile = false,
}: AuthButtonsProps) {
  const router = useRouter()

  if (isMobile) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push('/entrar')}
        aria-label="Entrar"
      >
        <LogIn className="text-evob-primary size-5" />
      </Button>
    )
  }

  return (
    <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
      <Button
        variant="ghost"
        size="lg"
        onClick={() => router.push('/criar-conta')}
        aria-label="Cadastre-se"
      >
        <User size={16} className="text-evob-primary" />
        <span className="text-base font-medium">Cadastre-se</span>
      </Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={() => router.push('/entrar')}
        aria-label="Entrar"
      >
        <LogIn size={16} />
        <span>Entrar</span>
      </Button>
    </div>
  )
})
