/**
 * Utility functions and helpers.
 */

/**
 * Parse a viewpoint string into its constituent parts: longitude, latitude, and level of detail.
 * @param viewpoint {string} Expect 3 comma separated number indicating longitude, latitude, and level of detail.
 * @returns {Object} An object made up of {longitude, latitude, levelOfDetail}
 */

export interface viewpointProps {
  longitude: Number,
  latitude: Number,
  levelOfDetail: Number,
  scale: Number
};

export function parseLevelOfDetail(viewpoint: string): viewpointProps {
  if (viewpoint === undefined || viewpoint === null) {
    viewpoint = "0,0,1";
  }
  let values:Array<any> = viewpoint.split(',');
  if (values.length < 3) {
    values[2] = 1;
  }
  return ({
    longitude: Number(values[0]) || 0,
    latitude: Number(values[1]) || 0,
    levelOfDetail: Number(values[2]) || 1,
    scale: 0
  });
}
