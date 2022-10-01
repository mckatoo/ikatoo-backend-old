import { Router } from 'express'

import aboutPageRoute from './aboutPage'
import authRoute from './auth'
import projectRoute from './project'
import skillRoute from './skill'
import skillsPageRoute from './skills-page'
import userRoute from './user'

const routes = Router()

routes.use(aboutPageRoute)
routes.use(userRoute)
routes.use(authRoute)
routes.use(skillRoute)
routes.use(skillsPageRoute)
routes.use(projectRoute)

export default routes
