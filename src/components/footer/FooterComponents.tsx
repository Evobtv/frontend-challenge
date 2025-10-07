'use client'

import { memo, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { type IconType } from 'react-icons'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'

import { cn } from '@/lib/utils'

interface SocialLink {
  id: string
  icon: IconType
  label: string
  href: string
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp', href: '#' },
  { id: 'youtube', icon: FaYoutube, label: 'YouTube', href: '#' },
  { id: 'facebook', icon: FaFacebook, label: 'Facebook', href: '#' },
  { id: 'instagram', icon: FaInstagram, label: 'Instagram', href: '#' },
] as const

interface SocialLinksProps {
  className?: string
}

export const SocialLinks = memo(function SocialLinks({
  className = '',
}: SocialLinksProps) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ id, icon: Icon, label, href }) => (
        <Link
          key={id}
          href={href}
          className="hover:text-evob-primary text-black transition-colors"
          aria-label={label}
        >
          <Icon size={16} />
        </Link>
      ))}
    </div>
  )
})

export type PolicyType = 'terms' | 'privacy'

interface FooterLinksProps {
  className?: string
  onPolicyClick?: (type: PolicyType) => void
}

export const FooterLinks = memo(function FooterLinks({
  className = '',
  onPolicyClick,
}: FooterLinksProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, type: PolicyType) => {
      e.preventDefault()
      onPolicyClick?.(type)
    },
    [onPolicyClick]
  )

  return (
    <div className={className}>
      <a
        href="#"
        onClick={(e) => handleClick(e, 'terms')}
        className="hover:text-evob-primary cursor-pointer text-sm text-black transition-colors"
      >
        Termos de uso
      </a>
      <a
        href="#"
        onClick={(e) => handleClick(e, 'privacy')}
        className="hover:text-evob-primary cursor-pointer text-sm text-black transition-colors"
      >
        Política de privacidade
      </a>
    </div>
  )
})

interface Language {
  id: string
  label: string
  isActive: boolean
}

const LANGUAGES: Language[] = [
  { id: 'pt', label: 'PT', isActive: true },
  { id: 'en', label: 'EN', isActive: false },
  { id: 'es', label: 'ES', isActive: false },
]

interface LanguageSelectorProps {
  activeLanguage?: string
  onLanguageChange?: (languageId: string) => void
  showSeparator?: boolean
}

export const LanguageSelector = memo(function LanguageSelector({
  activeLanguage = 'pt',
  onLanguageChange,
  showSeparator = false,
}: LanguageSelectorProps) {
  const languages = useMemo(
    () =>
      LANGUAGES.map((lang) => ({
        ...lang,
        isActive: lang.id === activeLanguage,
      })),
    [activeLanguage]
  )

  const handleClick = useCallback(
    (langId: string) => {
      onLanguageChange?.(langId)
    },
    [onLanguageChange]
  )

  if (showSeparator) {
    return (
      <div className="flex items-center justify-start gap-2">
        {languages.map(({ id, label, isActive }, index) => (
          <div key={id} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-300">|</span>}
            <button
              onClick={() => handleClick(id)}
              className={cn(
                'hover:text-evob-primary text-sm text-black transition-colors',
                isActive ? 'border-evob-primary border-b-2' : ''
              )}
              aria-label={`Selecionar idioma ${label}`}
            >
              {label}
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4 text-black">
      {languages.map(({ id, label, isActive }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={cn(
            'hover:text-evob-primary text-sm text-black transition-colors',
            isActive ? 'border-evob-primary border-b-2' : ''
          )}
          aria-label={`Selecionar idioma ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
})
