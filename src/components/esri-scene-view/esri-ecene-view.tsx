import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'esri-scene-view',
})
export class EsriSceneView {

  @Prop() name: string = "Esri";

  render() {
    return (
      <p>
        My scene is {this.name}
      </p>
    );
  }
}
