# Demo for webpack

Using the custom component with [webpack](https://webpack.js.org/) is a little tricky. The documentation on [Stencil Framework Integrations](https://stenciljs.com/docs/javascript) is not very clear or helpful. To use a custom component built with Stencil in a project that is bundled with webpack you must install the package and then call `defineCustomElements` before you can render the components on a page.

## If starting a new project from scratch

1. Create a new npm project.
   - `npm init -y`

2. Add packages
   - `npm install webpack --save-dev`
   - `npm install webpack-cli --save-dev`

## Update an existing project

1. Add the custom component
   - `npm install esri-map-view --save`

2. Update web-pack-config.js

   ```json
    "plugins": [
    new stencil.StencilPlugin({
      collections: [
        'node-modules/esri-map-view/dist/esri-map-view'
      ]})
    ]
   ```

3. Create or update src/index.js

   ```javascript
   import { defineCustomElements } from "esri-map-view/loader";

   defineCustomElements(window);
   ```

4. Create or update the webpage
   - See `src/index.html`

5. Build the bundle. This updates the `./dist` folder with the site build.
   - `npm run build`

6. Open `./dist/index.html` in a web browser.
