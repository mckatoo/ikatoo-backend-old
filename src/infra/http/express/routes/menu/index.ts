import { CreateMenuUseCase } from "@application/menu/create/create-menu.use-case";
import { MenuRepository } from "@infra/db/menu";
import { Router, Request, Response } from "express"
import { mockedPublicMenu } from "./mock";

const menuRoute = Router();

const menuRepository = new MenuRepository();

menuRoute.get("/menu/:title", (req: Request, res: Response) => {
  const { title } = req.params

  res.status(200).json(mockedPublicMenu)
})

menuRoute.post("/menu", async (req: Request, res: Response) => {
  const { menu } = req.body
  const createUseCase = new CreateMenuUseCase(menuRepository);
  const output = await createUseCase.execute(menu);

  res.status(201).json(output)
})

export default menuRoute
