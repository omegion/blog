import { ServerMiddleware } from "@nuxt/types";
import { NuxtOptionsServerMiddleware } from "@nuxt/types/config/server-middleware";

const handler: ServerMiddleware = function (req, res) {
  const data = {
    host: req.headers.host,
    env: process.env,
  };
  return res.end(JSON.stringify(data));
};

const serverMiddleware: NuxtOptionsServerMiddleware = {
  path: "api/github",
  handler,
};

export default serverMiddleware;
