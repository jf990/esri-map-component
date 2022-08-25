/**
 * Unit tests for functions exported in utils.ts.
 */
import {
  parseViewpoint,
  parseCameraPosition,
  parseOffset,
  isValidItemID,
  isValidURL,
  isValidSearchPosition,
  getApiKey
} from './utils';

describe('parseViewpoint', () => {
  it('returns object for no valid input', () => {
    expect(parseViewpoint(undefined)).toEqual({
      longitude: 0,
      latitude: 0,
      levelOfDetail: 2,
      scale: 0
    });
  });

  it('returns object for invalid input', () => {
    expect(parseViewpoint('0')).toEqual({
      longitude: 0,
      latitude: 0,
      levelOfDetail: 2,
      scale: 0
    });
  });

  it('returns object for invalid input', () => {
    expect(parseViewpoint('0,0,0')).toEqual({
      longitude: 0,
      latitude: 0,
      levelOfDetail: 2,
      scale: 0
    });
  });

  it('returns object for valid input filling in missing defaults', () => {
    expect(parseViewpoint('45.23234')).toEqual({
      longitude: 45.23234,
      latitude: 0,
      levelOfDetail: 2,
      scale: 0
    });
  });

  it('returns object for valid input', () => {
    expect(parseViewpoint('45.23234,17.9084545,22')).toEqual({
      longitude: 45.23234,
      latitude: 17.9084545,
      levelOfDetail: 22,
      scale: 0
    });
  });

  it('returns object for valid input', () => {
    expect(parseViewpoint('-73.991062,40.872496,9')).toEqual({
      longitude: -73.991062,
      latitude: 40.872496,
      levelOfDetail: 9,
      scale: 0
    });
  });
});

describe('parseCameraPosition', () => {
  it('parseCameraPosition returns object for no valid input', () => {
    expect(parseCameraPosition(undefined)).toEqual({
      x: 0,
      y: 0,
      z: 50000,
      heading: 90,
      tilt: 0
    });
  });

  it('parseCameraPosition returns missing values', () => {
    expect(parseCameraPosition("1,2,3")).toEqual({
      x: 1,
      y: 2,
      z: 3,
      heading: 90,
      tilt: 0
    });
  });

  it('parseCameraPosition returns missing values', () => {
    expect(parseCameraPosition("1,")).toEqual({
      x: 1,
      y: 0,
      z: 50000,
      heading: 90,
      tilt: 0
    });
  });

  it('parseCameraPosition returns missing values', () => {
    expect(parseCameraPosition("1,2,3,4")).toEqual({
      x: 1,
      y: 2,
      z: 3,
      heading: 4,
      tilt: 0
    });
  });

  it('parseCameraPosition returns all values', () => {
    expect(parseCameraPosition("1,2,3,4,5")).toEqual({
      x: 1,
      y: 2,
      z: 3,
      heading: 4,
      tilt: 5
    });
  });
});

describe('parseOffset', () => {
  it('returns offset for no valid input', () => {
    expect(parseOffset(undefined)).toEqual({
      x: 0,
      y: 0
    });
  });

  it('returns offset for valid input', () => {
    expect(parseOffset("1,1")).toEqual({
      x: 1,
      y: 1
    });
  });

  it('returns offset for valid input', () => {
    expect(parseOffset("-12.3,-3.2")).toEqual({
      x: -12.3,
      y: -3.2
    });
  });
});

describe("Check item ID", () => {
  const testID:string = "33fc2fa407ab40f9add12fe38d5801f5";

  it('returns true for valid input', () => {
    expect(isValidItemID(testID)).toBeTruthy();
    expect(isValidItemID("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).toBeTruthy();
  });

  it('returns false for invalid input', () => {
    expect(isValidItemID(undefined)).toBeFalsy();
    expect(isValidItemID(null)).toBeFalsy();
    expect(isValidItemID("")).toBeFalsy();
    expect(isValidItemID("0")).toBeFalsy();
    expect(isValidItemID(" ")).toBeFalsy();
    expect(isValidItemID(" 33fc2fa4040f9add12fe38d5801f5 ")).toBeFalsy();
    expect(isValidItemID("111113fc2fa4040f9add12fe38d5801f5")).toBeFalsy();
    expect(isValidItemID("33fc2fa407ab40fxadd12fe38d5801f5")).toBeFalsy();
    expect(isValidItemID("3fc2fa407ab40fadd12fe38d5801f")).toBeFalsy();
    expect(isValidItemID("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")).toBeFalsy();
    expect(isValidItemID("                                ")).toBeFalsy();
  });
});

describe("Check URL", () => {
  it('returns true for valid URL', () => {
    expect(isValidURL("http://service.arcgis.com/test")).toBeTruthy();
    expect(isValidURL("https://s.a.com")).toBeTruthy();
    expect(isValidURL("https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/berlin_cycle_routes/FeatureServer")).toBeTruthy();
  });

  it('returns false for invalid input', () => {
    expect(isValidURL(undefined)).toBeFalsy();
    expect(isValidURL(null)).toBeFalsy();
    expect(isValidURL("")).toBeFalsy();
    expect(isValidURL("0")).toBeFalsy();
    expect(isValidURL(" ")).toBeFalsy();
    expect(isValidURL(",;,")).toBeFalsy();
    expect(isValidURL("service.arcgis.com")).toBeFalsy();
    expect(isValidURL("111113fc2fa4040f9add12fe38d5801f5")).toBeFalsy();
    expect(isValidURL("ftp://arcgis/rest/services")).toBeFalsy();
  });
});

describe("Valid search position", () => {

  it('returns true for valid input', () => {
    expect(isValidSearchPosition("top-left")).toBeTruthy();
    expect(isValidSearchPosition("bottom-right")).toBeTruthy();
    expect(isValidSearchPosition("top-right")).toBeTruthy();
    expect(isValidSearchPosition("bottom-left")).toBeTruthy();
  });

  it('returns false for invalid input', () => {
    expect(isValidSearchPosition(undefined)).toBeFalsy();
    expect(isValidSearchPosition(null)).toBeFalsy();
    expect(isValidSearchPosition("")).toBeFalsy();
    expect(isValidSearchPosition("0")).toBeFalsy();
    expect(isValidSearchPosition(" ")).toBeFalsy();
    expect(isValidSearchPosition("1234")).toBeFalsy();
  });
});

describe("Get apiKey", () => {

  it('returns key for valid input', () => {
    expect(getApiKey("")).toBeTruthy();
    expect(getApiKey(undefined)).toBeTruthy();
    expect(getApiKey(null)).toBeTruthy();
    expect(getApiKey("AAPK1234")).toBe("AAPK1234");
  });
});
