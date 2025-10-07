'use client'

import { useCallback, useState } from 'react'
import { Menu, Search } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { BrandLogo } from '../BrandAssets'
import { Button } from '../ui/button'
import { AuthButtons } from './AuthButtons'
import { MobileSearch, SearchBar } from './SearchBar'

interface HeaderProps {
  onSearch?: (query: string) => void
  onMenuToggle?: () => void
}

export function Header({ onSearch, onMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearchSubmit = useCallback(() => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim())
    }
  }, [searchQuery, onSearch])

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      if (onSearch) {
        onSearch(value)
      }
    },
    [onSearch]
  )

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white px-2 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-evob-primary" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSearch}
          className="md:hidden"
          aria-label="Toggle busca"
        >
          <Search size={20} className="text-evob-primary" />
        </Button>

        <div className="mx-4 hidden max-w-md flex-1 items-center md:flex">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            className="relative flex-1"
          />
        </div>

        <Link href="/" className="flex flex-1 justify-center" aria-label="Home">
          <BrandLogo priority className="h-8 w-auto" />
        </Link>

        <AuthButtons isMobile={false} />
        <div className="md:hidden">
          <AuthButtons isMobile />
        </div>
      </div>

      {isSearchOpen && (
        <MobileSearch
          value={searchQuery}
          onChange={handleSearchChange}
          onClose={toggleSearch}
        />
      )}
    </header>
  )
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-50 bg-black/80 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div className="flex items-center">
            <BrandLogo />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            aria-label="Fechar menu"
          >
            <Search className="text-evob-primary size-5" />
          </Button>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <AuthButtons />
        </div>
      </aside>
    </>
  )
}
