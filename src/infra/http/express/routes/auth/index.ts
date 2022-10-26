import { Request, Response, Router } from 'express'

import { UnauthorizedError } from '@application/helpers/api-erros'
import { AuthUserUseCase } from '@application/user/auth/auth-user.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { GetUserUseCase } from '@application/user/get/get-user.use-case'
import { CreateRefreshTokenUseCase } from '@application/user/refresh-token/create/create-refresh-token.use-case'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import githubAuth from '@infra/github/github-auth'
import githubFetchUser from '@infra/github/github-fetch-user'
import { sign } from '@infra/jwt'

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
  if (githubAccessToken == null) throw new UnauthorizedError('Unauthorized github access')

  const githubUser = await githubFetchUser(githubAccessToken)
  if (githubUser != null) {
    const createUserUseCase = new CreateUserUseCase(userRepository)
    const origin = req.headers.origin
    const domain = origin?.split('/')[2].replace('www.', '') ?? ''
    const password = generateString()
    const getUserUseCase = new GetUserUseCase(userRepository)
    let user
    try {
      user = await getUserUseCase.byEmail(githubUser.email)
    } catch {
      await createUserUseCase.execute({
        domain,
        email: githubUser.email,
        name: githubUser.name,
        username: githubUser.login,
        password
      })
      user = await getUserUseCase.byEmail(githubUser.email)
    }

    const accessToken = sign({
      userId: user.id ?? '',
      expiresIn: '1h'
    })
    const refreshTokenUseCase = new CreateRefreshTokenUseCase(userRepository)
    const refreshToken = await refreshTokenUseCase.execute(user.id ?? '')
    const tokens = { accessToken, refreshToken }

    return res.status(200).json({ user, ...tokens })
  }
  res.status(500).send()
})

export default authRoute
