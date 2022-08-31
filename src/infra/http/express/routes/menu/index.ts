import { CreateMenuUseCase } from '@application/menu/create/create-menu.use-case'
import { GetMenuUseCase } from '@application/menu/get/get-menu.use-case'
import { MenuRepository } from '@infra/db/menu'
import { Request, Response, Router } from 'express'

const menuRoute = Router()

const menuRepository = new MenuRepository()

menuRoute.get('/menu/:title', async (req: Request, res: Response) => {
  const { title } = req.params
  // pegar o user_id pelo jwt
  const userId = '7'
  const getUseCase = new GetMenuUseCase(menuRepository)
  const output = await getUseCase.execute(userId, title)

  res.status(200).json(output)
})

menuRoute.post('/menu', async (req: Request, res: Response) => {
  const { menu } = req.body
  const createUseCase = new CreateMenuUseCase(menuRepository)
  const output = await createUseCase.execute(menu)

  res.status(201).json(output)
})

export default menuRoute
