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
          dest: "build",
          warn: true
        },
        {
          src: "app.js",
          dest: "build",
          warn: true
        },
        {
          src: "index-mapview.html",
          dest: "build",
          warn: true
        },
        {
          src: "index-sceneview.html",
          dest: "build",
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
