import { Request, Response, Router } from 'express'

import { CreateProjectUseCase } from '@application/project/create/create-project.use-case'
import { GetProjectUseCase } from '@application/project/get/get-project.use-case'
import { ProjectRepository } from '@infra/db/project'
import { decodeToken } from '../auth/decodeToken'
import { expressVerifyToken } from '../auth/verifyToken'

const projectRoute = Router()

const projectRepository = new ProjectRepository()

projectRoute.post('/project', expressVerifyToken, async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const { userId } = decodeToken(accessToken?.split(' ')[1] ?? '')
  const createUseCase = new CreateProjectUseCase(projectRepository)
  const output = await createUseCase.execute({
    user_id: userId,
    ...req.body
  })

  res.status(201).json(output)
})

projectRoute.get('/project/user/:userId', expressVerifyToken, async (req: Request, res: Response) => {
  const { userId } = req.params
  const getUseCase = new GetProjectUseCase(projectRepository)
  const output = await getUseCase.byUserId(userId)

  res.status(200).json(output)
})

projectRoute.get('/project', expressVerifyToken, async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const { userId } = decodeToken(accessToken?.split(' ')[1] ?? '')
  const getUseCase = new GetProjectUseCase(projectRepository)
  const output = await getUseCase.byUserId(userId)

  res.status(200).json(output)
})

export default projectRoute
