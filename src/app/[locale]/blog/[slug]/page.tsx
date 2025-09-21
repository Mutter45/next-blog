import { getPostData, getAllPostSlugs } from '@/lib/posts'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
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
