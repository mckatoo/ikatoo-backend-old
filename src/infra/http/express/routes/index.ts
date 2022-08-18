import { Router } from "express"
import aboutPageRoute from "./aboutPage"
import menuRoute from "./menu"

const routes = Router()

routes.use(aboutPageRoute)
routes.use(menuRoute)

export default routes 
