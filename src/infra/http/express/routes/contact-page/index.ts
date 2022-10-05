import { CreateContactPageUseCase } from '@application/contact-page/create/create-contact-page.use-case'
import { GetContactPageUseCase } from '@application/contact-page/get/get-contact-page.use-case'
import { ContactPagesRepository } from '@infra/db/contact-page'
import { Request, Response, Router } from 'express'

import { expressVerifyToken } from '../auth/verifyToken'

const contactPageRoute = Router()

const contactPageRepository = new ContactPagesRepository()

contactPageRoute.post('/contact-page', expressVerifyToken, async (req: Request, res: Response) => {
  const createUseCase = new CreateContactPageUseCase(contactPageRepository)
  await createUseCase.execute(req.body)

  res.status(201).send()
})

contactPageRoute.get('/contact-page', async (req: Request, res: Response) => {
  const { domain } = req.body
  const getUseCase = new GetContactPageUseCase(contactPageRepository)
  const contactPage = await getUseCase.getByDomain(domain)

  res.status(200).json(contactPage)
})

export default contactPageRoute
