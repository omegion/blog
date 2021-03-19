export default class Query {
  static getRepositories(username: string) {
    return `
      {
        search(type: REPOSITORY, query: """
        user:${username}
        is:public
        sort:stars
        """, last: 100) {
          nodes {
            ... on Repository {
              id
              name
              stargazerCount
              languages(first: 1) {
                nodes {
                  color
                  name
                }
              }
              description
              forkCount
              latestRelease {
                name
                tagName
              }
            }
          }
        }
      }
    `;
  }

  static getRepository(username: string, name: string) {
    return `
      {
        repository(name: "${name}", owner: "${username}") {
          name
          stargazerCount
          description
          forkCount
          url
          createdAt
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          collaborators(first: 10) {
            nodes {
              avatarUrl
              name
            }
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          languages(first: 10) {
            nodes {
              color
              name
            }
          }
          latestRelease {
            name
            tagName
            url
          }
        }
      }
    `;
  }
}
