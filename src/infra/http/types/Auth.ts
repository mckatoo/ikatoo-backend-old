/* eslint-disable @typescript-eslint/indent */
export interface AuthResponseType {
  user: {
    id: string
    name: string
    username: string
    email: string
  }
  accessToken: string
  refreshToken: string
}

export type AuthWithAccessTokenResponseType = Omit<
  AuthResponseType,
  'accessToken' | 'refreshToken'
>

export interface SignInProps {
  password: string
  username?: string
  email?: string
}
