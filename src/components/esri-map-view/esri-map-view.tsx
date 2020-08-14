/**
 * <esri-map-view> a custom web component for rendering a 2D map on a web page.
 */
import { Component, h, Prop, Element, getAssetPath } from "@stencil/core";
import { loadCss, loadModules } from "esri-loader";
import {
  parseViewpoint,
  viewpointProps,
  parseOffset,
  offsetProps,
  isValidItemID,
  isValidURL,
  isValidSearchPosition
} from "../../utils/utils";

@Component({
  tag: "esri-map-view",
  styleUrl: "esri-map-view.css",
  assetsDirs: ['assets']
})
export class EsriMapView {
  @Element() hostElement: HTMLElement;

  private javascript_api_version: string = "4.16";
  private asset_path = getAssetPath("./assets/");

  /**
   * esri-loader options
   */
  esriMapOptions = {
    url: `https://js.arcgis.com/${this.javascript_api_version}/`
  };

  /**
   * Indicate a basemap id to use for the map. This property will be overridden by
   * `webmap` if that attribute is provided. If neither `webmap` nor `basemap` are set, then
   * a default basemap is assigned. Options for `basemap` are defined in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap).
   */
  @Prop() basemap: string = "osm";

  /**
   * Indicate a web map id to use for the map. If neither `webmap` nor `basemap`
   * are set, then a default basemap is assigned.
   */
  @Prop() webmap: string = "";

  /**
   * Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers
   * expected: latitude (y), longitude (x), and levelOfDetail (LOD). Example: "22.7783,34.1234,9".
   * You should set this if you set a `basemap`. You do not need to set this if you set `webmap` as
   * the web map's initial viewpoint is used. If you do set `viewpoint` and `webmap` then this
   * setting will override the initial viewpoint of the web map.
   */
  @Prop() viewpoint: string = "";

  /**
   * Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL
   * to the feature service, or the item ID of the feature service. Multiple layers can be separated
   * with a comma.
   */
  @Prop() layers: string = "";

  /**
   * Include a search widget by indicating where on the map view it should appear. The valid values for this
   * attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is empty/missing
   * or an invalid value then a search widget will not show.
   */
  @Prop() search: string = "";

  /**
   * Indicate a symbol to use to mark the location of the initial viewpoint. This is the fully qualified URL
   * to a 64x64 px PNG image. CORS is respected when accessing the image. You can also specify `green-pin` to
   * use a green map pin as the symbol. You can also specify `pin:{color}` to use a text symbol marker
   * and the color value. Use a 6-digit HTML color value or the standard HTML color name.
   */
  @Prop() symbol: string = "";

  /**
   * Some symbols will require an x/y offset so that the registration point of the
   * symbol is exactly on the map point. Here you can specify an x,y offset to adjust
   * the symbol. Use a comma separated coordinate pair.
   */
  @Prop() symboloffset: string = "";

  /**
   * If `symbol` is set, tapping the image will show a pop-up. This is the `title` for that pop-up.
   */
  @Prop() popuptitle: string = "";

  /**
   * If `symbol` is set, tapping the image will show a pop-up. This is the `content` for that pop-up.
   */
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
  parsedOffset: offsetProps;

  constructor() {
    this.verifyProps();
    loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);
    this.createEsriMap()
    .then(() => {
      // console.log("Map should be showing");
    })
    .catch((mapLoadingException) => {
      console.log(`Map loading failed ${mapLoadingException.toString()}`);
    })
  }

  componentDidUpdate() {
    // console.log("component update");
  }

  /**
   * The component is loaded and has rendered. Attach the MapView to the HTML element.
   * Only called once per component life cycle.
   */
  componentDidLoad() {
    this.createEsriMapView()
    .then(() => {
      if (this.symbol) {
        if (this.symbol.indexOf("pin:") === 0) {
          this.showPin(this.symbol.substr(4));
        } else {
          this.showSymbol(this.symbol);
        }
      }
    })
  }

  /**
   * Create a map object. Review the element attributes to determine which type of map should be created.
   * Given the attributes set on the element, creates either a standard basemap, a custom vector basemap,
   * or a web map.
   */
  private createEsriMap() {
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
  private createEsriMapView() {
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
        if (this.esriMapView) {
          if (this.layers) {
            this.addLayers(this.layers);
          }
          if (isValidSearchPosition(this.search)) {
            this.createSearchWidget(this.search);
          }
        }
      }
    );
  }

  /**
   * Add layers to the map. Each layer can be specified by its item ID or its service URL.
   * @param {string} layers A list of 1 or more layers where multiple layers are separated with commas.
   */
  private addLayers(layers: string) {
    const layersList = layers.split(",");

    // Review the proposed layer list and remove anything that doesn't look like a layer specification.
    for (let i = layersList.length; i >= 0; i --) {
      const layerId:string = layersList[i];
      if (!isValidItemID(layerId) && !isValidURL(layerId)) {
        layersList.splice(i, 1);
      }
    }
    // Only proceed with layer construction if we have layers we think we can load.
    if (layersList.length > 0) {
      loadModules(["esri/layers/FeatureLayer", "esri/layers/Layer", "esri/portal/PortalItem"], this.esriMapOptions).then(
        ([FeatureLayer, Layer, PortalItem]: [__esri.FeatureLayerConstructor, __esri.LayerConstructor, __esri.PortalItemConstructor]) => {
          layersList.forEach((layerId:string) => {
            if (isValidItemID(layerId)) {
              const portalItem = new PortalItem({
                id: layerId
              });
              Layer.fromPortalItem({portalItem: portalItem}).then(itemLayer => {
                this.esriMap.add(itemLayer);
              });
            } else if (isValidURL(layerId)) {
              const featureLayer = new FeatureLayer({
                url: layerId
              });
              if (featureLayer) {
                this.esriMap.add(featureLayer);
              }
            }
          });
      });
    }
  }

  /**
   * Create a search widget and add it to the view at the given UI position.
   * @param {string} searchWidgetPosition The UI position where to place the search widget in the view.
   * @returns {Promise} A Promise is returned to load the Search Widget module.
   */
  private createSearchWidget(searchWidgetPosition: string) {
    return loadModules(["esri/widgets/Search"], this.esriMapOptions).then(
      ([SearchWidget]: [__esri.widgetsSearchConstructor]) => {
        const searchWidget = new SearchWidget({
          view: this.esriMapView
        });

        this.esriMapView.ui.add(searchWidget, {
          position: searchWidgetPosition,
          index: 0
        } as __esri.UIAddPosition);
      }
    );
  }

  /**
   * Show a symbol on the map at the initial viewpoint location.
   * @param {string} symbol Either an asset id of a local symbol asset or a fully qualified URL to a PNG to use as the symbol.
   */
  private showSymbol(symbol: string) {
    let symbolURL;
    let xoffset;
    let yoffset;
    if (symbol == "green-pin") {
      symbolURL = this.asset_path + "green-pin.png";
      xoffset = "0";
      yoffset = "0";
    } else {
      // if URL, validate URL? load image?
      symbolURL = symbol;
      xoffset = this.parsedOffset.x.toString();
      yoffset = this.parsedOffset.y.toString();
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

  /**
   * Show a pin on the map at the initial viewpoint location.
   * @param {string} pinColor The color value of the pin symbol.
   */
  private showPin(pinColor: string) {
    return loadModules([
      "esri/symbols/TextSymbol",
      "esri/Graphic",
      "esri/geometry/Point"
    ], this.esriMapOptions).then(
      ([
        TextSymbol,
        Graphic,
        Point
      ]: [
        __esri.TextSymbolConstructor,
        __esri.GraphicConstructor,
        __esri.PointConstructor
      ]) => {
        let xoffset = this.parsedOffset.x;
        let yoffset = this.parsedOffset.y;
        const point = new Point({
          longitude: this.longitude,
          latitude: this.latitude
        });
        const pointSymbol = new TextSymbol({
          color: pinColor,
          haloColor: "black",
          haloSize: "1px",
          text: "\ue61d", // esri-icon-map-pin
          font: {
            size: 30,
            family: "CalciteWebCoreIcons"
          },
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
    this.parsedOffset = parseOffset(this.symboloffset);
    if (this.search && !isValidSearchPosition(this.search)) {
      // if given a search widget and it's not a valid UI position then ignore it.
      this.search = null;
    }
    isValid = true;
    return isValid;
  }
}
