
/**
 * Utility functions and helpers.
 */

/**
 * Parse a viewpoint string into its constituent parts: longitude, latitude, and
 * level of detail. This helper makes sure all the parts are valid values and
 * assigned defaults when things are missing.
 *
 * @param viewpoint {string} Expect 3 comma separated number indicating
 *   longitude, latitude, and level of detail, e.g. "-118.4324,34.1234,9".
 * @returns {viewpointProps} An object made up of {longitude, latitude,
 *   levelOfDetail, scale}
 */
import {API_KEY} from "../secret";

export interface viewpointProps {
  longitude: number,
  latitude: number,
  levelOfDetail: number,
  scale: number
};

export function parseViewpoint(viewpoint: string): viewpointProps {
  const defaultLOD:number = 2;

  if (viewpoint === undefined || viewpoint === null) {
    viewpoint = "0,0," + defaultLOD;
  }
  let values:Array<any> = viewpoint.split(",");
  if (values.length < 3) {
    values[2] = defaultLOD;
  }
  return ({
    longitude: parseFloat(values[0]) || 0,
    latitude: parseFloat(values[1]) || 0,
    levelOfDetail: parseInt(values[2]) || defaultLOD,
    scale: 0
  });
}

/**
 * Parse an offset string into its constituent parts: x, y. This helper
 * makes sure all the parts are valid values and assigned defaults when
 * things are missing.
 *
 * @param offset {string} Expect 2 comma separated numbers indicating x and y
 *   values for a geographic offset, denominated in points. e.g. "-2,3".
 * @returns {offsetProps} An object made up of {x, y}
 */

 export interface offsetProps {
  x: number,
  y: number
};

export function parseOffset(offset: string): offsetProps {
  if (offset === undefined || offset === null) {
    offset = "0,0";
  }
  let values:Array<any> = offset.split(",");
  return ({
    x: parseFloat(values[0]) || 0,
    y: parseFloat(values[1]) || 0
  });
}

/**
 * Parse a camera position string into its constituent parts: x, y, z, heading,
 * and tilt. This helper makes sure all the parts are valid values and
 * assigned defaults when things are missing.
 *
 * @param cameraPosition {string} Expect 5 comma separated numbers indicating
 *   x, y, z, heading, and tilt, e.g. "-118.4324,34.1234,9,93.5,86.9".
 * @returns {cameraProps} An object made up of {x, y, z, heading, tilt}
 */

export interface cameraProps {
  x: number,
  y: number,
  z: number,
  heading: number,
  tilt: number
};

export function parseCameraPosition(cameraPosition: string): cameraProps {
  const defaultZ:number = 50000;
  const defaultHeading:number = 90;
  const defaultTilt:number = 0;

  if (cameraPosition === undefined || cameraPosition === null) {
    cameraPosition = `0,0,${defaultZ},${defaultHeading},${defaultTilt}`;
  }
  let values:Array<any> = cameraPosition.split(",");
  if (values.length < 5) {
    const defaultFill = [0,0,defaultZ,defaultHeading,defaultTilt];
    for (let i = values.length; i < 5; i ++) {
      values[i] = defaultFill[i];
    }
  }
  return ({
    x: parseFloat(values[0]) || 0,
    y: parseFloat(values[1]) || 0,
    z: parseFloat(values[2]) || defaultZ,
    heading: parseFloat(values[3]) || defaultHeading,
    tilt: parseFloat(values[4]) || defaultTilt,
  });
}

/**
 * Helper function to test a string to see if it is a valid ArcGIS Online item ID.
 * @param itemID {string} A proposed ArcGIS Online item ID.
 * @returns {boolean} `true` if the input appears to be a valid item ID, otherwise `false`.
 */
export function isValidItemID(itemID: string): boolean {
  return /^[a-f0-9]{32}$/.test(itemID);
}

/**
 * Helper function to test a string to see if it is a valid URL.
 * @param itemID {string} A proposed URL.
 * @returns {boolean} `true` if the input appears to be a valid URL, otherwise `false`.
 */
export function isValidURL(url: string): boolean {
  return /^http(s)?:\/\//.test(url);
}

/**
 * Verify a proposed search widget position is an expected value.
 * @param position {string} A search position specification.
 * @returns {boolean} `true` when OK, `false` when bad.
 */
export function isValidSearchPosition(position: string): boolean {
  return ["top-left", "top-right", "bottom-left", "bottom-right"].indexOf(position) >= 0;
}

/**
 * Return the api key if one is provided otherwise get it from the .env
 * @param apiKey {string} existing API key if you have one.
 * @returns string API key
 */
export function getApiKey(apiKey): string {
  if (apiKey == undefined || apiKey == null || apiKey == "" || apiKey == "YOUR_API_KEY") {
    if (API_KEY) {
      return API_KEY;
    } else {
      return "You-must-set-apikey";
    }
  } else {
    return apiKey;
  }
}
