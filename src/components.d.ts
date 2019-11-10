/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface EsriMapView {
    /**
    * Indicate a basemap id to use for the map. This property will be overridden by `webmap` if that property is provided. If neither `webmap` nor `basemap` are set, then a default basemap is assigned.
    */
    'basemap': string;
    /**
    * Indicate an initial viewpoint to focus the map. This is a string or 3 numbers expected: latitude (y), longitude (x), and levelOfDetail (LOD).
    */
    'viewpoint': string;
    /**
    * Indicate a web map id to use for the map. If neither `webmap` nor `basemap` are set, then a default basemap is assigned.
    */
    'webmap': string;
  }
}

declare global {


  interface HTMLEsriMapViewElement extends Components.EsriMapView, HTMLStencilElement {}
  var HTMLEsriMapViewElement: {
    prototype: HTMLEsriMapViewElement;
    new (): HTMLEsriMapViewElement;
  };
  interface HTMLElementTagNameMap {
    'esri-map-view': HTMLEsriMapViewElement;
  }
}

declare namespace LocalJSX {
  interface EsriMapView {
    /**
    * Indicate a basemap id to use for the map. This property will be overridden by `webmap` if that property is provided. If neither `webmap` nor `basemap` are set, then a default basemap is assigned.
    */
    'basemap'?: string;
    /**
    * Indicate an initial viewpoint to focus the map. This is a string or 3 numbers expected: latitude (y), longitude (x), and levelOfDetail (LOD).
    */
    'viewpoint'?: string;
    /**
    * Indicate a web map id to use for the map. If neither `webmap` nor `basemap` are set, then a default basemap is assigned.
    */
    'webmap'?: string;
  }

  interface IntrinsicElements {
    'esri-map-view': EsriMapView;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'esri-map-view': LocalJSX.EsriMapView & JSXBase.HTMLAttributes<HTMLEsriMapViewElement>;
    }
  }
}


