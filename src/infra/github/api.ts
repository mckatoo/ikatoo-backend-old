import axios from 'axios'

const api = (accessToken: string) =>
  axios.create({
    baseURL: 'https://api.github.com',
    headers: { Authorization: `Bearer ${accessToken}` }
  })

export default api
