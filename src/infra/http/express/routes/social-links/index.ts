import { CreateSocialLinksUseCase } from '@application/social-links/create/create-social-links.use-case'
import { GetSocialLinksUseCase } from '@application/social-links/get/get-social-links.use-case'
import { SocialLinksRepository } from '@infra/db/social-links'
import { Request, Response, Router } from 'express'

import { decodeToken } from '../auth/decodeToken'
import { expressVerifyToken } from '../auth/verifyToken'

const socialLinksRoute = Router()

const socialLinksRepository = new SocialLinksRepository()

socialLinksRoute.post('/social-links', expressVerifyToken, async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const { userId } = decodeToken(accessToken?.split(' ')[1] ?? '')
  const createUseCase = new CreateSocialLinksUseCase(socialLinksRepository)
  await createUseCase.execute({
    user_id: userId,
    ...req.body
  })

  res.status(201).send()
})

socialLinksRoute.get('/social-links/user/:userId', expressVerifyToken, async (req: Request, res: Response) => {
  const { userId } = req.params
  const getUseCase = new GetSocialLinksUseCase(socialLinksRepository)
  const output = await getUseCase.byUserId(userId)

  res.status(200).json(output)
})

socialLinksRoute.get('/social-links', expressVerifyToken, async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const { userId } = decodeToken(accessToken?.split(' ')[1] ?? '')
  const getUseCase = new GetSocialLinksUseCase(socialLinksRepository)
  const output = await getUseCase.byUserId(userId)

  res.status(200).json(output)
})

export default socialLinksRoute
