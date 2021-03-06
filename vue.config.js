const path = require("path");

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}
// vue.config.js
module.exports = {
  lintOnSave: true,
  configureWebpack: {
    devServer: {
      host: "0.0.0.0",
      port: "8000"
    }
  },
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        assets: resolveSrc("src/assets")
      }
    }
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production"
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Cassie";
      return args;
    });
  }
};
