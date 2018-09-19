var webpack = require("webpack");

module.exports = {
  pages: {
    "emed-appts": {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new webpack.ContextReplacementPlugin(
        /moment[\\/]locale$/,
        /^\.\/(de-at)$/
      )
    ]
  }
};
