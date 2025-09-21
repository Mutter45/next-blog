'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, Tag, Share2, Code, BookOpen, Zap, Server } from 'lucide-react'
import { BlogPost } from '@/lib/types'
import { useTranslations } from 'next-intl'

interface BlogPostProps {
  post: BlogPost
}

const categoryIcons = {
  leetcode: Zap,
  typescript: Code,
  react: BookOpen,
  nodejs: Server,
  general: BookOpen,
}

export default function BlogPostClient({ post }: BlogPostProps) {
  const t = useTranslations('blog')
  const Icon = categoryIcons[post.category]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-12">
        <article className="max-w-4xl mx-auto">
          {/* 文章头部 */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* 分类标签 */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Icon size={20} className="text-inverse" />
              </div>
              <span className="text-lg text-secondary capitalize">{post.category}</span>
            </div>

            {/* 标题 */}
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              {post.title}
            </h1>

            {/* 摘要 */}
            <p className="text-xl text-secondary mb-8 max-w-3xl mx-auto">{post.excerpt}</p>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-secondary mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{new Date(post.date).toISOString().split('T')[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>
                  {post.readingTime} {t('readingTime')}
                </span>
              </div>
              <button className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Share2 size={20} />
                <span>{t('share')}</span>
              </button>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap justify-center gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-muted rounded-full text-sm text-secondary transition-colors"
                >
                  <Tag size={14} className="inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* 文章内容 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div
              className="glass-card rounded-2xl p-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          {/* 文章底部 */}
          <motion.footer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <div className="text-center">
              <p className="text-secondary mb-6">{t('thanks')}</p>

              <div className="flex justify-center gap-4">
                <Link href="/blog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    {t('viewMore')}
                  </motion.button>
                </Link>

                <button className="bg-transparent text-foreground border border-border px-8 py-3 rounded-full font-semibold transition-all duration-200">
                  {t('shareArticle')}
                </button>
              </div>
            </div>
          </motion.footer>
        </article>
      </main>
    </div>
  )
}
