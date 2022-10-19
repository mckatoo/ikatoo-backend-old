import axios from 'axios'

const githubApi = (accessToken: string) =>
  axios.create({
    baseURL: 'https://api.github.com',
    headers: { Authorization: `Bearer ${accessToken}` }
  })

export default githubApi
