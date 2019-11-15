# esri-map-view



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                                                                                                                                                                             | Type       | Default |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------- |
| `basemap`    | `basemap`    | Indicate a basemap id to use for the map. This property will be overridden by `webmap` if that property is provided. If neither `webmap` nor `basemap` are set, then a default basemap is assigned.                                                     | `string`   | `"osm"` |
| `layers`     | --           | Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL to the feature service, or the item ID of the feature service.                                                                                       | `string[]` | `[]`    |
| `popupinfo`  | `popupinfo`  |                                                                                                                                                                                                                                                         | `string`   | `""`    |
| `popuptitle` | `popuptitle` |                                                                                                                                                                                                                                                         | `string`   | `""`    |
| `search`     | `search`     | Include a search widget by indicating where on the map view it should appear. The valid values for this attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is an invalid value then a search widget will not show. | `string`   | `""`    |
| `symbol`     | `symbol`     | Indicate a symbol to use to mark the location of the initial viewpoint.                                                                                                                                                                                 | `string`   | `""`    |
| `viewpoint`  | `viewpoint`  | Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers expected: latitude (y), longitude (x), and levelOfDetail (LOD). Example: "22.7783,34.1234,9"                                                              | `string`   | `""`    |
| `webmap`     | `webmap`     | Indicate a web map id to use for the map. If neither `webmap` nor `basemap` are set, then a default basemap is assigned.                                                                                                                                | `string`   | `""`    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
