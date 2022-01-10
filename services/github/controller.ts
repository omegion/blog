// @ts-ignore
import Api from "~/services/github/api";

export default class Controller {
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  getRepositories(): Promise<Array<any>> {
    const api = this.api;
    return new Promise(function (resolve, reject) {
      api
        .getRepositories()
        .then((resp: any) => {
          resolve(resp.search.nodes);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}
