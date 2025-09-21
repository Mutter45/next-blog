export interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      email: string
      date: string
    }
  }
  html_url: string
}

export interface GitHubContributions {
  totalContributions: number
  weeks: Array<{
    contributionDays: Array<{
      date: string
      contributionCount: number
    }>
  }>
}

export interface CommitActivity {
  date: string
  count: number
  commits: GitHubCommit[]
}
