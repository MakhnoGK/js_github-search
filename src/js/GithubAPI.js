import Http from './Http'

export default class GithubAPI {
  constructor () {
    this.API_URL = 'https://api.github.com'
  }

  async getUser (username) {
    const user = await Http.get(`${this.API_URL}/users/${username}`)
    return user
  }

  async getRepositories (username) {
    const repositories = await Http.get(`${this.API_URL}/users/${username}/repos`,
      { sort: 'created', per_page: 3, page: 1 }
    )
    return repositories
  }

  async getCommits (username, repositoryName) {
    const commits = await Http.get(`${this.API_URL}/repos/${username}/${repositoryName}/commits`,
      { per_page: 3 })
    return commits
  }
}
