import { Router } from 'express'

import aboutPageRoute from './aboutPage'
import authRoute from './auth'
import skillRoute from './skill'
import userRoute from './user'

const routes = Router()

routes.use(aboutPageRoute)
routes.use(userRoute)
routes.use(authRoute)
routes.use(skillRoute)

export default routes
