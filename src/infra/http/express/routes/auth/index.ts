import { Request, Response, Router } from 'express'

import { AuthUserUseCase } from '@application/user/auth/auth-user.use-case'
import { UserRepository } from '@infra/db/user'
import githubAuth from '@infra/github/github-auth'
import githubFetchUser from '@infra/github/github-fetch-user'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { generateString } from '@infra/generate'
import { GetUserUseCase } from '@application/user/get/get-user.use-case'

const authRoute = Router()

const userRepository = new UserRepository()
const authUseCase = new AuthUserUseCase(userRepository)

authRoute.post('/', async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  const tokens =
    username === undefined
      ? await authUseCase.authByEmail(email, password)
      : await authUseCase.authByUsername(username, password)

  res.status(200).json(tokens)
})

authRoute.post('/refresh-token', async (req: Request, res: Response) => {
  const refreshToken = req.headers.authorization?.split(' ')[1] ?? ''
  const authUseCase = new AuthUserUseCase(userRepository)
  const tokens = await authUseCase.authByRefreshToken(refreshToken)

  res.status(200).json(tokens)
})

authRoute.post('/github', async (req: Request, res: Response) => {
  const { code } = req.body
  const githubAccessToken = await githubAuth(code)
  const githubUser = await githubFetchUser(githubAccessToken)
  if (githubUser != null) {
    const createUserUseCase = new CreateUserUseCase(userRepository)
    const origin = req.headers.origin
    const domain = origin?.split('/')[2].replace('www.', '') ?? ''
    const password = generateString()
    await createUserUseCase.execute({
      id: githubUser.id,
      domain,
      email: githubUser.email,
      name: githubUser.name,
      username: githubUser.username,
      password
    })
    const getUserUseCase = new GetUserUseCase(userRepository)
    const user = await getUserUseCase.byEmail(githubUser.email)
    const tokens =
      githubUser.username === undefined
        ? await authUseCase.authByEmail(githubUser.email, password)
        : await authUseCase.authByUsername(githubUser.username, password)
    return res.status(200).json({ user, ...tokens })
  }
  res.status(500).send()
})

export default authRoute
