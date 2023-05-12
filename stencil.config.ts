import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'esri-map-view',
  srcDir: './src',
  outputTargets: [
    {
      type: 'dist'
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
          src: "index-1.html"
        }
      ],
      serviceWorker: null // disable service workers
    }
  ],
  devServer: {
    root: "www",
  }
};
