import { Request, Response, Router } from 'express'

import { CreateUserUseCase } from '@application/user/create/create-user.use-case'
import { GetUserUseCase } from '@application/user/get/get-user.use-case'
import { UserRepository } from '@infra/db/user'
import { expressVerifyToken } from '../auth/verifyToken'

const userRoute = Router()

const userRepository = new UserRepository()

userRoute.post('/user', expressVerifyToken, async (req: Request, res: Response) => {
  const createUseCase = new CreateUserUseCase(userRepository)
  const output = await createUseCase.execute(req.body)

  res.status(201).json(output)
})

userRoute.get('/user', expressVerifyToken, async (req: Request, res: Response) => {
  const { username } = req.params
  const getUseCase = new GetUserUseCase(userRepository)
  const output = await getUseCase.byUsername(username)

  res.status(200).json(output)
})

export default userRoute
