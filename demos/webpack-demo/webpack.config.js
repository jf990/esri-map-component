const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/esri-map-view/dist/esri-map-view/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
  ],
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
