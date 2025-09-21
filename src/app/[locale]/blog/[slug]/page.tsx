import { getPostData, getAllPostSlugs } from '@/lib/posts'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { routing } from '@/i18n/routing'

interface BlogPostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  const params = []

  // 为每个 slug 和每个 locale 生成参数组合
  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
  }

  return params
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  try {
    const post = await getPostData(slug)
    return (
      <>
        <Header />
        <BlogPostClient post={post} />
        <Footer />
      </>
    )
  } catch (error) {
    console.error('Error loading post:', error)
    notFound()
  }
}
