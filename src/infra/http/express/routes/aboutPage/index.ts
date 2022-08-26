import { Request, Response } from "express";
import { Router } from "express";

import { AboutPageRepository } from "@infra/db/about";
import { CreateAboutPageUseCase } from "@application/about-page/create/create-about-page.use-case";
import { GetAboutPageUseCase } from "@application/about-page/get/get-about-page.use-case";

const aboutPageRoute = Router();

const aboutPageRepository = new AboutPageRepository();

aboutPageRoute.post("/about", async (req: Request, res: Response) => {
  const createUseCase = new CreateAboutPageUseCase(aboutPageRepository);
  const output = await createUseCase.execute(req.body);

  res.status(201).json(output);
});

aboutPageRoute.get("/about/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const getUseCase = new GetAboutPageUseCase(aboutPageRepository);
  const output = await getUseCase.execute(user_id);

  res.status(200).json(output);
});

export default aboutPageRoute;
