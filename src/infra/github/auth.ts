import { env } from '@infra/env'
import axios from 'axios'

export default async (code: string) => {
  const GITHUB_AUTH_URL = 'https://github.com/login/oauth/access_token'
  const params = {
    client_id: env('GITHUB_CLIENT_ID'),
    client_secret: env('GITHUB_CLIENT_SECRET'),
    code,
    redirect_uri: env('REDIRECT_URL')
  }
  const accessToken = await axios.post(GITHUB_AUTH_URL, params)
  return accessToken
}
