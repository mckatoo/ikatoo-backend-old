import { Router } from 'express'

import aboutPageRoute from './aboutPage'
import authRoute from './auth'
import contactPageRoute from './contact-page'
import localizationRoute from './localization'
import projectRoute from './project'
import skillRoute from './skill'
import skillsPageRoute from './skills-page'
import socialLinksRoute from './social-links'
import userRoute from './user'

const routes = Router()

routes.use(aboutPageRoute)
routes.use(userRoute)
routes.use(authRoute)
routes.use(skillRoute)
routes.use(skillsPageRoute)
routes.use(projectRoute)
routes.use(localizationRoute)
routes.use(socialLinksRoute)
routes.use(contactPageRoute)

export default routes
