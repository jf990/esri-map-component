/**
 * <esri-map-view> a custom web component for rendering a map on a web page.
 */
import { Component, h, Prop, Element, getAssetPath } from "@stencil/core";
import { loadCss, loadModules } from "esri-loader";
import {
  parseViewpoint,
  viewpointProps,
  isValidItemID,
  isValidSearchPosition
} from "../../utils/utils";

@Component({
  tag: "esri-map-view",
  styleUrl: "esri-map-view.css",
  assetsDirs: ['assets']
})
export class EsriMapView {
  @Element() hostElement: HTMLElement;

  private javascript_api_version: string = "4.13";
  private asset_path = getAssetPath("./assets/");

  /**
   * esri-loader options
   */
  esriMapOptions = {
    url: `https://js.arcgis.com/${this.javascript_api_version}/`
  };

  /**
   * Indicate a basemap id to use for the map. This property will be overridden by
   * `webmap` if that property is provided. If neither `webmap` nor `basemap` are set, then
   * a default basemap is assigned.
   */
  @Prop() basemap: string = "osm";

  /**
   * Indicate a web map id to use for the map. If neither `webmap` nor `basemap`
   * are set, then a default basemap is assigned.
   */
  @Prop() webmap: string = "";

  /**
   * Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers
   * expected: latitude (y), longitude (x), and levelOfDetail (LOD). Example: "22.7783,34.1234,9"
   */
  @Prop() viewpoint: string = "";

  /**
   * Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL
   * to the feature service, or the item ID of the feature service.
   */
  @Prop() layers: Array<string> = [];

  /**
   * Include a search widget by indicating where on the map view it should appear. The valid values for this
   * attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is an invalid
   * value then a search widget will not show.
   */
  @Prop() search: string = "";

  /**
   * Indicate a symbol to use to mark the location of the initial viewpoint.
   */
  @Prop() symbol: string = "";

  @Prop() popuptitle: string = "";
  @Prop() popupinfo: string = "";

  /**
   * Properties to hold the map, mapview, and initial viewpoint
   */
  esriMap: __esri.Map;
  esriWebMap: __esri.WebMap;
  esriMapView: __esri.MapView;
  longitude: number = 0;
  latitude: number = 0;
  levelOfDetail: number = 2;
  parsedViewpoint: boolean = false;
// custom basemap 881452f5f54547b1880ded765ddf4c1e
// webmap 96a43d02861547e3ad4e4b91df867660
  constructor() {
    this.verifyProps();
    loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);
    this.createEsriMap()
    .then(() => {
      console.log("Map should be showing");
    })
    .catch((mapLoadingException) => {
      console.log(`Map loading failed ${mapLoadingException.toString()}`);
    })
  }

  componentDidUpdate() {
    // console.log("component update");
  }

  /**
   * The component is loaded and has rendered. Attach the mapview to the HTML element.
   * Only called once per component lifecycle
   */
  componentDidLoad() {
    this.createEsriMapView()
    .then(() => {
      if (this.symbol) {
        this.showSymbol(this.symbol);
      }
    })
  }

  /**
   * Create a map object. Review the element attributes to determine which type of map should be created.
   * Given the attributes set on the element, creates either a standard basemap, a custom vector basemap,
   * or a web map.
   */
  createEsriMap() {
    return new Promise((mapCreated, mapFailed) => {
      if (isValidItemID(this.webmap)) {
        // If webmap provided, assume a valid item ID and try to create a WebMap from it.
        loadModules(
          ["esri/WebMap"],
          this.esriMapOptions
        ).then(
          ([WebMap]: [
            __esri.WebMapConstructor
          ]) => {
            this.esriWebMap = new WebMap({
              portalItem: {
                id: this.webmap
              }
            });
            mapCreated();
          }
        )
        .catch((loadException) => {
          mapFailed(loadException);
        });
      } else if (isValidItemID(this.basemap)) {
        // if the basemap looks like an item ID then assume it is a custom vector map. If it is not (e.g. it's actually a webmap)
        // then this isn't going to work. use `webmap` instead!
        loadModules([
            "esri/Map",
            "esri/Basemap",
            "esri/layers/VectorTileLayer"
          ],
          this.esriMapOptions
        ).then(
          ([
            Map,
            Basemap,
            VectorTileLayer
          ]: [
            __esri.MapConstructor,
            __esri.BasemapConstructor,
            __esri.VectorTileLayerConstructor
          ]) => {
            const customBasemap = new Basemap({
              baseLayers: [
                new VectorTileLayer({
                  portalItem: {
                    id: this.basemap
                  }
                })
              ]
            })
            this.esriMap = new Map({
              basemap: customBasemap
            });
            mapCreated();
          }
        )
        .catch((loadException) => {
          mapFailed(loadException);
        });
      } else {
        // basemap is expected to be one of the string enumerations in the API (https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap)
        loadModules(
          ["esri/Map"],
          this.esriMapOptions
        ).then(
          ([Map]: [
            __esri.MapConstructor
          ]) => {
            this.esriMap = new Map({
              basemap: this.basemap
            });
            mapCreated();
          }
        )
        .catch((loadException) => {
          mapFailed(loadException);
        });
      }
    });
  }

  /**
   * Creates the mapview used in the component. Assumes the map was created before getting here.
   */
  createEsriMapView() {
    return loadModules(["esri/views/MapView"], this.esriMapOptions).then(
      ([EsriMapView]: [__esri.MapViewConstructor]) => {
        const mapDiv = this.hostElement.querySelector("div");

        if (this.webmap && !this.parsedViewpoint) {
          // A web map and no initial viewpoint specified will use the viewpoint set in the web map.
          this.esriMapView = new EsriMapView({
            container: mapDiv,
            map: this.esriWebMap
          });
        } else {
          this.esriMapView = new EsriMapView({
            container: mapDiv,
            zoom: this.levelOfDetail,
            center: [this.longitude, this.latitude],
            map: this.esriMap || this.esriWebMap
          });
        }
        if (this.esriMapView && isValidSearchPosition(this.search)) {
          this.createSearchWidget(this.search);
        }
      }
    );
  }

  /**
   * Create a search widget and add it to the view at the given UI position.
   * @param position {string} The UI position where to place the search widget in the view.
   * @returns {Promise} A Promise is returned to load the Search Widget module.
   */
  createSearchWidget(position: string) {
    return loadModules(["esri/widgets/Search"], this.esriMapOptions).then(
      ([SearchWidget]: [__esri.widgetsSearchConstructor]) => {
        const searchWidget = new SearchWidget({
          view: this.esriMapView
        });

        this.esriMapView.ui.add(searchWidget, {
          position: position,
          index: 0
        });
      }
    );
  }

  showSymbol(symbol: string) {
    let symbolURL;
    let xoffset;
    let yoffset;
    if (symbol == "green-pin") {
      symbolURL = this.asset_path + "green-pin.png";
      xoffset = "0";
      yoffset = "0";
    } else {
      // if URL, load image?
      symbolURL = this.asset_path + "green-pin.png";
      xoffset = "0";
      yoffset = "0";
    }
    return loadModules([
      "esri/symbols/PictureMarkerSymbol",
      "esri/Graphic",
      "esri/geometry/Point"
    ], this.esriMapOptions).then(
      ([
        PictureMarkerSymbol,
        Graphic,
        Point
      ]: [
        __esri.PictureMarkerSymbolConstructor,
        __esri.GraphicConstructor,
        __esri.PointConstructor
      ]) => {
        const point = new Point({
          longitude: this.longitude,
          latitude: this.latitude
        });
        const pointSymbol = new PictureMarkerSymbol({
          url: symbolURL,
          width: "64px",
          height: "64px",
          xoffset: xoffset,
          yoffset: yoffset
        });
        const symbolGraphic = new Graphic({
          geometry: point,
          symbol: pointSymbol,
          popupTemplate: {
            title: this.popuptitle,
            content: this.popupinfo
          }
        });
        this.esriMapView.graphics.add(symbolGraphic);
      }
    );
  }

  render() {
    return <div class="esri-map-view" />;
  }

  /**
   * Verify and validate any attributes set on the component to make sure
   * we are in a valid starting state we can render.
   */
  private verifyProps(): boolean {
    let isValid:boolean = false;
    if (this.webmap && !isValidItemID(this.webmap)) {
      // if a web map is specified but it is not an item ID then ignore it.
      // TODO: What about a service URL?
      this.webmap = null;
    }
    if (!this.basemap && !this.webmap) {
      // If there is no basemap and no web map then use a default basemap, no point to rendering nothing.
      this.basemap = "osm";
    }
    if (!this.viewpoint && !this.webmap) {
      // if no initial viewpoint is specified then set some default
      this.viewpoint = "0,0,2";
    }
    if (this.viewpoint) {
      // if given an initial viewpoint then try to valid each part
      const parsedViewpoint:viewpointProps = parseViewpoint(this.viewpoint);
      this.longitude = parsedViewpoint.longitude;
      this.latitude = parsedViewpoint.latitude;
      this.levelOfDetail = parsedViewpoint.levelOfDetail;
      this.parsedViewpoint = true;
    }
    if (this.search && !isValidSearchPosition(this.search)) {
      // if given a search widget and it's not a valid UI position then ignore it.
      this.search = null;
    }
    isValid = true;
    return isValid;
  }
}
