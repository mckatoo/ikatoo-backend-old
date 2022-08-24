import { Request, Response } from "express";
import { Router } from "express";

import { UserRepository } from "@infra/db/user";
import { CreateUserUseCase } from "@application/user/create/create-user.use-case";
import { GetUserUseCase } from "@application/user/get/get-user.use-case";

const userRoute = Router();

const userRepository = new UserRepository();

userRoute.post("/user", async (req: Request, res: Response) => {
  const createUseCase = new CreateUserUseCase(userRepository);
  const output = await createUseCase.execute(req.body);

  res.status(201).json(output);
});

userRoute.get("/user/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const getUseCase = new GetUserUseCase(userRepository);
  const output = await getUseCase.byUsername(username);

  res.status(200).json(output);
});

export default userRoute;
