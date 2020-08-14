/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface EsriMapView {
        /**
          * Indicate a basemap id to use for the map. This property will be overridden by `webmap` if that attribute is provided. If neither `webmap` nor `basemap` are set, then a default basemap is assigned. Options for `basemap` are defined in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap).
         */
        "basemap": string;
        /**
          * Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL to the feature service, or the item ID of the feature service. Multiple layers can be separated with a comma.
         */
        "layers": string;
        /**
          * If `symbol` is set, tapping the image will show a pop-up. This is the `content` for that pop-up.
         */
        "popupinfo": string;
        /**
          * If `symbol` is set, tapping the image will show a pop-up. This is the `title` for that pop-up.
         */
        "popuptitle": string;
        /**
          * Include a search widget by indicating where on the map view it should appear. The valid values for this attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is empty/missing or an invalid value then a search widget will not show.
         */
        "search": string;
        /**
          * Indicate a symbol to use to mark the location of the initial viewpoint. This is the fully qualified URL to a 64x64 px PNG image. CORS is respected when accessing the image. You can also specify `green-pin` to use a green map pin as the symbol. You can also specify `pin:{color}` to use a text symbol marker and the color value. Use a 6-digit HTML color value or the standard HTML color name.
         */
        "symbol": string;
        /**
          * Some symbols will require an x/y offset so that the registration point of the symbol is exactly on the map point. Here you can specify an x,y offset to adjust the symbol. Use a comma separated coordinate pair.
         */
        "symboloffset": string;
        /**
          * Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers expected: latitude (y), longitude (x), and levelOfDetail (LOD). Example: "22.7783,34.1234,9". You should set this if you set a `basemap`. You do not need to set this if you set `webmap` as the web map's initial viewpoint is used. If you do set `viewpoint` and `webmap` then this setting will override the initial viewpoint of the web map.
         */
        "viewpoint": string;
        /**
          * Indicate a web map id to use for the map. If neither `webmap` nor `basemap` are set, then a default basemap is assigned.
         */
        "webmap": string;
    }
    interface EsriSceneView {
        /**
          * Indicate a basemap id to use for the map. This property will be overridden by `webscene` if that attribute is provided. If neither `webscene` nor `basemap` are set, then a default basemap is assigned. Options for `basemap` are defined in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap).
         */
        "basemap": string;
        /**
          * Indicate the camera position for the initial scene viewpoint. This is a string of five comma separated numbers as follows: x,y,z,heading,tilt. If you set this it will override `viewpoint` settings.
         */
        "cameraPosition": string;
        /**
          * Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL to the feature service, or the item ID of the feature service. Multiple layers can be separated with a comma.
         */
        "layers": string;
        /**
          * If `symbol` is set, tapping the image will show a pop-up. This is the `content` for that pop-up.
         */
        "popupinfo": string;
        /**
          * If `symbol` is set, tapping the image will show a pop-up. This is the `title` for that pop-up.
         */
        "popuptitle": string;
        /**
          * Include a search widget by indicating where on the scene view it should appear. The valid values for this attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is empty/missing or an invalid value then a search widget will not show.
         */
        "search": string;
        /**
          * Indicate a symbol to use to mark the location of the initial viewpoint. This is the fully qualified URL to a 64x64 px PNG image. CORS is respected when accessing the image. You can also specify `green-pin` to use a green map pin as the symbol. You can also specify `pin:{color}` to use a text symbol marker and the color value. Use a 6-digit HTML color value or the standard HTML color name.
         */
        "symbol": string;
        /**
          * Some symbols will require an x/y offset so that the registration point of the symbol is exactly on the map point. Here you can specify an x,y offset to adjust the symbol. Use a comma separated coordinate pair.
         */
        "symboloffset": string;
        /**
          * Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers expected: latitude (y), longitude (x), and levelOfDetail (LOD). Example: "22.7783,34.1234,9". You should set this if you set a `basemap`. You do not need to set this if you set `webscene` as the web scene's initial viewpoint is used. However, this setting will override the web scenes initial viewpoint. The `viewpoint` is not used if `cameraPosition` is also set. For 3D scenes, the level of detail is translated into a 3D camera position height of Z-axis position.
         */
        "viewpoint": string;
        /**
          * Indicate a web scene id to use for the map. If neither `webscene` nor `basemap` are set, then a default basemap is assigned.
         */
        "webscene": string;
    }
}
declare global {
    interface HTMLEsriMapViewElement extends Components.EsriMapView, HTMLStencilElement {
    }
    var HTMLEsriMapViewElement: {
        prototype: HTMLEsriMapViewElement;
        new (): HTMLEsriMapViewElement;
    };
    interface HTMLEsriSceneViewElement extends Components.EsriSceneView, HTMLStencilElement {
    }
    var HTMLEsriSceneViewElement: {
        prototype: HTMLEsriSceneViewElement;
        new (): HTMLEsriSceneViewElement;
    };
    interface HTMLElementTagNameMap {
        "esri-map-view": HTMLEsriMapViewElement;
        "esri-scene-view": HTMLEsriSceneViewElement;
    }
}
declare namespace LocalJSX {
    interface EsriMapView {
        /**
          * Indicate a basemap id to use for the map. This property will be overridden by `webmap` if that attribute is provided. If neither `webmap` nor `basemap` are set, then a default basemap is assigned. Options for `basemap` are defined in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap).
         */
        "basemap"?: string;
        /**
          * Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL to the feature service, or the item ID of the feature service. Multiple layers can be separated with a comma.
         */
        "layers"?: string;
        /**
          * If `symbol` is set, tapping the image will show a pop-up. This is the `content` for that pop-up.
         */
        "popupinfo"?: string;
        /**
          * If `symbol` is set, tapping the image will show a pop-up. This is the `title` for that pop-up.
         */
        "popuptitle"?: string;
        /**
          * Include a search widget by indicating where on the map view it should appear. The valid values for this attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is empty/missing or an invalid value then a search widget will not show.
         */
        "search"?: string;
        /**
          * Indicate a symbol to use to mark the location of the initial viewpoint. This is the fully qualified URL to a 64x64 px PNG image. CORS is respected when accessing the image. You can also specify `green-pin` to use a green map pin as the symbol. You can also specify `pin:{color}` to use a text symbol marker and the color value. Use a 6-digit HTML color value or the standard HTML color name.
         */
        "symbol"?: string;
        /**
          * Some symbols will require an x/y offset so that the registration point of the symbol is exactly on the map point. Here you can specify an x,y offset to adjust the symbol. Use a comma separated coordinate pair.
         */
        "symboloffset"?: string;
        /**
          * Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers expected: latitude (y), longitude (x), and levelOfDetail (LOD). Example: "22.7783,34.1234,9". You should set this if you set a `basemap`. You do not need to set this if you set `webmap` as the web map's initial viewpoint is used. If you do set `viewpoint` and `webmap` then this setting will override the initial viewpoint of the web map.
         */
        "viewpoint"?: string;
        /**
          * Indicate a web map id to use for the map. If neither `webmap` nor `basemap` are set, then a default basemap is assigned.
         */
        "webmap"?: string;
    }
    interface EsriSceneView {
        /**
          * Indicate a basemap id to use for the map. This property will be overridden by `webscene` if that attribute is provided. If neither `webscene` nor `basemap` are set, then a default basemap is assigned. Options for `basemap` are defined in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap).
         */
        "basemap"?: string;
        /**
          * Indicate the camera position for the initial scene viewpoint. This is a string of five comma separated numbers as follows: x,y,z,heading,tilt. If you set this it will override `viewpoint` settings.
         */
        "cameraPosition"?: string;
        /**
          * Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL to the feature service, or the item ID of the feature service. Multiple layers can be separated with a comma.
         */
        "layers"?: string;
        /**
          * If `symbol` is set, tapping the image will show a pop-up. This is the `content` for that pop-up.
         */
        "popupinfo"?: string;
        /**
          * If `symbol` is set, tapping the image will show a pop-up. This is the `title` for that pop-up.
         */
        "popuptitle"?: string;
        /**
          * Include a search widget by indicating where on the scene view it should appear. The valid values for this attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is empty/missing or an invalid value then a search widget will not show.
         */
        "search"?: string;
        /**
          * Indicate a symbol to use to mark the location of the initial viewpoint. This is the fully qualified URL to a 64x64 px PNG image. CORS is respected when accessing the image. You can also specify `green-pin` to use a green map pin as the symbol. You can also specify `pin:{color}` to use a text symbol marker and the color value. Use a 6-digit HTML color value or the standard HTML color name.
         */
        "symbol"?: string;
        /**
          * Some symbols will require an x/y offset so that the registration point of the symbol is exactly on the map point. Here you can specify an x,y offset to adjust the symbol. Use a comma separated coordinate pair.
         */
        "symboloffset"?: string;
        /**
          * Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers expected: latitude (y), longitude (x), and levelOfDetail (LOD). Example: "22.7783,34.1234,9". You should set this if you set a `basemap`. You do not need to set this if you set `webscene` as the web scene's initial viewpoint is used. However, this setting will override the web scenes initial viewpoint. The `viewpoint` is not used if `cameraPosition` is also set. For 3D scenes, the level of detail is translated into a 3D camera position height of Z-axis position.
         */
        "viewpoint"?: string;
        /**
          * Indicate a web scene id to use for the map. If neither `webscene` nor `basemap` are set, then a default basemap is assigned.
         */
        "webscene"?: string;
    }
    interface IntrinsicElements {
        "esri-map-view": EsriMapView;
        "esri-scene-view": EsriSceneView;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "esri-map-view": LocalJSX.EsriMapView & JSXBase.HTMLAttributes<HTMLEsriMapViewElement>;
            "esri-scene-view": LocalJSX.EsriSceneView & JSXBase.HTMLAttributes<HTMLEsriSceneViewElement>;
        }
    }
}
