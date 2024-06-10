import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'esri-map-view',
  srcDir: './src',
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'dist-custom-elements'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      copy: [
        {
          src: "secret.js",
          dest: "build/secret.js",
          warn: true
        },
        {
          src: "app.js",
          dest: "build/app.js",
          warn: true
        },
        {
          src: "index-mapview.html",
          dest: "build/index-mapview.html",
          warn: true
        },
        {
          src: "index-sceneview.html",
          dest: "build/index-sceneview.html",
          warn: true
        }
      ],
      serviceWorker: null // disable service workers
    }
  ],
  devServer: {
    root: "www",
  }
};
