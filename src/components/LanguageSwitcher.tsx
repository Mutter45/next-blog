'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { routing } from '@/i18n/routing'

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const languageNames = {
    zh: { name: '中文', flag: '🇨🇳' },
    en: { name: 'English', flag: '🇺🇸' },
  }

  const currentLanguage = languageNames[locale as keyof typeof languageNames]

  const switchLanguage = (newLocale: string) => {
    // 移除当前语言前缀
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    // 添加新语言前缀
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-primary hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted"
      >
        <Globe size={16} />
        {/* <span>{currentLanguage?.flag}</span> */}
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 top-full mt-2 glass-card rounded-lg py-2 min-w-[120px]"
        >
          {routing.locales.map((loc) => {
            const lang = languageNames[loc as keyof typeof languageNames]
            return (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center gap-2 text-primary"
              >
                {/* <span>{lang.flag}</span> */}
                <span>{lang.name}</span>
              </button>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
