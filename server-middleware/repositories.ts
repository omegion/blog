import { ServerMiddleware } from "@nuxt/types";
import { NuxtOptionsServerMiddleware } from "@nuxt/types/config/server-middleware";
import GithubApi from "../services/github/api";

const handler: ServerMiddleware = async function (req, res) {
  const api = new GithubApi();

  let queryRepositoryName = null;
  if (typeof req.originalUrl === "string") {
    queryRepositoryName = new URL(
      `https://localhost.com${req.url}`
    ).searchParams.get("repo");
  }

  if (queryRepositoryName) {
    return await api
      .getRepository(queryRepositoryName)
      .then((data) => {
        return res.end(JSON.stringify(data.repository));
      })
      .catch((err) => {
        return res.end(JSON.stringify(err));
      });
  } else {
    return await api
      .getRepositories()
      .then((data) => {
        return res.end(JSON.stringify(data.search.nodes));
      })
      .catch((err) => {
        return res.end(JSON.stringify(err));
      });
  }
};

const serverMiddleware: NuxtOptionsServerMiddleware = {
  path: "api/repositories",
  handler,
};

export default serverMiddleware;
