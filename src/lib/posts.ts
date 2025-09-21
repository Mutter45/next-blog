import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { BlogPost, BlogPostMeta } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function getSortedPostsData(): Promise<BlogPostMeta[]> {
  // 获取文件系统中的文件名
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // 移除 ".md" 以获取文件名
      const slug = fileName.replace(/\.md$/, '')

      // 读取 markdown 文件作为字符串
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // 使用 gray-matter 解析帖子的元数据部分
      const matterResult = matter(fileContents)

      // 计算阅读时间（假设每分钟200字）
      const readingTime = Math.ceil(matterResult.content.split(' ').length / 200)

      // 将数据与 slug 组合
      return {
        slug,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        excerpt: matterResult.data.excerpt || '',
        category: matterResult.data.category || 'general',
        tags: matterResult.data.tags || [],
        readingTime,
      }
    })

  // 按日期排序帖子
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 使用 gray-matter 解析帖子的元数据部分
  const matterResult = matter(fileContents)

  // 使用 remark 将 markdown 转换为 HTML
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  // 计算阅读时间
  const readingTime = Math.ceil(matterResult.content.split(' ').length / 200)

  // 将数据与 slug 组合
  return {
    slug,
    title: matterResult.data.title || '',
    date: matterResult.data.date || '',
    excerpt: matterResult.data.excerpt || '',
    content: contentHtml,
    category: matterResult.data.category || 'general',
    tags: matterResult.data.tags || [],
    readingTime,
  }
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  return getSortedPostsData().then((posts) => posts.filter((post) => post.category === category))
}
