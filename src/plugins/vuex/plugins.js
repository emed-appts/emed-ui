import createLogger from "vuex/dist/logger";

const plugins = [];
if (process.env.NODE_ENV !== "production") {
  plugins.push(createLogger());
}

export default plugins;
