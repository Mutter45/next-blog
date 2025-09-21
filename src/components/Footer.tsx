'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('home')
  return (
    <footer className="text-center pb-5 text-secondary">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <p>{t('footer')}</p>
      </motion.div>
    </footer>
  )
}
