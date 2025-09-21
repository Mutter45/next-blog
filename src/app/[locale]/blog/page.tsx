import { getSortedPostsData } from '@/lib/posts'
import BlogListClient from './BlogListClient'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default async function BlogPage() {
  const posts = await getSortedPostsData()

  return (
    <>
      <Header />
      <BlogListClient posts={posts} />
      <Footer />
    </>
  )
}
