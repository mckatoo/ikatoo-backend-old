import { Router } from "express";
import aboutPageRoute from "./aboutPage";
import menuRoute from "./menu";
import userRoute from "./user";

const routes = Router();

routes.use(aboutPageRoute);
routes.use(menuRoute);
routes.use(userRoute);

export default routes;
