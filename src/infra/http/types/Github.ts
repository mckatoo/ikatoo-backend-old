export interface GithubUser {
  login: string
  id: number
  nodeID: string
  avatarURL: string
  gravatarID: string
  url: string
  htmlURL: string
  followersURL: string
  followingURL: string
  gistsURL: string
  starredURL: string
  subscriptionsURL: string
  organizationsURL: string
  reposURL: string
  eventsURL: string
  receivedEventsURL: string
  type: string
  siteAdmin: boolean
  name: string
  company: null
  blog: string
  location: string
  email: string
  hireable: boolean
  bio: string
  twitterUsername: null
  publicRepos: number
  publicGists: number
  followers: number
  following: number
  createdAt: Date
  updatedAt: Date
  privateGists: number
  totalPrivateRepos: number
  ownedPrivateRepos: number
  diskUsage: number
  collaborators: number
  twoFactorAuthentication: boolean
  plan: Plan
}

interface Plan {
  name: string
  space: number
  collaborators: number
  privateRepos: number
}
