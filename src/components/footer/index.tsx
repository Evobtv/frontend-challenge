'use client'

import { memo, useCallback, useState } from 'react'
import { useBrand } from '@/contexts/BrandContext'

import {
  FooterLinks,
  LanguageSelector,
  SocialLinks,
  type PolicyType,
} from './FooterComponents'
import { PolicyModal } from './PolicyModal'

const Footer = memo(function Footer() {
  const [openPolicy, setOpenPolicy] = useState<PolicyType | null>(null)
  const { brandData } = useBrand()

  const handlePolicyClick = useCallback((type: PolicyType) => {
    setOpenPolicy(type)
  }, [])

  const handleCloseModal = useCallback(() => {
    setOpenPolicy(null)
  }, [])

  const policyContent =
    openPolicy === 'terms'
      ? brandData?.terms_and_conditions ||
        '<p>Termos de uso não disponíveis.</p>'
      : brandData?.privacy_policy ||
        '<p>Política de privacidade não disponível.</p>'

  const policyTitle =
    openPolicy === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'

  return (
    <>
      <footer className="font-quattrocento mt-auto py-6 text-xs font-bold">
        <div className="mx-auto max-w-7xl px-4">
          <div className="hidden items-center justify-between md:flex">
            <SocialLinks className="flex items-center gap-5" />

            <div className="flex items-center gap-15">
              <FooterLinks
                className="flex items-center gap-8"
                onPolicyClick={handlePolicyClick}
              />
              <LanguageSelector />
            </div>
          </div>

          <div className="md:hidden">
            <SocialLinks className="mb-4 flex items-center justify-start gap-4" />
            <FooterLinks
              className="flex flex-col items-start gap-2 py-4"
              onPolicyClick={handlePolicyClick}
            />
            <LanguageSelector showSeparator />
          </div>
        </div>
      </footer>

      {openPolicy && (
        <PolicyModal
          isOpen={!!openPolicy}
          onClose={handleCloseModal}
          title={policyTitle}
          content={policyContent}
        />
      )}
    </>
  )
})

export default Footer
