'use client'

import { motion } from 'framer-motion'
import { Code, Github } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'

interface HeaderProps {
  showBackButton?: boolean
  backHref?: string
  backText?: string
}

export default function Header({ showBackButton = false, backHref = '/', backText }: HeaderProps) {
  const t = useTranslations('nav')

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 gap-4 sm:gap-0">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-primary"
      >
        <Link href="/" className="flex items-center">
          <Code className="inline-block mr-2" />
          Mutter&apos;s Blog
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center items-center sm:justify-end gap-4 sm:gap-6"
      >
        {showBackButton && (
          <Link
            href={backHref}
            className="text-primary hover:text-muted-foreground px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            ← {backText || t('home')}
          </Link>
        )}

        <Link
          href="/blog"
          className="text-primary hover:text-secondary px-3 py-2 rounded-lg transition-all duration-200"
        >
          {t('blog')}
        </Link>
        {/* <Link
          href="/about"
          className="text-primary hover:text-secondary px-3 py-2 rounded-lg transition-all duration-200"
        >
          {t("about")}
        </Link> */}

        {/* <Link href='/commits' className="text-primary hover:text-muted-foreground px-3 py-2 rounded-lg transition-all duration-200">
          {t('commits')}
        </Link> */}
        <ThemeSwitcher />
        <LanguageSwitcher />
        <Link
          href="https://github.com/Mutter45"
          className="text-primary hover:text-secondary px-3 py-2 rounded-lg transition-all duration-200"
        >
          <Github size={20} />
        </Link>
      </motion.div>
    </nav>
  )
}
