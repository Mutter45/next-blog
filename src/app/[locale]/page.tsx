'use client'

import { motion } from 'framer-motion'
import { BookOpen, Github, Zap, ArrowRight, Code } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const t = useTranslations()
  // 预定义的粒子位置，避免使用Math.random()
  const particlePositions = [
    { left: '10%', top: '20%' },
    { left: '20%', top: '40%' },
    { left: '30%', top: '10%' },
    { left: '40%', top: '60%' },
    { left: '50%', top: '30%' },
    { left: '60%', top: '15%' },
    { left: '70%', top: '50%' },
    { left: '80%', top: '25%' },
    { left: '90%', top: '35%' },
    { left: '15%', top: '70%' },
    { left: '25%', top: '80%' },
    { left: '35%', top: '90%' },
    { left: '45%', top: '75%' },
    { left: '55%', top: '85%' },
    { left: '65%', top: '95%' },
    { left: '75%', top: '65%' },
    { left: '85%', top: '45%' },
    { left: '95%', top: '55%' },
    { left: '5%', top: '5%' },
    { left: '95%', top: '95%' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* 背景动画粒子 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-50">
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: position.left,
                top: position.top,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + (i % 3) * 0.5,
                repeat: Infinity,
                delay: (i % 5) * 0.4,
              }}
            />
          ))}
        </div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10">
        <Header />

        {/* 英雄区域 */}
        <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            {/* 主标题 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold text-primary mb-6"
            >
              <span className="title-gradient">{t('home.title').split(' ')[0]}</span>
              <br />
              <span className="text-primary">{t('home.title').split(' ')[1]}</span>
            </motion.h1>

            {/* 副标题 */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-secondary mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
            >
              {t('home.subtitle')}
            </motion.p>

            {/* CTA按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
            >
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-200"
                >
                  <BookOpen size={20} />
                  {t('home.startReading')}
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link href="https://github.com/Mutter45" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-foreground border border-border px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-200"
                >
                  <Github size={20} />
                  {t('home.viewCode')}
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* 特色卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-20 px-4"
          >
            {/* LeetCode卡片 */}
            <motion.div whileHover={{ y: -10 }} className="glass-card rounded-2xl p-8">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Zap className="text-primary" size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{t('home.leetcode')}</h3>
                <p className="text-secondary">{t('home.leetcodeDesc')}</p>
              </div>
            </motion.div>

            {/* 技术学习卡片 */}
            <motion.div whileHover={{ y: -10 }} className="glass-card rounded-2xl p-8">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Code className="text-primary" size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{t('home.techLearning')}</h3>
                <p className="text-secondary">{t('home.techLearningDesc')}</p>
              </div>
            </motion.div>

            {/* GitHub提交卡片 */}
            <motion.div whileHover={{ y: -10 }} className="glass-card rounded-2xl p-8">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Github className="text-primary" size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{t('home.codeCommits')}</h3>
                <p className="text-secondary">{t('home.codeCommitsDesc')}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* 统计信息 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-20 px-4"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-4xl font-bold text-primary mb-2"
              >
                50+
              </motion.div>
              <div className="text-secondary">{t('home.stats.leetcode')}</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-4xl font-bold text-primary mb-2"
              >
                20+
              </motion.div>
              <div className="text-secondary">{t('home.stats.articles')}</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="text-4xl font-bold text-primary mb-2"
              >
                365
              </motion.div>
              <div className="text-secondary">{t('home.stats.commits')}</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
                className="text-4xl font-bold text-primary mb-2"
              >
                100%
              </motion.div>
              <div className="text-secondary">{t('home.stats.passion')}</div>
            </div>
          </motion.div>
        </main>

        {/* 页脚 */}
        <Footer />
      </div>
    </div>
  )
}
