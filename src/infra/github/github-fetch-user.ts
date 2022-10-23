import { GetUserOutput } from '@application/user/get/get-user.use-case'
import githubApi from './github-api'

export default async (accessToken: string) => {
  try {
    const { data: user } = await githubApi(accessToken).get<GetUserOutput>(
      '/user'
    )
    return user
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}
