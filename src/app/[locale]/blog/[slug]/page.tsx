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
  return routing.locales.map((locale) => {
    const params = []
    for (const slug of slugs) {
      params.push({ locale, slug })
    }
    return params
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params
    const post = await getPostData(slug)
    return (
      <>
        <Header />
        <BlogPostClient post={post} />
        <Footer />
      </>
    )
  } catch {
    notFound()
  }
}
