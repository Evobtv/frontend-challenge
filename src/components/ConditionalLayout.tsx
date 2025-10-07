'use client'

import { usePathname } from 'next/navigation'

import { LayoutWrapper } from '@/components/LayoutWrapper'
import { Toaster } from '@/components/ui/sonner'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isAuthPage =
    pathname?.startsWith('/criar-conta') ||
    pathname?.startsWith('/entrar') ||
    pathname?.startsWith('/login')

  if (isAuthPage) {
    return (
      <>
        {children}
        <Toaster richColors theme="light" />
      </>
    )
  }

  return (
    <LayoutWrapper>
      {children}
      <Toaster richColors theme="light" />
    </LayoutWrapper>
  )
}
