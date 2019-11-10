import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

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
   * This is a debug formatter to help see what properties and state are set.
   */
  private debugString(): string {
    return format(this.basemap, this.webmap, this.viewpoint);
  }

  render() {
    return <div>This is a MapView with {this.debugString()}</div>;
  }
}
