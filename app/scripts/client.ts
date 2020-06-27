import { Octokit } from "@octokit/rest"

const client = new Octokit({
  baseUrl: localStorage.getItem('baseUrl'),
  auth: localStorage.getItem('apiKey'),
  userAgent: 'GitHub Stream 2'
})

export default client
