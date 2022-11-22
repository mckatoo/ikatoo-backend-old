import { Request, Response, Router } from 'express'

import { AboutPageRepository } from '@infra/db/about'
import { CreateAboutPageUseCase } from '@application/about-page/create/create-about-page.use-case'
import { GetAboutPageUseCase } from '@application/about-page/get/get-about-page.use-case'
import { expressVerifyToken } from '../auth/verifyToken'
import { UpdateAboutPageUseCase } from '@application/about-page/update/update-about-page.use-case'

const aboutPageRoute = Router()

const aboutPageRepository = new AboutPageRepository()

aboutPageRoute.post(
  '/about',
  expressVerifyToken,
  async (req: Request, res: Response) => {
    const createUseCase = new CreateAboutPageUseCase(aboutPageRepository)
    const output = await createUseCase.execute(req.body)

    res.status(201).json(output)
  }
)

aboutPageRoute.put(
  '/about',
  expressVerifyToken,
  async (req: Request, res: Response) => {
    const updateUseCase = new UpdateAboutPageUseCase(aboutPageRepository)
    const output = await updateUseCase.execute(req.body)

    res.status(201).json(output)
  }
)

aboutPageRoute.get(
  '/about/user_id/:userId',
  async (req: Request, res: Response) => {
    const { userId } = req.params
    const getUseCase = new GetAboutPageUseCase(aboutPageRepository)
    const output = await getUseCase.getByUserId(userId)

    res.status(200).json(output)
  }
)

aboutPageRoute.get(
  '/about/domain/:domain',
  async (req: Request, res: Response) => {
    const { domain } = req.params
    const getUseCase = new GetAboutPageUseCase(aboutPageRepository)
    const output = await getUseCase.getByDomain(domain)

    res.status(200).json(output)
  }
)

export default aboutPageRoute
