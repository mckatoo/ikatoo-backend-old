import { CreateSkillsPageUseCase } from '@application/skills-page/create/create-skills-page.use-case'
import { GetSkillsPageUseCase } from '@application/skills-page/get/get-skills-page.use-case'
import { SkillsPagesRepository } from '@infra/db/skills-page'
import { Request, Response, Router } from 'express'

import { expressVerifyToken } from '../auth/verifyToken'

const skillsPageRoute = Router()

const skillsPageRepository = new SkillsPagesRepository()

skillsPageRoute.post('/skills-page', expressVerifyToken, async (req: Request, res: Response) => {
  const createUseCase = new CreateSkillsPageUseCase(skillsPageRepository)
  await createUseCase.execute(req.body)

  res.status(201).send()
})

skillsPageRoute.get('/skills-page', async (req: Request, res: Response) => {
  const { domain } = req.body
  const getUseCase = new GetSkillsPageUseCase(skillsPageRepository)
  const skillsPage = await getUseCase.getByDomain(domain)

  res.status(200).json(skillsPage)
})

export default skillsPageRoute
