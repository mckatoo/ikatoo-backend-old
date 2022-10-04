import { CreateLocalizationUseCase } from '@application/localization/create/create-localization.use-case'
import { GetLocalizationUseCase } from '@application/localization/get/get-localization.use-case'
import { LocalizationRepository } from '@infra/db/localization'
import { Request, Response, Router } from 'express'

import { decodeToken } from '../auth/decodeToken'
import { expressVerifyToken } from '../auth/verifyToken'

const localizationRoute = Router()

const localizationRepository = new LocalizationRepository()

localizationRoute.post('/localization', expressVerifyToken, async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const { userId } = decodeToken(accessToken?.split(' ')[1] ?? '')
  const createUseCase = new CreateLocalizationUseCase(localizationRepository)
  const output = await createUseCase.execute({
    user_id: userId,
    ...req.body
  })

  res.status(201).json(output)
})

localizationRoute.get('/localization/user/:userId', expressVerifyToken, async (req: Request, res: Response) => {
  const { userId } = req.params
  const getUseCase = new GetLocalizationUseCase(localizationRepository)
  const localization = await getUseCase.byUserId(userId)

  res.status(200).json(localization)
})

localizationRoute.get('/localization', expressVerifyToken, async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const { userId } = decodeToken(accessToken?.split(' ')[1] ?? '')
  const getUseCase = new GetLocalizationUseCase(localizationRepository)
  const localization = await getUseCase.byUserId(userId)

  res.status(200).json(localization)
})

export default localizationRoute
