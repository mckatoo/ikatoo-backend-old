import { Request, Response, Router } from 'express'

import { CreateSkillUseCase } from '@application/skill/create/create-skill.use-case'
import { GetSkillUseCase } from '@application/skill/get/get-skill.use-case'
import { SkillRepository } from '@infra/db/skill'
import { expressVerifyToken } from '../auth/verifyToken'
import { decodeToken } from '../auth/decodeToken'

const skillRoute = Router()

const skillRepository = new SkillRepository()

skillRoute.post('/skill', expressVerifyToken, async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const { userId } = decodeToken(accessToken?.split(' ')[1] ?? '')
  const createUseCase = new CreateSkillUseCase(skillRepository)
  const output = await createUseCase.execute({
    user_id: userId,
    ...req.body
  })

  res.status(201).json(output)
})

skillRoute.get('/skill/user/:userId', expressVerifyToken, async (req: Request, res: Response) => {
  const { userId } = req.params
  const getUseCase = new GetSkillUseCase(skillRepository)
  const output = await getUseCase.byUserId(userId)

  res.status(200).json(output)
})

skillRoute.get('/skill', expressVerifyToken, async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const { userId } = decodeToken(accessToken?.split(' ')[1] ?? '')
  const getUseCase = new GetSkillUseCase(skillRepository)
  const output = await getUseCase.byUserId(userId)

  res.status(200).json(output)
})

export default skillRoute
