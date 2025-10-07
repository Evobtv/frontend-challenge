'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useBrandData } from '@/hooks/useBrand'

import { SignupForm } from './_components/SignupForm'
import { SignupSuccess } from './_components/SignupSuccess'

export default function SignupPage() {
  const [isSuccess, setIsSuccess] = useState(false)
  const { data: brandData } = useBrandData()
  const router = useRouter()

  const handleSignupSuccess = () => {
    setIsSuccess(true)
    setTimeout(() => {
      router.push('/')
    }, 5000)
  }

  const handleGoToCatalog = () => {
    router.push('/')
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col lg:w-1/2">
        <header className="px-6 py-6 lg:px-16 lg:py-8">
          <Link href="/" className="flex items-center gap-2">
            {brandData?.logo ? (
              <Image
                src={brandData.logo}
                alt={brandData.name || 'EVOB'}
                width={80}
                height={32}
              />
            ) : (
              <div className="bg-evob-primary flex size-6 items-center justify-center rounded">
                <span className="text-xs font-bold text-white">E</span>
              </div>
            )}
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 pb-16 lg:px-16">
          <div className="w-full max-w-md">
            {!isSuccess ? (
              <SignupForm onSuccess={handleSignupSuccess} />
            ) : (
              <SignupSuccess onGoToCatalog={handleGoToCatalog} />
            )}
          </div>
        </main>

        <footer className="flex items-center justify-between px-6 py-6 text-sm text-gray-600 lg:px-16">
          <span>© EVOB 2025</span>
          <a
            href="mailto:help@evob.com"
            className="flex items-center gap-2 hover:text-gray-900"
          >
            <Mail size={16} />
            help@evob.com
          </a>
        </footer>
      </div>

      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/images/signup-banner.png"
          alt="Signup banner"
          fill
          priority
          className="object-cover"
          sizes="50vw"
          quality={100}
        />
        <div className="absolute right-0 bottom-0 left-0">
          <Image
            src="/images/signup-banner-footer.png"
            alt="Signup banner footer"
            width={800}
            height={200}
            className="h-auto w-full"
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}
