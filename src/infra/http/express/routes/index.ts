import { Router } from 'express'

import aboutPageRoute from './aboutPage'
import authRoute from './auth'
import userRoute from './user'

const routes = Router()

routes.use(aboutPageRoute)
routes.use(userRoute)
routes.use(authRoute)

export default routes
