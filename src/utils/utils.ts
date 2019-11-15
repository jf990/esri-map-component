
/**
 * Utility functions and helpers.
 */

/**
 * Parse a viewpoint string into its constituent parts: longitude, latitude, and level of detail. This helper makes sure all the parts
 * are valid values and assigned defaults when things are missing.
 * @param viewpoint {string} Expect 3 comma separated number indicating longitude, latitude, and level of detail, e.g. "-118.4324,34.1234,9".
 * @returns {Object} An object made up of {longitude, latitude, levelOfDetail, scale}
 */

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
