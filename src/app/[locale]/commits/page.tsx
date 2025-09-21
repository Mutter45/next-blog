import { getRecentCommits, groupCommitsByDate, getCommitStats } from '@/lib/github-api'
import CommitsPageClient from './CommitsPageClient'

export default async function CommitsPage() {
  const commits = await getRecentCommits()
  const commitActivity = groupCommitsByDate(commits)
  const stats = getCommitStats(commits)

  return <CommitsPageClient commits={commits} commitActivity={commitActivity} stats={stats} />
}
