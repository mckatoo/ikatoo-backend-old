import { GetUserOutput } from '@application/user/get/get-user.use-case'
import githubApi from './github-api'

type GithubResponse = Omit<GetUserOutput, 'username'> & {
  login: string
}

export default async (accessToken: string) => {
  try {
    const { data: user } = await githubApi(accessToken).get<GithubResponse>(
      '/user'
    )
    return user
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}
