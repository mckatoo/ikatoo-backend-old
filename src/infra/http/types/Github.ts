export interface GithubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: null
  blog: string
  location: string
  email: string
  hireable: boolean
  bio: string
  twitter_username: null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: Date
  updated_at: Date
  private_gists: number
  total_privateRepos: number
  owned_privateRepos: number
  diskUsage: number
  collaborators: number
  twoFactorAuthentication: boolean
  plan: Plan
}

interface Plan {
  name: string
  space: number
  collaborators: number
  private_repos: number
}
