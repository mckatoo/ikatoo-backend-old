import 'express-async-errors'

import express, { Request, Response } from 'express'

import { errorMiddleware } from './middlewares/error'
import routes from './routes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by').disable('etag')

app.use(routes)

// Status
app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('OK')
})

// Error Handling
app.use(errorMiddleware)

export default app
