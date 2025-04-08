/**
 * <esri-map-view> a custom web component for rendering a 2D map on a web page.
 */
import { Component, h, Prop, Watch, Element, getAssetPath, Event, EventEmitter } from "@stencil/core";
import { setDefaultOptions, loadCss, loadModules } from "esri-loader";
import {
  parseViewpoint,
  parseMinMax,
  viewpointProps,
  parseOffset,
  offsetProps,
  isValidItemID,
  isValidURL,
  isValidSearchPosition,
  showUI
} from "../../utils/utils";
import esriConfig from "@arcgis/core/config.js";

@Component({
  tag: "esri-map-view",
  styleUrl: "esri-map-view.css",
  assetsDirs: ["assets"]
})

export class EsriMapView {
  @Element() hostElement: HTMLElement;
  /**
   * The `mapLoaded` event fires when the basemap or web map has finished loading.
   */
  @Event() mapLoaded: EventEmitter;
  /**
   * The `mapLoadError` event fires if the basemap or web map did not load due to some type of error. Check the console for error messages.
   */
  @Event() mapLoadError: EventEmitter;

  private ArcGISJavaScriptVersion: string = "4.32";
  private assetPath = getAssetPath("./assets/");
  private mapViewWidgets = ["zoom"];

  /**
   * Properties to hold the map, map view, and initial viewpoint
   */
  esriConfig: esriConfig;
  esriMap: __esri.Map = null;
  esriWebMap: __esri.WebMap = null;
  esriMapView: __esri.MapView = null;
  symbolGraphic: __esri.Graphic = null;
  searchWidget: any = null;
  longitude: number = 0;
  latitude: number = 0;
  levelOfDetail: number = 2;
  minZoom: number = 0;
  maxZoom: number = 24;
  parsedViewpoint: boolean = false;
  parsedOffset: offsetProps;
  defaultBasemap: string = "osm-streets";
  viewChangePending:Boolean = false;
  mapChangePending:Boolean = false;

  /**
   * Options for esri-loader
   */
  esriMapOptions = {
    url: `https://js.arcgis.com/${this.ArcGISJavaScriptVersion}/`,
    css: true
  };

  /**
   * Set your API key. Learn more about [API keys](https://developers.arcgis.com/documentation/mapping-apis-and-services/security/api-keys/).
   */
  @Prop({ reflect: true, mutable: true }) apikey: string = "YOUR_API_KEY";
  @Watch('apikey')
  watchAPIKeyHandler(newValue: string, oldValue: string) {
    if (newValue != oldValue) {
      this.esriConfig.apiKey = newValue;
    }
  }

  /**
   * Indicate a basemap id to use for the map. Select one of the basemap style options from the enumeration https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap,
   * or the item ID of a custom basemap style. This property will be ignored by `webmap` if that attribute is provided. If neither `webmap` nor `basemap` are set, then
   * a default basemap is assigned. Options for `basemap` are defined in the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap).
   */
  @Prop({ reflect: true, mutable: true }) basemap: string = "osm-streets";
  @Watch('basemap')
  watchBasemapHandler(newValue: string, oldValue: string) {
    const componentContext = this;
    if (componentContext.viewChangePending || componentContext.mapChangePending) {
      componentContext.mapLoadError.emit(new Error("Cannot change the map while a viewpoint change is in process."));
      return;
    }
    if (newValue != oldValue) {
      componentContext.mapChangePending = true;
      componentContext.updateEsriMap(newValue)
      .then(() => {
        componentContext.basemap = newValue;
        componentContext.mapChangePending = false;
        componentContext.mapLoaded.emit("loaded");
        if (componentContext.layers) {
          componentContext.addLayers(componentContext.layers);
        }
      })
      .catch((mapLoadingException) => {
        componentContext.mapChangePending = false;
        componentContext.mapLoadError.emit(mapLoadingException.toString());
      });
    }
  }

  /**
   * Indicate a web map id to use for the map. If neither `webmap` nor `basemap`
   * are set, then a default basemap is assigned.
   */
  @Prop({ reflect: true, mutable: true }) webmap: string = "";
  @Watch('webmap')
  watchWebmapHandler(newValue: string, oldValue: string) {
    if (this.viewChangePending || this.mapChangePending) {
      this.mapLoadError.emit(new Error("Cannot change the map while a viewpoint change is in process."));
      return;
    }
    if (newValue != oldValue) {
      this.mapChangePending = true;
      this.webmap = newValue;
      this.createEsriMap()
      .then(() => {
        if (this.esriMapView && this.esriWebMap) {
          this.esriMapView.map = this.esriWebMap;
        }
        this.mapChangePending = false;
        this.mapLoaded.emit("loaded");
        if (this.layers) {
          this.addLayers(this.layers);
        }
      })
      .catch((mapLoadingException) => {
        console.log(`web map change, Map loading failed ${mapLoadingException.toString()}`);
        this.mapChangePending = false;
        this.mapLoadError.emit(mapLoadingException.toString());
      });
    }
  }

  /**
   * Indicate an initial viewpoint to focus the map. This is a string of 3 comma-separated numbers
   * expected: longitude (x), latitude (y), and levelOfDetail (LOD). Example: "22.7783,34.1234,9".
   * You should set this if you set a `basemap`. You do not need to set this if you set `webmap` as
   * the web map's initial viewpoint is used. If you do set `viewpoint` and `webmap` then this
   * setting will override the initial viewpoint of the web map.
   */
  @Prop({ reflect: true, mutable: true }) viewpoint: string = "";
  @Watch('viewpoint')
  watchViewPointHandler(newValue: string, oldValue: string) {
    const componentContext = this;
    if (componentContext.viewChangePending || componentContext.mapChangePending) {
      componentContext.mapLoadError.emit(new Error("Cannot change the viewpoint while a map change is in process."));
      return;
    }
    if (newValue != oldValue) {
      componentContext.parsedViewpoint = false;
      componentContext.viewpoint = newValue;
      if (componentContext.verifyViewpoint()) {
        if (componentContext.esriMapView == null) {
          return;
        }
        // notify the map view to change the viewpoint
        componentContext.viewChangePending = true;
        componentContext.esriMapView.goTo({
          center: [componentContext.longitude, componentContext.latitude],
          zoom: componentContext.levelOfDetail
        })
        .then(function() {
          componentContext.viewChangePending = false;
          componentContext.addGraphics();
        })
        .catch(function() {
          componentContext.viewChangePending = false;
          componentContext.viewpoint = oldValue;
          componentContext.verifyViewpoint();
        });
      } else {
        // the new viewpoint failed so restore the old viewpoint.
        componentContext.viewpoint = oldValue;
        componentContext.verifyViewpoint();
      }
    }
  }

  /**
   * Specify 0 or more layers to add on top of the basemap. Each layer is a string that is either a URL
   * to the feature service, or the item ID of the feature service. Multiple layers are separated
   * with a comma.
   */
  @Prop({ reflect: true, mutable: true }) layers: string = "";
  @Watch('layers')
  watchLayersHandler(newValue: string, oldValue: string) {
    if (newValue != oldValue) {
      this.layers = newValue;
      this.addLayers(newValue);
    }
  }

  /**
   * Include a search widget by indicating where on the map view it should appear. The valid values for this
   * attribute are `top-left`, `top-right`, `bottom-left`, `bottom-right`. If this attribute is empty/missing
   * or an invalid value then a search widget will not show.
   */
  @Prop({ reflect: true, mutable: true }) search: string = "";
  @Watch('search')
  watchSearchHandler(newValue: string, oldValue: string) {
    if (newValue != oldValue) {
      this.removeSearchWidget();
      this.search = newValue;
      if (this.verifySearch()) {
        this.createSearchWidget(this.search);
      }
    }
  }

  /**
   * Indicate a symbol to use to mark the location of the initial viewpoint. This is the fully qualified URL
   * to a 64x64 px PNG image. CORS is respected when accessing the image. You can also specify `green-pin` to
   * use a green map pin as the symbol. You can also specify `pin:{color}` to use a text symbol marker
   * and the color value. Use a 6-digit HTML color value or the standard HTML color name.
   */
  @Prop({ reflect: true, mutable: true }) symbol: string = "";
  @Watch('symbol')
  watchSymbolHandler(newValue: string, oldValue: string) {
    if (newValue != oldValue) {
      this.symbol = newValue;
      this.addGraphics();
    }
  }

  /**
   * Some symbols will require an x/y offset so that the registration point of the
   * symbol is exactly on the map point. Here you can specify an x,y offset, in pixels, to adjust
   * the symbol. Use a comma separated coordinate pair.
   */
  @Prop({ reflect: true, mutable: true }) symboloffset: string = "";
  @Watch('symboloffset')
  watchSymbolOffsetHandler(newValue: string, oldValue: string) {
    if (newValue != oldValue) {
      this.symboloffset = newValue;
      this.parsedOffset = parseOffset(newValue);
      this.addGraphics();
    }
  }

  /**
   * If `symbol` is set, tapping the symbol will show a pop-up. This is the `title` for that pop-up.
   */
  @Prop({ reflect: true, mutable: true }) popuptitle: string = "";
  @Watch('popuptitle')
  watchPopupTitleHandler(newValue: string, oldValue: string) {
    if (newValue != oldValue) {
      this.popuptitle = newValue;
      this.addGraphics();
    }
  }

  /**
   * If `symbol` is set, tapping the symbol will show a pop-up. This is the `content` for that pop-up.
   */
  @Prop({ reflect: true, mutable: true }) popupinfo: string = "";
  @Watch('popupinfo')
  watchPopupInfoHandler(newValue: string, oldValue: string) {
    if (newValue != oldValue) {
      this.popupinfo = newValue;
      this.addGraphics();
    }
  }

  /**
   * You can show or hide the map UI (Pan/zoom controls) with the `ui` attribute. Setting `ui=hide` or `ui=off` to hide it,
   * set `ui=show` or `ui=on` to show it. The default value is to show the ui.
   */
  @Prop({ reflect: true, mutable: true }) ui: string = "";
  @Watch('ui')
  watchUIHandler(newValue: string, oldValue: string) {
    if (newValue != oldValue) {
      this.constrainUI(newValue, false);
    }
  }

  /**
   * Set the minimum and maximum zoom levels allowed by either the UI zoom controls or
   * the mouse/touch interaction. This is a comma separated string of 2 numbers, the first is
   * the minimum and the second is the maximum. For example, 14,16 will constrain the zoom to
   * a minimum of 14 and a maximum of 16. If only one number is provided (or valid) then
   * both min and max are set to that value.
   */
  @Prop({ reflect: true, mutable: true }) minmaxzoom: string = "";
  @Watch('minmaxzoom')
  watchMinMaxZoomHandler(newValue: string, oldValue: string) {
    if (newValue != oldValue) {
      this.minmaxzoom = newValue;
      if ( ! this.verifyMinMaxZoom()) {
        this.minmaxzoom = oldValue;
        this.verifyMinMaxZoom();
      }
    }
  }

  constructor() {
    this.verifyProps();
    setDefaultOptions(this.esriMapOptions);
    loadCss(`${this.esriMapOptions.url}/esri/css/main.css`);
    this.setAuthentication()
    .then(() => {
      this.createEsriMap()
      .then(() => {
        this.mapLoaded.emit("map-created");
      })
      .catch((mapLoadingException) => {
        console.log(`Map loading failed ${mapLoadingException.toString()}`);
        this.mapLoadError.emit(mapLoadingException.toString());
      });
    })
    .catch((authenticationException) => {
      console.log(`Authentication failed ${authenticationException.toString()}`);
      this.mapLoadError.emit(authenticationException.toString());
    });
  }

  /**
   * The component is loaded and has rendered. Attach the MapView to the HTML element.
   * Only called once per component life cycle.
   */
  componentDidLoad() {
    this.createEsriMapView()
    .then(() => {
      this.mapLoaded.emit("view-created");
      if (this.symbol) {
        this.addGraphics();
      }
    })
  }

  /**
   * Set the configuration object authentication based on the user provided apikey. If no apikey is provided
   * then a login pop up will appear if authentication is required.
   * The esri configuration object https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html
   */
  private setAuthentication() {
    return new Promise<void>((configSet, authenticationFailed) => {
      loadModules(["esri/config"])
      .then(([esriConfig]) => {
        this.esriConfig = esriConfig;
        if (this.apikey) {
          this.esriConfig.apiKey = this.apikey;
        } else {
          this.esriConfig.request.useIdentity = true;
        }
        configSet();
      })
      .catch((loadException) => {
        authenticationFailed(loadException);
      });
    });
  }

  /**
   * Create a map object. Review the element attributes to determine which type of map should be created:
   * either a standard basemap, a custom vector basemap, or a web map.
   */
  private async createEsriMap() {
    return new Promise<void>((mapCreated, mapFailed) => {
      if (isValidItemID(this.webmap)) {
        // If web map provided, assume a valid item ID and try to create a WebMap from it.
        this.updateEsriWebMap(this.webmap)
        .then(() => {
          mapCreated();
        })
        .catch((loadException) => {
          mapFailed(loadException);
        });
      } else {
        // If not an item id then it's a URL or a basemap id
        this.updateEsriMap(this.basemap)
        .then(() => {
          mapCreated();
        })
        .catch((loadException) => {
          mapFailed(loadException);
        });
      }
    });
  }

  /**
   * Create a web map.
   */
  private async updateEsriWebMap(webMapItemId: string) {
    return new Promise<void>((mapCreated, mapFailed) => {
      loadModules(["esri/WebMap"])
      .then(([WebMap]) => {
        this.esriWebMap = new WebMap({
          portalItem: {
            id: webMapItemId
          }
        });
        mapCreated();
      })
      .catch((loadException) => {
        mapFailed(loadException);
      });
    });
  }


  /**
   * Create a map object. Review the element attributes to determine which type of map should be created.
   * Given the attributes set on the element, creates either a standard basemap, a custom vector basemap,
   * or a web scene.
   */
  private async updateEsriMap(newBasemapId: string) {
    return new Promise<void>((mapCreated, mapFailed) => {
      if (isValidItemID(newBasemapId)) {
        // if the basemap looks like an item ID then assume it is the user's custom vector map. If it is not (e.g. it's actually a web map)
        // then this isn't going to work. use `webmap` instead!
        loadModules([
          "esri/Map",
          "esri/Basemap",
          "esri/layers/VectorTileLayer"
        ])
        .then(([
          Map,
          Basemap,
          VectorTileLayer
        ]) => {
          const customBasemap = new Basemap({
            baseLayers: [
              new VectorTileLayer({
                portalItem: {
                  id: newBasemapId
                }
              })
            ]
          });
          if (this.esriMap) {
            this.esriMap.basemap = customBasemap;
          } else {
            this.esriMap = new Map({
              basemap: customBasemap
            });
          }
          mapCreated();
        })
        .catch((loadException) => {
          mapFailed(loadException);
        });
      } else {
        // basemap is expected to be one of the string enumerations in the API (https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap)
        loadModules(["esri/Map", "esri/Basemap"])
        .then(([Map, Basemap]) => {
          const newBasemap = new Basemap({
            style: {
              id: newBasemapId,
              language: "en"
            }
          });
          if (this.esriMap) {
            this.esriMap.basemap = newBasemap;
          } else {
            this.esriMap = new Map({
              basemap: newBasemap
            });
          }
          mapCreated();
        })
        .catch((loadException) => {
          mapFailed(loadException);
        });
      }
    });
  }

  /**
   * Creates the map view used in the component. Assumes the map was created before getting here.
   */
  private async createEsriMapView() {
    const [MapView] = await loadModules(["esri/views/MapView"]);
    const mapDiv = this.hostElement.querySelector("div");
    if (this.webmap && !this.parsedViewpoint) {
      // A web map and no initial viewpoint specified will use the viewpoint set in the web map.
      if (this.esriMapView == null) {
        this.esriMapView = new MapView({
          container: mapDiv,
          map: this.esriWebMap
        });
      } else {
        this.esriMapView.map = this.esriWebMap;
      }
    } else {
      if (this.esriMapView == null) {
        this.esriMapView = new MapView({
          container: mapDiv,
          zoom: this.levelOfDetail,
          center: [this.longitude, this.latitude],
          map: this.esriMap || this.esriWebMap
        });
      } else {
        this.esriMapView.map = this.esriMap || this.esriWebMap;
      }
    }
    if (this.esriMapView) {
      this.constrainUI(this.ui, true);
      if (this.layers) {
        this.addLayers(this.layers);
      }
      if (isValidSearchPosition(this.search) && this.search != "off") {
        this.createSearchWidget(this.search);
      }
    }
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
      loadModules(["esri/layers/FeatureLayer", "esri/layers/Layer", "esri/portal/PortalItem"])
      .then(([FeatureLayer, Layer, PortalItem]) => {
        this.esriMap.layers.removeAll();
        layersList.forEach((layerId:string) => {
          if (isValidItemID(layerId)) {
            const portalItem = new PortalItem({
              id: layerId
            });
            Layer.fromPortalItem({portalItem: portalItem})
            .then((itemLayer: __esri.Layer) => {
              this.esriMap.layers.add(itemLayer);
            })
            .catch((exception) => {
              console.log(`Layer ${layerId} loading failed ${exception.toString()}`);
            });
          } else if (isValidURL(layerId)) {
            const featureLayer = new FeatureLayer({
              url: layerId
            });
            if (featureLayer) {
              this.esriMap.layers.add(featureLayer);
            }
          }
        });
      });
    }
  }

  /**
   * Create a search widget and add it to the view at the given UI position.
   * @param {string} searchWidgetPosition The UI position where to place the search widget in the view.
   */
  private async createSearchWidget(searchWidgetPosition: string) {
    const [SearchWidget] = await loadModules(["esri/widgets/Search"]);
    const searchWidget = new SearchWidget({
      view: this.esriMapView
    });
    this.esriMapView.ui.add(searchWidget, {
      position: searchWidgetPosition,
      index: 0
    } as __esri.UIAddPosition);
    this.searchWidget = searchWidget;
  }

  /**
   * Remove the search widget from the map view.
   */
  private async removeSearchWidget() {
    if (this.searchWidget) {
      this.esriMapView.ui.remove(this.searchWidget);
      this.searchWidget = null;
    }
  }

  /**
   * Add graphics to the graphics layer depending on which properties the user requested.
   */
  private async addGraphics() {
    if (this.esriMapView) {
      if (this.symbol.indexOf("pin:") === 0) {
        this.showPin(this.symbol.substring(4));
      } else if (this.symbol.length > 0) {
        this.showSymbol(this.symbol);
      }
    }
  }

  /**
   * Add a graphic symbol to the map view graphics layer, and remove a prior graphic.
   * @param symbolGraphic A Graphic to add to the graphics layer of the map view.
   */
  private updateGraphicSymbol(symbolGraphic:__esri.Graphic) {
    if (this.symbolGraphic != null) {
      // a previous symbol must first be removed from the graphics layer
      this.esriMapView.graphics.remove(this.symbolGraphic);
    }
    this.symbolGraphic = symbolGraphic;
    this.esriMapView.graphics.add(symbolGraphic);
  }

  /**
   * Show a symbol on the map at the initial viewpoint location.
   * @param {string} symbol Either an asset id of a local symbol asset or a fully qualified URL to a PNG to use as the symbol.
   */
  private async showSymbol(symbol: string) {
    const xoffset: string = this.parsedOffset.x.toString();
    const yoffset: string = this.parsedOffset.y.toString();
    let symbolURL: string;
    if (symbol.match(/https?:\/\//) == null) {
      symbolURL = this.assetPath + symbol + ".png";
    } else {
      symbolURL = symbol;
    }
    const [
      PictureMarkerSymbol, Graphic, Point
    ] = await loadModules([
      "esri/symbols/PictureMarkerSymbol",
      "esri/Graphic",
      "esri/geometry/Point"
    ]);
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
    this.updateGraphicSymbol(symbolGraphic);
  }

  /**
   * Show a pin on the map at the initial viewpoint location.
   * @param {string} pinColor The color value of the pin symbol.
   */
  private async showPin(pinColor: string) {
    const [
      TextSymbol, Graphic, Point
    ] = await loadModules([
      "esri/symbols/TextSymbol",
      "esri/Graphic",
      "esri/geometry/Point"
    ], this.esriMapOptions);
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
      text: "\ue61d",
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
    this.updateGraphicSymbol(symbolGraphic);
  }

  render() {
    return <div class="esri-map-view" />;
  }

  /**
   * Constrain the UI to restrict the user from panning or zooming the map. If the UI is hidden then the
   * map view is constrained to the current extent. If the UI controls are showing then the map view is
   * constrained to the min/max zoom that was configured.
   * @param uiSetting Show or hide the UI controls (pan/zoom)
   * @param isInitializing True if we are in the initialization stage of the component, false if the component was previously initialized.
   * @returns {boolean} True if the UI is constrained.
   */
  private constrainUI(uiSetting: string, isInitializing: boolean): boolean {
    let isConstrained;
    // const zoom = this.esriMapView.zoom;

    if ( ! showUI(uiSetting)) {
      this.esriMapView.ui.remove(this.mapViewWidgets);
      this.esriMapView.constraints = {
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        geometry: this.esriMapView.extent
      }
      isConstrained = true;
    } else if ( ! isInitializing) {
      this.esriMapView.ui.add(this.mapViewWidgets);
      this.esriMapView.constraints = {}
      isConstrained = false;
    }
    return isConstrained;
  }

  /**
   * Validate the map properties to verify if we can render a map. Either a basemap or a webmap
   * must be specified. If neither are set then a default basemap is used.
   * @returns {boolean} True if we think we can render a map.
   */
  private verifyMapProps(): boolean {
    let isValid:boolean = true;
    if (this.webmap && (!isValidItemID(this.webmap) || !isValidURL(this.webmap))) {
      // if a web map is specified but it is not an item ID or a service URL then ignore it.
      this.webmap = null;
    }
    if (!this.basemap && !this.webmap) {
      // If there is no basemap and no web map then use a default basemap, no point to rendering nothing.
      this.basemap = this.defaultBasemap;
    }
    return isValid;
  }

  /**
   * Verify the viewpoint attribute and break it down to its individual parts.
   * @returns {boolean} True if a viewpoint is parsed.
   */
  private verifyViewpoint(): boolean {
    let isValid:boolean = false;
    if (!this.viewpoint && !this.webmap) {
      // if no initial viewpoint is specified then set a default
      this.viewpoint = "0,0,2";
    }
    if (this.viewpoint) {
      // if given an initial viewpoint then try to valid each part
      const parsedViewpoint:viewpointProps = parseViewpoint(this.viewpoint);
      this.longitude = parsedViewpoint.longitude;
      this.latitude = parsedViewpoint.latitude;
      this.levelOfDetail = parsedViewpoint.levelOfDetail;
      this.parsedViewpoint = true;
      isValid = true;
    }
    return isValid;
  }

  /**
   * Verify the search widget position is valid.
   * @returns {boolean} True if a valid search widget position is specified.
   */
  private verifySearch(): boolean {
    let isValid:boolean = true;
    this.search = this.search.toLocaleLowerCase();
    if (this.search && !isValidSearchPosition(this.search)) {
      // if given a search widget and it's not a valid UI position then ignore it.
      this.search = null;
      isValid = false;
    } else if (this.search == "off") {
      this.search = null;
    }
    return isValid;
  }

  /**
   * Verify the min and max zoom values are set properly.
   * @returns {boolean} True if min/max zoom is set.
   */
  private verifyMinMaxZoom(): boolean {
    let isValid:boolean = true;
    const zoom = parseMinMax(this.minmaxzoom, 0, 24);
    this.minZoom = zoom.min;
    this.maxZoom = zoom.max;
    return isValid;
  }

  /**
   * Verify and validate any attributes set on the component to make sure
   * we are in a valid starting state we can render.
   * @returns {boolean} True if all props are acceptable and we can render the map.
   */
  private verifyProps(): boolean {
    let isValid:boolean = true;
    isValid = this.verifyMapProps();
    isValid = this.verifyViewpoint();
    isValid = this.verifySearch();
    isValid = this.verifyMinMaxZoom();
    this.parsedOffset = parseOffset(this.symboloffset);
    return isValid;
  }
}
