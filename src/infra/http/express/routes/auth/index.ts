import { Request, Response, Router } from 'express'

import { AuthUserUseCase } from '@application/user/auth/auth-user.use-case'
import { UserRepository } from '@infra/db/user'

const authRoute = Router()

const userRepository = new UserRepository()
const authUseCase = new AuthUserUseCase(userRepository)

authRoute.post('/auth', async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  const tokens = username === undefined
    ? await authUseCase.authByEmail(email, password)
    : await authUseCase.authByUsername(username, password)

  res.status(200).json(tokens)
})

authRoute.post('/refresh-token', async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  const getUseCase = new AuthUserUseCase(userRepository)
  const tokens = await getUseCase.authByRefreshToken(refreshToken)

  res.status(200).json(tokens)
})

export default authRoute
