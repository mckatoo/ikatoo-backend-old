import { MenuRepository } from "@infra/db/menu";
import { Router, Request, Response } from "express"
import { mockedPublicMenu } from "./mock";

const menuRoute = Router();

const menuPageRepository = new MenuRepository();

menuRoute.get("/menu/:title", (req: Request, res: Response) => {
  const { title } = req.params

  res.status(200).json(mockedPublicMenu)
})

menuRoute.post("/menu", (req: Request, res: Response) => {
  const { menu } = req.body

  res.status(201).json(mockedPublicMenu)
})

export default menuRoute
