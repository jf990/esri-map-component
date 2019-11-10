import { Component, Prop, h } from '@stencil/core';
import {parseLevelOfDetail, viewpointProps} from '../../utils/utils';

@Component({
  tag: 'esri-map-view',
  styleUrl: 'esri-map-view.css',
  shadow: true
})
export class EsriMapView {
  /**
   * Indicate a basemap id to use for the map. This property will be overridden by
   * `webmap` if that property is provided. If neither `webmap` nor `basemap` are set, then
   * a default basemap is assigned.
   */
  @Prop() basemap: string;

  /**
   * Indicate a web map id to use for the map. If neither `webmap` nor `basemap`
   * are set, then a default basemap is assigned.
   */
  @Prop() webmap: string;

  /**
   * Indicate an initial viewpoint to focus the map. This is a string or 3 numbers
   * expected: latitude (y), longitude (x), and levelOfDetail (LOD).
   */
  @Prop() viewpoint: string;

  /**
   * Viewpoint longitude coordinate expected to be a number valid for the spatial reference
   * of the map WGS84.
   */
  @Prop() longitude: Number;

  /**
   * Viewpoint latitude coordinate expected to be a number valid for the spatial reference
   * of the map WGS84.
   */
  @Prop() latitude: Number;

  /**
   * Viewpoint level of detail integer between 0 and 24.
   */
  @Prop() levelOfDetail: Number;

  /**
   * This is a debug formatter to help see what properties and state are set.
   */
  private debugString(message): string {
    return message;
  }

  /**
   * Verify and validate any attributes set on the component to make sure
   * we are in a valid starting state we can render.
   */
  private verifyProps(): boolean {
    let isValid:boolean = false;
    if (!this.basemap && !this.webmap) {
      this.basemap = "osm";
    }
    if (!this.viewpoint) {
      this.viewpoint = "0,0,1";
    }
    const parsedViewpoint:viewpointProps = parseLevelOfDetail(this.viewpoint);
    this.longitude = parsedViewpoint.longitude;
    this.latitude = parsedViewpoint.latitude;
    this.levelOfDetail = parsedViewpoint.levelOfDetail;
    return isValid;
  }

  connectedCallback() {
    this.verifyProps();
  }

  render() {
    return <div>Esri MapView: <span class="error-message">{this.debugString(this.basemap + " " + this.webmap + " X:" + this.longitude + ", Y:" + this.latitude + ", LOD:" + this.levelOfDetail)}</span></div>;
  }
}
