import Mustache from 'mustache'
import errorTemplate from '../templates/error.html'
import repositoryTemplate from '../templates/repository.html'
import userCard from '../templates/user-card.html'
import commitsTemplate from '../templates/commits.html'

export default class Ui {
  static renderUser (user) {
    document.getElementById('user-info').innerHTML = Mustache.render(userCard, {
      user: user.data
    })
  }

  static renderRepositories (repositories) {
    document.getElementById('repositories').innerHTML = Mustache.render(
      repositoryTemplate,
      {
        repositories: repositories.data
      }
    )
  }

  static renderCommits (repoName, commits) {
    document.querySelector(
      `[data-repo="${repoName}"]`
    ).innerHTML = Mustache.render(commitsTemplate, { commits: commits.data })
  }

  static displayError (
    containerSelector,
    errorObj,
    className = 'is-danger',
    showStatus = true
  ) {
    if (!errorObj) return

    document.querySelector(containerSelector).innerHTML = Mustache.render(
      errorTemplate,
      {
        error: errorObj,
        className,
        showStatus
      }
    )
  }
}
