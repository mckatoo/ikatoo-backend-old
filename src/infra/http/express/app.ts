import 'express-async-errors'

import express, { Request, Response } from 'express'

import { env } from '@infra/env'
import cors from 'cors'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  const whitelist = [
    'https://ikatoo.com.br',
    'https://www.ikatoo.com.br',
    'https://ikatoo-backend.fly.dev'
  ]

  const requestOrigin = req.headers.origin
  const originExists = !(
    whitelist.find(origin => origin.includes(requestOrigin ?? '')) == null
  )

  if (env('NODE_ENV').includes('dev') || env('NODE_ENV').includes('test')) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Origin', 'GET,PUT,PATCH,POST,DELETE')
  } else if (env('NODE_ENV').includes('prod') && originExists) {
    res.header('Access-Control-Allow-Origin', requestOrigin)
  }

  app.use(cors())
  next()
})

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
