import Vue from "vue";
import { Plugin } from "@nuxt/types";
import Vssue from "vssue";
import GithubV3 from "@vssue/api-github-v3";

const plugin: Plugin = (context) => {
  Vue.use(Vssue, {
    api: GithubV3,
    owner: "omegion",
    repo: "blog",
    clientId: context.$config.githubClientId,
    clientSecret: context.$config.githubClientSecret,
    proxy: (url) => `${url}`,
  });
};

export default plugin;
