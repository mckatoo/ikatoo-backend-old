import 'express-async-errors'

import express, { Request, Response } from 'express'

import { env } from '@infra/env'
import cors, { CorsOptions } from 'cors'
import { errorMiddleware } from './middlewares/error'
import routes from './routes'

const app = express()
app.use(express.json())

if (env('NODE_ENV').includes('prod')) {
  const whitelist = ['https://ikatoo.com.br', 'https://www.ikatoo.com.br']
  const corsOptions: CorsOptions = {
    origin (requestOrigin, callback) {
      if (whitelist.includes(requestOrigin ?? '')) {
        callback(null, true)
      } else {
        callback(new Error(`Deny access to: ${requestOrigin ?? ''}`))
      }
    }
  }
  app.use(cors(corsOptions))
} else if (env('NODE_ENV').includes('dev') || env('NODE_ENV').includes('test')) {
  app.use(cors())
}

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
