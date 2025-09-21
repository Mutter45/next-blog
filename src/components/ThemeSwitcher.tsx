'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTranslations } from 'next-intl'

type Theme = 'light' | 'dark' | 'system'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('theme')

  useEffect(() => {
    setMounted(true)
    // 从localStorage读取保存的主题设置
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    // 保存主题设置到localStorage
    localStorage.setItem('theme', theme)

    // 应用主题
    const root = document.documentElement

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.setAttribute('data-theme', systemTheme)
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme, mounted])

  // 监听系统主题变化
  useEffect(() => {
    if (!mounted || theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const root = document.documentElement
      const systemTheme = mediaQuery.matches ? 'dark' : 'light'
      root.setAttribute('data-theme', systemTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, mounted])

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg bg-secondary animate-pulse" />
  }

  const getCurrentSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const getEffectiveTheme = () => {
    if (theme === 'system') {
      return getCurrentSystemTheme()
    }
    return theme
  }

  const toggleTheme = () => {
    const effectiveTheme = getEffectiveTheme()
    if (effectiveTheme === 'light') {
      setTheme('dark')
    } else if (effectiveTheme === 'dark') {
      setTheme('light')
    }
  }

  const getCurrentIcon = () => {
    const effectiveTheme = getEffectiveTheme()
    return effectiveTheme === 'light' ? Sun : Moon
  }

  const getCurrentLabel = () => {
    const effectiveTheme = getEffectiveTheme()
    return effectiveTheme === 'light' ? t('light') : t('dark')
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="flex items-center gap-2 text-primary hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted"
        title={getCurrentLabel()}
      >
        {React.createElement(getCurrentIcon(), { size: 16 })}
      </motion.button>
    </div>
  )
}
