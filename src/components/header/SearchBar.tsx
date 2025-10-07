'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { Loader2, Search, X } from 'lucide-react'

import { useDebounce } from '@/hooks/useDebounce'

import { Input } from '../ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  className?: string
}

export const SearchBar = memo(function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Busca',
  className,
}: SearchBarProps) {
  const [isTyping, setIsTyping] = useState(false)
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    if (value !== debouncedValue && value.length > 0) {
      setIsTyping(true)
    } else {
      setIsTyping(false)
    }
  }, [value, debouncedValue])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit()
    },
    [onSubmit]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative">
        {isTyping ? (
          <Loader2
            size={16}
            className="text-evob-primary absolute top-1/2 left-3 -translate-y-1/2 transform animate-spin"
          />
        ) : (
          <Search
            size={16}
            className="text-evob-primary absolute top-1/2 left-3 -translate-y-1/2 transform"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full rounded-lg border-none py-2 pr-4 pl-10 shadow-none placeholder:text-base placeholder:font-medium placeholder:text-black"
        />
      </div>
    </form>
  )
})

interface MobileSearchProps {
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

export const MobileSearch = memo(function MobileSearch({
  value,
  onChange,
  onClose,
}: MobileSearchProps) {
  const [isTyping, setIsTyping] = useState(false)
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    if (value !== debouncedValue && value.length > 0) {
      setIsTyping(true)
    } else {
      setIsTyping(false)
    }
  }, [value, debouncedValue])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <div className="border-t border-gray-200 bg-white p-4 md:hidden">
      <form onSubmit={handleSubmit} className="relative">
        {isTyping ? (
          <Loader2
            size={20}
            className="absolute top-1/2 left-3 -translate-y-1/2 transform animate-spin text-gray-400"
          />
        ) : (
          <Search
            size={20}
            className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
          />
        )}
        <Input
          type="text"
          placeholder="Buscar cursos..."
          value={value}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 py-3 pr-10 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          autoFocus
        />
        <button
          type="button"
          onClick={onClose}
          className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
          aria-label="Fechar busca"
        >
          <X size={20} />
        </button>
      </form>
    </div>
  )
})
