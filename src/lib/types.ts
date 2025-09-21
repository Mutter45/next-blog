export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  category: 'leetcode' | 'typescript' | 'react' | 'nodejs' | 'general'
  tags: string[]
  readingTime: number
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: 'leetcode' | 'typescript' | 'react' | 'nodejs' | 'general'
  tags: string[]
  readingTime: number
}
