import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'esri-map-view',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
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
        }
      ],
      serviceWorker: null // disable service workers
    }
  ],
  devServer: {
    root: "www",
  }
};
