const stencil = require("@stencil/webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  "plugins": [
    new stencil.StencilPlugin({
      collections: [
        "node-modules/esri-map-view/dist/esri-map-view"
    ]})
  ]
};
