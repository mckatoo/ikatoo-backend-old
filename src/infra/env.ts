import dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV ?? ''}`
})

export const env = (key: string) => {
  if (process.env[key] === undefined) console.error(`*** ${key} IS UNDEFINED. ***`)
  return `${process.env[key] ?? ''}`
}
