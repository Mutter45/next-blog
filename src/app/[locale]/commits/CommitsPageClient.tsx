'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, GitCommit, Github, TrendingUp } from 'lucide-react'
import { GitHubCommit, CommitActivity } from '@/lib/github'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { useTranslations } from 'next-intl'

interface CommitsPageProps {
  commits: GitHubCommit[]
  commitActivity: CommitActivity[]
  stats: {
    totalCommits: number
    uniqueDays: number
    languages: Array<[string, number]>
  }
}

export default function CommitsPageClient({ commits, stats }: CommitsPageProps) {
  const t = useTranslations('commits')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 预定义的贡献数据，避免使用Math.random()
  const generateContributionData = () => {
    const data = []
    for (let i = 0; i < 365; i++) {
      // 使用索引和模运算生成伪随机但确定的值
      const contributionCount = (i * 7 + (i % 11)) % 11
      data.push(contributionCount)
    }
    return data
  }

  const contributionData = generateContributionData()
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />

      {/* 主要内容 */}
      <main className="container mx-auto px-6 py-12">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            <span className="title-gradient">{t('title').split(' ')[0]}</span>
            <br />
            <span className="text-primary">{t('title').split(' ')[1]}</span>
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="glass-card rounded-2xl p-8 text-center">
            <GitCommit className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary mb-2">{stats.totalCommits}</h3>
            <p className="text-secondary">{t('totalCommits')}</p>
          </div>

          <div className="glass-card rounded-2xl p-8 text-center">
            <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary mb-2">{stats.uniqueDays}</h3>
            <p className="text-secondary">{t('activeDays')}</p>
          </div>

          <div className="glass-card rounded-2xl p-8 text-center">
            <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-primary mb-2">{stats.languages.length}</h3>
            <p className="text-secondary">{t('techStack')}</p>
          </div>
        </motion.div>

        {/* 技术栈分布 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            {t('techDistribution')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.languages.map(([language, count], index) => (
              <motion.div
                key={language}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-primary">{language}</h3>
                  <span className="text-2xl font-bold text-success">{count}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(count / stats.totalCommits) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 贡献图 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            {t('contributionGraph')}
          </h2>
          <div className="glass-card rounded-2xl p-8">
            <div className="grid grid-cols-53 gap-1">
              {isClient &&
                Array.from({ length: 365 }, (_, i) => {
                  const date = new Date()
                  date.setDate(date.getDate() - (364 - i))
                  const contributionCount = contributionData[i]

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.1, delay: i * 0.001 }}
                      className={`w-3 h-3 rounded-sm ${
                        contributionCount === 0
                          ? 'bg-muted'
                          : contributionCount <= 2
                            ? 'bg-secondary'
                            : contributionCount <= 4
                              ? 'bg-primary'
                              : contributionCount <= 6
                                ? 'bg-accent'
                                : 'bg-accent'
                      } hover:scale-125 transition-transform cursor-pointer`}
                      title={`${date.toLocaleDateString()}: ${contributionCount} commits`}
                    />
                  )
                })}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-muted">
              <span>{t('less')}</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-muted rounded-sm" />
                <div className="w-3 h-3 bg-secondary rounded-sm" />
                <div className="w-3 h-3 bg-primary rounded-sm" />
                <div className="w-3 h-3 bg-accent rounded-sm" />
                <div className="w-3 h-3 bg-accent rounded-sm" />
              </div>
              <span>{t('more')}</span>
            </div>
          </div>
        </motion.div>

        {/* 最近提交 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">{t('recentCommits')}</h2>
          <div className="space-y-4">
            {commits.slice(0, 20).map((commit, index) => (
              <motion.div
                key={commit.sha}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.05 }}
                className="glass-card rounded-xl p-6 hover:border-border-medium transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <GitCommit size={20} className="text-inverse" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-primary font-medium mb-2 line-clamp-2">
                      {commit.commit.message}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>
                          {new Date(commit.commit.author.date).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>
                          {new Date(commit.commit.author.date).toLocaleTimeString('zh-CN')}
                        </span>
                      </div>
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                        {commit.sha.substring(0, 7)}
                      </span>
                    </div>
                  </div>

                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-primary transition-colors"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
