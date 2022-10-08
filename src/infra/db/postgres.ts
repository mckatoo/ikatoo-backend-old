import { env } from '@infra/env'
import pgPromise from 'pg-promise'

const pgp = pgPromise({})

const postgres = pgp({
  user: env('POSTGRES_USER'),
  password: env('POSTGRES_PASSWORD'),
  host: env('POSTGRES_HOST'),
  port: parseInt(env('POSTGRES_PORT')),
  database: env('POSTGRES_DB'),
  idleTimeoutMillis: 100
})

export default postgres
