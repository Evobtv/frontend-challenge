import { BrandProvider, BrandThemeProvider } from '@/contexts/BrandContext'
import type { Metadata } from 'next'
import { Inter, Quattrocento } from 'next/font/google'

import { QueryProvider } from '@/lib/query-client'

import { LayoutWrapper } from '@/components/LayoutWrapper'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const quattrocento = Quattrocento({
  variable: '--font-quattrocento',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'EVOB',
  description: 'EVOB Frontend Challenge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${quattrocento.variable} bg-evob-bg antialiased`}
      >
        <QueryProvider>
          <BrandProvider>
            <BrandThemeProvider>
              <LayoutWrapper>
                {children}
                <Toaster richColors theme="light" />
              </LayoutWrapper>
            </BrandThemeProvider>
          </BrandProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
