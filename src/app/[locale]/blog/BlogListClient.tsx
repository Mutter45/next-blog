'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Code, BookOpen, Zap, Server } from 'lucide-react'
import { BlogPostMeta } from '@/lib/types'
import { useTranslations } from 'next-intl'

interface BlogListProps {
  posts: BlogPostMeta[]
}

const categoryIcons = {
  leetcode: Zap,
  typescript: Code,
  react: BookOpen,
  nodejs: Server,
  general: BookOpen,
}

export default function BlogListClient({ posts }: BlogListProps) {
  const t = useTranslations('blog')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* 主要内容 */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
            <span className="title-gradient">{t('title')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto px-4">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {Object.keys(categoryIcons).map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]
            const count = posts.filter((post) => post.category === category).length

            return (
              <button
                key={category}
                className="flex items-center gap-2 px-6 py-3 rounded-full glass-card text-primary hover:bg-muted transition-colors"
              >
                <Icon size={20} />
                <span className="capitalize">{category}</span>
                <span className="bg-muted px-3 py-1 rounded-full text-sm text-secondary">
                  {count}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* 博客列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post, index) => {
            const Icon = categoryIcons[post.category]

            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl p-8 hover:border-border-medium transition-all duration-300"
              >
                {/* 分类标签 */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8  bg-accent rounded-full flex items-center justify-center">
                    <Icon size={16} className="text-inverse" />
                  </div>
                  <span className="text-sm text-secondary capitalize">{post.category}</span>
                </div>

                {/* 标题 */}
                <h2 className="text-2xl font-bold text-primary mb-4 line-clamp-2">{post.title}</h2>

                {/* 摘要 */}
                <p className="text-secondary mb-6 line-clamp-2">{post.excerpt}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-3 py-1 bg-muted rounded-full text-sm text-secondary">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* 元信息 */}
                <div className="flex items-center justify-between text-sm text-secondary mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(post.date).toLocaleDateString('zh-CN')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>
                        {post.readingTime} {t('readingTime')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 阅读更多按钮 */}
                <Link href={`/blog/${post.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200"
                  >
                    {t('readMore')}
                    <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.article>
            )
          })}
        </div>

        {/* 空状态 */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpen size={64} className="text-muted mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-2">{t('noArticles')}</h3>
            <p className="text-muted">{t('noArticlesDesc')}</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
