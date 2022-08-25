![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)
[![License](https://badgen.net/badge/license/MIT/blue)](https://github.com/jf990/esri-map-component/blob/master/LICENSE)
[![ArcGIS](https://badgen.net/badge/ArcGIS%20API%20for%20JavaScript/v4.24.0/purple)](https://developers.arcgis.com/javascript/)

# Esri Map View

This is a custom web component to display an Esri map (2D flat map) or scene (3D globe) on a web page. Using this component, you can place a map on any webpage inside a `div` without writing any JavaScript code. It is built from the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) and [Stencil](https://github.com/ionic-team/stencil-component-starter) starter project for building standalone Web Components.

There are two components in this library: `esri-map-view` and `esri-scene-view`. They mostly work the
same: `esri-map-view` displays a map in a 2D map view and `esri-scene-view` displays a 3D globe in
a scene view.

### Example map view

```html
  <esri-map-view
    apikey="YOUR_API_KEY"
    basemap="osm-streets"
    viewpoint="13.3761697,52.5166449,15"
    layers="d3e5c29f5e404aa4b2de29a9f0e37996"
    search="top-right"
    symbol="pin:red"
    symboloffset="0,0"
    popuptitle="Brandenburg Gate"
    popupinfo="This is a historic place you should visit">
  </esri-map-view>
```

## Attributes for `esri-map-view`

All attributes are optional. If an attribute is not provided then a default is used. If no attributes are set then an Open Street Map basemap is used. If a web map is used the initial viewpoint in the web map is used. Override this by setting `viewpoint`.

| Property       | Attribute      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                      | Type     | Default          |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ---------------- |
| `apikey`       | `apikey`       | Set your API key. See the section on [API keys](https://developers.arcgis.com/documentation/mapping-apis-and-services/security/api-keys/).                                                                                                                                                                                                                                                                                                       | `string` | `"YOUR_API_KEY"` |
| `basemap`      | `basemap`      | Indicate a basemap id to use for the map. This property will be overridden by `webmap` if that attribute is provided. If neither `webmap` nor `basemap` are set, then a default basemap is assigned. Options for `basemap` are defined in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap).                                                                                  | `string` | `"osm"`          |
| `layers`       | `layers`       | Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL to the feature service, or the item ID of the feature service. Multiple layers can be separated with a comma.                                                                                                                                                                                                                                 | `string` | `""`             |
| `popupinfo`    | `popupinfo`    | If `symbol` is set, tapping the image will show a pop-up. This is the `content` for that pop-up.                                                                                                                                                                                                                                                                                                                                                 | `string` | `""`             |
| `popuptitle`   | `popuptitle`   | If `symbol` is set, tapping the image will show a pop-up. This is the `title` for that pop-up.                                                                                                                                                                                                                                                                                                                                                   | `string` | `""`             |
| `search`       | `search`       | Include a search widget by indicating where on the map view it should appear. The valid values for this attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is empty/missing or an invalid value then a search widget will not show.                                                                                                                                                                         | `string` | `""`             |
| `symbol`       | `symbol`       | Indicate a symbol to use to mark the location of the initial viewpoint. This is the fully qualified URL to a 64x64 px PNG image. CORS is respected when accessing the image. You can also specify `green-pin` to use a green map pin as the symbol. You can also specify `pin:{color}` to use a text symbol marker and the color value. Use a 6-digit HTML color value or the standard HTML color name.                                          | `string` | `""`             |
| `symboloffset` | `symboloffset` | Some symbols will require an x/y offset so that the registration point of the symbol is exactly on the map point. Here you can specify an x,y offset to adjust the symbol. Use a comma separated coordinate pair.                                                                                                                                                                                                                                | `string` | `""`             |
| `viewpoint`    | `viewpoint`    | Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers expected: latitude (y), longitude (x), and levelOfDetail (LOD). Example: "22.7783,34.1234,9". You should set this if you set a `basemap`. You do not need to set this if you set `webmap` as the web map's initial viewpoint is used. If you do set `viewpoint` and `webmap` then this setting will override the initial viewpoint of the web map. | `string` | `""`             |
| `webmap`       | `webmap`       | Indicate a web map id to use for the map. If neither `webmap` nor `basemap` are set, then a default basemap is assigned.                                                                                                                                                                                                                                                                                                                         | `string` | `""`             |

### Example scene view

```html
  <esri-scene-view
    apikey="YOUR_API_KEY"
    basemap="arcgis-imagery-standard"
    layers="d3e5c29f5e404aa4b2de29a9f0e37996"
    search="top-right"
    symbol="pin:red"
    viewpoint="13.3761697,52.5166449,15"
    popuptitle="Brandenburg Gate"
    popupinfo="This is a historic place you should visit">
  </esri-scene-view>
```

## Attributes for `esri-scene-view`

All attributes are optional. If an attribute is not provided then a default is used. If no attributes are set then an Open Street Map basemap is used. If a web scene is used then the initial viewpoint in the web scene is used. Override this by setting `cameraPosition` or `viewpoint`. If both are set then `cameraPosition` overrides `viewpoint`.

| Property         | Attribute         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Type     | Default          |
| ---------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------- |
| `apikey`         | `apikey`          | Set your API key. See the section on [API keys](https://developers.arcgis.com/documentation/mapping-apis-and-services/security/api-keys/).                                                                                                                                                                                                                                                                                                                                                                                                                                       | `string` | `"YOUR_API_KEY"` |
| `basemap`        | `basemap`         | Indicate a basemap id to use for the map. This property will be overridden by `webscene` if that attribute is provided. If neither `webscene` nor `basemap` are set, then a default basemap is assigned. Options for `basemap` are defined in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap).                                                                                                                                                                                                              | `string` | `"osm"`          |
| `cameraPosition` | `camera-position` | Indicate the camera position for the initial scene viewpoint. This is a string of five comma separated numbers as follows: x,y,z,heading,tilt. If you set this it will override `viewpoint` settings.                                                                                                                                                                                                                                                                                                                                                                            | `string` | `""`             |
| `layers`         | `layers`          | Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL to the feature service, or the item ID of the feature service. Multiple layers can be separated with a comma.                                                                                                                                                                                                                                                                                                                                                                 | `string` | `""`             |
| `popupinfo`      | `popupinfo`       | If `symbol` is set, tapping the image will show a pop-up. This is the `content` for that pop-up.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `string` | `""`             |
| `popuptitle`     | `popuptitle`      | If `symbol` is set, tapping the image will show a pop-up. This is the `title` for that pop-up.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `string` | `""`             |
| `search`         | `search`          | Include a search widget by indicating where on the scene view it should appear. The valid values for this attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is empty/missing or an invalid value then a search widget will not show.                                                                                                                                                                                                                                                                                                       | `string` | `""`             |
| `symbol`         | `symbol`          | Indicate a symbol to use to mark the location of the initial viewpoint. This is the fully qualified URL to a 64x64 px PNG image. CORS is respected when accessing the image. You can also specify `green-pin` to use a green map pin as the symbol. You can also specify `pin:{color}` to use a text symbol marker and the color value. Use a 6-digit HTML color value or the standard HTML color name.                                                                                                                                                                          | `string` | `""`             |
| `symboloffset`   | `symboloffset`    | Some symbols will require an x/y offset so that the registration point of the symbol is exactly on the map point. Here you can specify an x,y offset to adjust the symbol. Use a comma separated coordinate pair.                                                                                                                                                                                                                                                                                                                                                                | `string` | `""`             |
| `viewpoint`      | `viewpoint`       | Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers expected: latitude (y), longitude (x), and levelOfDetail (LOD). Example: "22.7783,34.1234,9". You should set this if you set a `basemap`. You do not need to set this if you set `webscene` as the web scene's initial viewpoint is used. However, this setting will override the web scenes initial viewpoint. The `viewpoint` is not used if `cameraPosition` is also set. For 3D scenes, the level of detail is translated into a 3D camera position height of Z-axis position. | `string` | `""`             |
| `webscene`       | `webscene`        | Indicate a web scene id to use for the map. If neither `webscene` nor `basemap` are set, then a default basemap is assigned.                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `string` | `""`             |

----------------------------------------------

## Maps, scenes, and layers

For more information about using ArcGIS maps, scenes, and layers visit https://developers.arcgis.com/javascript/latest/api-reference/.

## Usage

This is a custom web component designed to be used on a web page without any JavaScript coding. It supports setting up the map through tag attributes.

### Map View

```html
<esri-map-view webmap="96a43d02861547e3ad4e4b91df867660" search="top-right"></esri-map-view>
```

### Scene View

```html
<esri-scene-view webscene="96a43d02861547e3ad4e4b91df867660" search="top-right"></esri-map-view>
```

It can be added to a page with a script tag or using a module package manager.

### Script tag

[Review the demo in `demos/www-demo`](demos/www-demo/README.md).

- Include a script tag on your page

```html
<script src='https://unpkg.com/esri-map-view@0.4.1/dist/esri-map-view.js'></script>
```

Then you can use the element anywhere in your HTML, template, JSX, etc.

### Node modules

- Run `npm install esri-map-view --save` to add the module to your `package.json`.
- Add a script tag `<script src='node_modules/esri-map-view/dist/esri-map-view.js'></script>` in the head of your index.html
- Use the element anywhere in your HTML, template, JSX, etc.

### Webpack

[Review the demo in `demos/webpack-demo`](demos/webpack-demo/README.md).

- Run `npm install esri-map-view --save` to add the module to your `package.json`.
- Import the module in your JavaScript code `import esri-map-view;`.
- Use the element anywhere in your HTML, template, JSX, etc.

### In a stencil app

- Run `npm install esri-map-view --save`
- Add an import to the npm packages `import esri-map-view;`
- Use the element anywhere in your HTML, templates, JSX, etc.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](./CONTRIBUTING.md).

### Develop

All of the source code is in the `src` folder. There are two components, `esri-map-view` for the 2D map display and `esri-scene-view` for the 3D scene globe. Both components utilize common code in the `utils` folder.

* Learn more about Stencil and developing custom components: https://stenciljs.com/docs/api
* Learn more about the ArcGIS API for JavaScript: https://developers.arcgis.com/javascript/latest/

Run the project locally using `npm start`. Your default browser should open at `http://localhost:3333` where you can review your changes.

Edit the `tsx` and `css` files. The `readme.md` files are automatically generated from source code comments, so they should not be edited directly.

### Testing

Create unit tests in `*.spec.ts` files. They are picked up by Jest. See [Jest documentation](https://jestjs.io/docs/getting-started) to learn more about unit testing with Jest.

Run the tests with `npm test`.

We expect all code to have a unit test with adequate coverage. If you add new code, there should be unit tests to verify the new functionality. If you modify existing functionality, verify the unit tests match. All tests must pass.

If your new functionality affects the demos be sure to update the demo code in the `demos` folder. Verify the demos work as expected.

### Building

Once your new functionality is ready to release, perform the following:

1. Regenerate the documentation. Run `npm run build`.
2. Update README.md.
3. Push up your branch and issue a pull request.

## Code of Conduct

Please abide by our [Code of conduct](./CODE_OF_CONDUCT.md) when participating in this project.

## License

[MIT License](./LICENSE). Copyright (c) 2021.
