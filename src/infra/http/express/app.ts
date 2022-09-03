import 'express-async-errors'

import express, { NextFunction, Request, Response } from 'express'

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
app.use((error: any, req: Request, res: Response, _: NextFunction) => {
  const httpCode = error.statusCode !== undefined || error?.response?.status || 500
  if (error.toJSON !== undefined) {
    error = error.toJSON()
  }

  return res.status(httpCode).json(error)
})

export default app
