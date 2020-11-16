import '../scss/main.scss'
import GithubAPI from './GithubAPI'
import Ui from './Ui'

const API = new GithubAPI()

document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault()
  Ui.displayError('#search-errors', null) // Hide previous search error

  const username = new FormData(e.target).get('username')

  const user = await API.getUser(username)
  if (user.error) {
    Ui.displayError('#search-errors', user.error)
    return
  }

  const repositories = await API.getRepositories(user.data.login)
  if (repositories.error) {
    Ui.displayError('#repositories', repositories.error)
    return
  }

  Ui.renderUser(user)
  Ui.renderRepositories(repositories)

  repositories.data.forEach(async (repo) => {
    const commits = await API.getCommits(user.data.login, repo.name)
    if (commits.error) {
      Ui.displayError('#commits-errors', commits.error, 'is-info', false)
      return
    }

    Ui.renderCommits(repo.name, commits)
  })
})
