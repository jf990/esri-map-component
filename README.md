![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)
[![License](https://badgen.net/badge/license/MIT/blue)](https://github.com/jf990/esri-map-component/blob/master/LICENSE)
[![ArcGIS](https://badgen.net/badge/ArcGIS%20API%20for%20JavaScript/4.13.0/purple)](https://developers.arcgis.com/javascript/)

# Esri Map View

This is a web component to display an Esri map on a web page. It is built from the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/) and [Stencil](https://github.com/ionic-team/stencil-component-starter) starter project for building standalone Web Components.

## Attributes

`webmap`:
Item ID.

`basemap`:
Basemap identifier or item ID of a custom vector style.

`viewpoint`:
Longitude, latitude, and zoom (lelve of detail) to focus the initial view of the map.

`layers`:
A list of feature services to add to the map.

`pin`:
A symbol to place at the initial viewpoint.

`search`:
Indicates where to place the search widget.

## Usage

This is a web component designed to be used on a web page without any JavaScript coding. It supports setting up the map through tag attributes.

```html
<esri-map-view webmap="96a43d02861547e3ad4e4b91df867660" search="top-right"></esri-map-view>
```

It can be added to a page with a script tag or using a module package manager.

### Script tag

- Include a script tag on your page

```html
<script src='https://unpkg.com/esri-map-view@0.0.1/dist/esri-map-view.js'></script>
```

Then you can use the element anywhere in your HTML, template, JSX, etc.

### Node modules

- Run `npm install esri-map-view --save` to add the module to your `package.json`.
- Add a script tag `<script src='node_modules/esri-map-view/dist/esri-map-view.js'></script>` in the head of your index.html
- Use the element anywhere in your HTML, template, JSX, etc.

### Webpack

- Run `npm install esri-map-view --save` to add the module to your `package.json`.
- Import the module in your JavaScript code `import esri-map-view;`.
- Use the element anywhere in your HTML, template, JSX, etc.

### In a stencil app

- Run `npm install esri-map-view --save`
- Add an import to the npm packages `import esri-map-view;`
- Use the element anywhere in your HTML, templates, JSX, etc.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing](./CONTRIBUTING.md).

## Code of Conduct

Please abide by our [Code of conduct](./CODE_OF_CONDUCT.md) when participating in this project.

## License

[MIT License](./LICENSE). Copyright (c) 2018.
