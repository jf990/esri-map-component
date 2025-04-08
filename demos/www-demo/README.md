# Demo for web page

This demo shows how to use the `<esri-map-view>` custom component on a web page without a bundler. To view this webpage open `index.html` in a web browser. The package is loaded from the npm package registry CDN.

Review the code in `index.html`.

1. Load the script from the npm CDN:

   ```html
   <script type="module" src="https://unpkg.com/esri-map-view@0.9.2/dist/esri-map-view/esri-map-view.esm.js"></script>
   ```

2. Setup the HTML and CSS for your use of the custom component:

   ```html
   <esri-map-view ...></esri-map-view>
   ```

3. Set your API key

   ```html
   <esri-map-view
     apikey="YOUR_API_KEY"
   ```

4. Set the attributes to the component for your use case. Refer to the documentation for an explanation of each attribute.
