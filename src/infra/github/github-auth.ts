import { env } from '@infra/env'
import axios from 'axios'

export default async (code: string) => {
  const GITHUB_AUTH_URL = 'https://github.com/login/oauth/access_token'
  const params = {
    code,
    redirect_uri: env('REDIRECT_URL'),
    client_id: env('GITHUB_CLIENT_ID'),
    client_secret: env('GITHUB_CLIENT_SECRET')
  }
  try {
    const { data } = await axios.post(GITHUB_AUTH_URL, params, {
      headers: { Accept: 'application/json' }
    })
    return data.access_token
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}
