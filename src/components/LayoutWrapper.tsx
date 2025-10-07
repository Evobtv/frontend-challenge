'use client'

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import { Header } from './header'

const Footer = dynamic(() => import('./footer'), {
  ssr: true,
})

const Sidebar = dynamic(
  () => import('./header').then((mod) => ({ default: mod.Sidebar })),
  { ssr: false }
)

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const handleSearch = useCallback(
    (query: string) => {
      const url = query.trim() ? `/?search=${encodeURIComponent(query)}` : '/'
      router.push(url)
    },
    [router]
  )

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header onSearch={handleSearch} onMenuToggle={toggleSidebar} />
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      )}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
