'use client'

import { useEffect, useState } from 'react'
import { CiCircleCheck } from 'react-icons/ci'

import { Button } from '@/components/ui/button'

interface SignupSuccessProps {
  onGoToCatalog: () => void
}

export function SignupSuccess({ onGoToCatalog }: SignupSuccessProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-green-600">
        <CiCircleCheck className="size-9 text-white" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Conta criada com sucesso!
        </h1>
        <p className="max-w-3xs text-sm text-gray-600">
          Clique no botão abaixo ou você será redirecionado em {countdown}{' '}
          segundos...
        </p>
      </div>

      <Button
        variant="outline"
        onClick={onGoToCatalog}
        className="h-10.5 w-full max-w-xs bg-transparent text-xs font-medium"
      >
        Ir para o catálogo
      </Button>
    </div>
  )
}
