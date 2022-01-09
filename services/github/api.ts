// @ts-ignore
import { Octokit } from "@octokit/rest";
import Query from "./query";

const { graphql } = require("@octokit/graphql");

export default class Api {
  private readonly graphql: Octokit;

  constructor(token: string) {
    this.graphql = Api.getGraphql(token);
  }

  private static getGraphql(token: string): Octokit {
    return graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });
  }

  async getRepositories() {
    const query = Query.getRepositories();
    // @ts-ignore
    return await this.graphql(query);
  }

  async getRepository(owner: string, name: string) {
    const query = Query.getRepository(owner, name);
    // @ts-ignore
    return await this.graphql(query);
  }
}
