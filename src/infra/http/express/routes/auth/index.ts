import { UnauthorizedError } from '@application/helpers/api-erros'
import { AuthUserUseCase } from '@application/user/auth/auth-user.use-case'
import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { GetUserUseCase } from '@application/user/get/get-user.use-case'
import { CreateRefreshTokenUseCase } from '@application/user/refresh-token/create/create-refresh-token.use-case'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import githubAuth from '@infra/github/github-auth'
import githubFetchUser from '@infra/github/github-fetch-user'
import { AuthWithAccessTokenResponseType } from '@infra/http/types/Auth'
import { sign } from '@infra/jwt'
import { Request, Response, Router } from 'express'

import { decodeToken } from './decodeToken'
import { expressVerifyToken } from './verifyToken'

const authRoute = Router()

const userRepository = new UserRepository()
const authUseCase = new AuthUserUseCase(userRepository)
const getUserUseCase = new GetUserUseCase(userRepository)
const createUserUseCase = new CreateUserUseCase(userRepository)
const refreshTokenUseCase = new CreateRefreshTokenUseCase(userRepository)

authRoute.post('/', async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  try {
    const user =
      username !== (null ?? '')
        ? await getUserUseCase.byUsername(username)
        : await getUserUseCase.byEmail(email)
    const tokens =
      username !== (null ?? '')
        ? await authUseCase.authByUsername(username, password)
        : await authUseCase.authByEmail(email, password)

    return res.status(200).json({
      ...tokens,
      user: {
        ...user,
        avatar: {
          url: user.avatar_url,
          alt: user.avatar_alt
        }
      }
    })
  } catch (error) {
    console.log(error)
    if (error instanceof Error) throw new UnauthorizedError('Credentials invalid.')
  }
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
  if (githubAccessToken == null) {
    throw new UnauthorizedError('Unauthorized github access')
  }

  const githubUser = await githubFetchUser(githubAccessToken)
  if (githubUser != null) {
    const origin = req.headers.origin
    const domain = origin?.split('/')[2].replace('www.', '') ?? ''
    const password = generateString()
    let user
    try {
      user = await getUserUseCase.byEmail(githubUser.email)
    } catch {
      await createUserUseCase.execute({
        domain,
        email: githubUser.email,
        name: githubUser.name,
        username: githubUser.login,
        password,
        avatar_url: githubUser.avatar_url,
        avatar_alt: githubUser.name
      })
      user = await getUserUseCase.byEmail(githubUser.email)
    }

    const accessToken = sign({
      userId: user.id,
      expiresIn: '1h'
    })
    const refreshToken = await refreshTokenUseCase.execute(user.id ?? '')
    const tokens = { accessToken, refreshToken }

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: {
          url: user.avatar_url,
          alt: user.avatar_alt
        }
      },
      ...tokens
    })
  }
  res.status(500).send()
})

authRoute.post(
  '/access-token',
  expressVerifyToken,
  async (req: Request, res: Response) => {
    const { authorization } = req.headers

    if (authorization != null) {
      const accessToken = authorization.split(' ')[1]
      const { userId } = decodeToken(accessToken)
      const user = await getUserUseCase.byId(userId)
      const data: AuthWithAccessTokenResponseType = {
        user: {
          id: user.id ?? '',
          username: user.username,
          email: user.email,
          name: user.name,
          avatar: {
            url: user.avatar_url,
            alt: user.avatar_alt
          }
        }
      }
      return res.status(200).send(data)
    }

    return res.status(500).send()
  }
)

export default authRoute
