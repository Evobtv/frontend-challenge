'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">
          Página não encontrada
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          A página que você está procurando não existe ou foi movida.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Redirecionando para a página inicial em 3 segundos...
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="bg-evob-primary hover:bg-evob-hover inline-flex h-9 items-center gap-2 rounded px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
