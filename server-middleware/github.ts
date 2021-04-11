import { ServerMiddleware } from "@nuxt/types";
import { NuxtOptionsServerMiddleware } from "@nuxt/types/config/server-middleware";

const handler: ServerMiddleware = function (req, res) {
  return res.end(JSON.stringify(req.headers.host));
};

const serverMiddleware: NuxtOptionsServerMiddleware = {
  path: "api/github",
  handler,
};

export default serverMiddleware;
