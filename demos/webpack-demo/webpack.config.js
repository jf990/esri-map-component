const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      "assert": require.resolve("assert"),
      "constants": require.resolve("constants-browserify"),
      "fs": require.resolve("fs-extra"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  }
};
