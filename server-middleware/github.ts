import { ServerMiddleware } from "@nuxt/types";
import { NuxtOptionsServerMiddleware } from "@nuxt/types/config/server-middleware";

// const TRUSTED_DOMAINS = ["localhost", "omegion.dev", "preview.omegion.dev"];

const handler: ServerMiddleware = function (req, res) {
  const data = {
    headers: req.headers,
    remoteAddress: req.socket.remoteAddress,
  };
  return res.end(JSON.stringify(data));
};

const serverMiddleware: NuxtOptionsServerMiddleware = {
  path: "api/github",
  handler,
};

export default serverMiddleware;
