import { GitHubCommit, GitHubContributions, CommitActivity } from './github'

// GitHub API 配置
const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_USERNAME = 'Mutter45' // 替换为实际的GitHub用户名

// 获取最近的提交记录
export async function getRecentCommits(): Promise<GitHubCommit[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }, // 1小时缓存
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub data')
    }

    const events = await response.json()

    // 过滤出push事件并提取提交信息
    const commits: GitHubCommit[] = []

    events.forEach(
      (event: {
        type: string
        payload: {
          commits?: Array<{
            sha: string
            message: string
            author: { name: string; email: string; date: string }
            url: string
          }>
        }
      }) => {
        if (event.type === 'PushEvent' && event.payload.commits) {
          event.payload.commits.forEach(
            (commit: {
              sha: string
              message: string
              author: { name: string; email: string; date: string }
              url: string
            }) => {
              commits.push({
                sha: commit.sha,
                commit: {
                  message: commit.message,
                  author: {
                    name: commit.author.name,
                    email: commit.author.email,
                    date: commit.author.date,
                  },
                },
                html_url: commit.url,
              })
            },
          )
        }
      },
    )

    return commits.slice(0, 50) // 返回最近50个提交
  } catch (error) {
    console.error('Error fetching GitHub commits:', error)
    return []
  }
}

// 获取贡献图数据（模拟数据，因为需要GitHub token）
export async function getContributionData(): Promise<GitHubContributions> {
  // 生成模拟的贡献数据
  const weeks = []
  const today = new Date()

  for (let i = 51; i >= 0; i--) {
    const weekDate = new Date(today)
    weekDate.setDate(weekDate.getDate() - i * 7)

    const contributionDays = []
    for (let j = 0; j < 7; j++) {
      const dayDate = new Date(weekDate)
      dayDate.setDate(dayDate.getDate() + j)

      // 随机生成贡献数量（0-10）
      const contributionCount = Math.floor(Math.random() * 11)

      contributionDays.push({
        date: dayDate.toISOString().split('T')[0],
        contributionCount,
      })
    }

    weeks.push({
      contributionDays,
    })
  }

  const totalContributions = weeks.reduce((total, week) => {
    return (
      total +
      week.contributionDays.reduce((weekTotal, day) => {
        return weekTotal + day.contributionCount
      }, 0)
    )
  }, 0)

  return {
    totalContributions,
    weeks,
  }
}

// 按日期分组提交
export function groupCommitsByDate(commits: GitHubCommit[]): CommitActivity[] {
  const grouped = new Map<string, GitHubCommit[]>()

  commits.forEach((commit) => {
    const date = commit.commit.author.date.split('T')[0]
    if (!grouped.has(date)) {
      grouped.set(date, [])
    }
    grouped.get(date)!.push(commit)
  })

  return Array.from(grouped.entries())
    .map(([date, commits]) => ({
      date,
      count: commits.length,
      commits,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 获取提交统计信息
export function getCommitStats(commits: GitHubCommit[]) {
  const totalCommits = commits.length
  const uniqueDays = new Set(commits.map((commit) => commit.commit.author.date.split('T')[0])).size

  const languages = new Map<string, number>()
  commits.forEach((commit) => {
    // 简单的语言检测（基于提交消息）
    const message = commit.commit.message.toLowerCase()
    if (message.includes('typescript') || message.includes('ts')) {
      languages.set('TypeScript', (languages.get('TypeScript') || 0) + 1)
    }
    if (message.includes('react')) {
      languages.set('React', (languages.get('React') || 0) + 1)
    }
    if (message.includes('node') || message.includes('express')) {
      languages.set('Node.js', (languages.get('Node.js') || 0) + 1)
    }
    if (message.includes('leetcode') || message.includes('algorithm')) {
      languages.set('Algorithm', (languages.get('Algorithm') || 0) + 1)
    }
  })

  return {
    totalCommits,
    uniqueDays,
    languages: Array.from(languages.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5),
  }
}
