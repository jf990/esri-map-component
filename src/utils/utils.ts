
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

export interface viewpointProps {
  longitude: number,
  latitude: number,
  levelOfDetail: number,
  scale: number
};

export function parseViewpoint(viewpoint: string): viewpointProps {
  const defaultLOD:number = 2;

  if (viewpoint === undefined || viewpoint === null || viewpoint == "") {
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
 * Parse a string looking for the minimum and maximum numbers. It expects either one
 * number or two numbers separated by a comma. The minimum and maximum values must be
 * within the range of the default min and max parameters. If only one value is parsed then it
 * is used for both min and max. If two numbers are parsed the smallest is set to
 * the min value and the largest to the max.
 * @param minMax {string} Either 1 or 2 numbers comma separated.
 * @param defaultMin {number} A number to use as the default value for the minimum if not found, or the smallest minimum value allowed.
 * @param defaultMax {number} A number to use as the default value for the maximum if not found, or the largest maximum value allowed.
 * @returns {object} {min, max}
 */
export interface minMaxProps {
  min: number,
  max: number
};

export function parseMinMax(minMax: string, defaultMin: number, defaultMax: number): minMaxProps {
  let min:number;
  let max:number;

  if (minMax === undefined || minMax === null || minMax == "") {
    minMax = `${defaultMin},${defaultMax}`;
  }
  let values:Array<any> = minMax.split(",");
  if (values.length < 1) {
    values[0] = defaultMin;
    values[1] = defaultMax;
  } else if (values.length < 2) {
    // if only 1 value provided then min and max should be the same value.
    values[1] = values[0];
  }
  min = parseInt(values[0]);
  if (Number.isNaN(min)) {
    min = defaultMin;
  }
  max = parseInt(values[1]);
  if (Number.isNaN(max)) {
    max = defaultMax;
  }
  if (max < min) {
    // if numbers are swapped then reverse them.
    const hold = max;
    max = min;
    min = hold;
  }
  if (min < defaultMin) {
    min = defaultMin;
  }
  if (max > defaultMax) {
    max = defaultMax;
  }
  return ({
    min: min,
    max: max,
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
  return ["top-left", "top-right", "bottom-left", "bottom-right", "off"].indexOf(position) >= 0;
}

/**
 * Given a user attribute setting for the UI show setting, return either true to show the UI
 * or false to hide it.
 * @param uiSetting {string} The string to check.
 * @returns {boolean} Either true or false.
 */
export function showUI(uiSetting: string): boolean {
  const allLower = uiSetting ? uiSetting.toLocaleLowerCase() : "";
  if (["false", "off", "hide", "disable", "0"].indexOf(allLower) >= 0) {
    return false;
  }
  return true;
}
