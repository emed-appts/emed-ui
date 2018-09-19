import axios from "axios";
import { setupCache } from "axios-cache-adapter";

import utils from "./utils";

const cache = setupCache({
  // max age of cached entries: 15 minutes
  maxAge: 15 * 60 * 1000,
  // key function to also include query parameters
  // Copyright https://github.com/axios/axios
  key: req => {
    let url = req.url;
    var parts = [];

    utils.forEach(req.params, function serialize(val, key) {
      if (val === null || typeof val === "undefined") {
        return;
      }

      if (utils.isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(utils.encode(key) + "=" + utils.encode(v));
      });
    });

    const serializedParams = parts.join("&");

    if (serializedParams) {
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }

    return url;
  },
  exclude: {
    query: false
  },
  debug: process.env.NODE_ENV !== "production"
});

const api = axios.create({
  adapter: cache.adapter,
  baseURL: process.env.VUE_APP_API_ROOT,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default api;
