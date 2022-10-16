import api from './api'

export default async (accessToken: string) => {
  try {
    const { data: user } = await api(accessToken).get('user')
    return user
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
  }
}
