'use client'

import { memo, useCallback } from 'react'
import { LogIn, User } from 'lucide-react'

import { Button } from '../ui/button'

interface AuthButtonsProps {
  isMobile?: boolean
}

export const AuthButtons = memo(function AuthButtons({
  isMobile = false,
}: AuthButtonsProps) {
  const handleSignUp = useCallback(() => {
    console.log('Sign up clicked')
  }, [])

  const handleSignIn = useCallback(() => {
    console.log('Sign in clicked')
  }, [])

  if (isMobile) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSignIn}
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
        onClick={handleSignUp}
        aria-label="Cadastre-se"
      >
        <User size={16} className="text-evob-primary" />
        <span className="text-base font-medium">Cadastre-se</span>
      </Button>
      <Button
        variant="secondary"
        size="lg"
        onClick={handleSignIn}
        aria-label="Entrar"
      >
        <LogIn size={16} />
        <span>Entrar</span>
      </Button>
    </div>
  )
})
