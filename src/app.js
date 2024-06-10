/**
 * JavaScript app used to test changing component attributes after
 * the page is initially loaded.
 */
const mapElement = document.getElementById("mapview");
// const mapElement = document.getElementById("sceneview");
let clickCount = 0;

mapElement.addEventListener("mapLoaded", function() {
  console.log("mapLoaded event received");
});

mapElement.addEventListener("mapLoadError", function(errorEvent) {
  const error = errorEvent.detail;
  console.log("mapLoad failed event received for " + error.toString());
});

document.getElementById("test").addEventListener("click", function(clickEvent) {
  clickCount += 1;
  console.log("You clicked " + clickCount + " times.");
  if (mapElement) {
    // mapElement.setAttribute("apikey", "");
    // mapElement.setAttribute("layers", "");
    // mapElement.setAttribute("minmaxzoom", "");
    // mapElement.setAttribute("webmap", "06ceb8eb895d4484b1a23f167cc77932"); // bc918f639f354f8680f0769481cbb0e9
    if (clickCount < 2) {
      // mapElement.setAttribute("basemap", "navigation-dark-3d");
      mapElement.setAttribute("basemap", "arcgis/imagery/standard");
      mapElement.setAttribute("search", "bottom-right");
      // mapElement.setAttribute("basemap", "arcgis/navigation-night");
      // mapElement.setAttribute("viewpoint", "-75.1,39.5,10");
      // mapElement.setAttribute("symbol", "push-pin");
      // mapElement.setAttribute("symboloffset", "32,32");
      // mapElement.setAttribute("popuptitle", "This is a new title");
      // mapElement.setAttribute("popupinfo", "This info we want to show is not available at this time <b>Not now</b>.");
    } else if (clickCount < 3) {
      mapElement.setAttribute("ui", "off");
      mapElement.setAttribute("webmap", "bc918f639f354f8680f0769481cbb0e9");
    } else {
      // mapElement.setAttribute("basemap", "arcgis/navigation-night");
      mapElement.setAttribute("ui", "show");
      mapElement.setAttribute("viewpoint", "-79.3,38.6,11");
      mapElement.setAttribute("symbol", "red-flag");
      mapElement.setAttribute("symboloffset", "48,48");
      mapElement.setAttribute("popuptitle", "Title Threes");
      mapElement.setAttribute("popupinfo", "This is the <b>THIRD</b> try.");
    }
  } else {
    console.log("no map view");
  }
});
