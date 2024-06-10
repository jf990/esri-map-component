/**
 * Unit tests for functions exported in utils.ts.
 */
import {
  parseViewpoint,
  parseMinMax,
  parseCameraPosition,
  parseOffset,
  isValidItemID,
  isValidURL,
  isValidSearchPosition,
  showUI
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

describe('parseMinMax', () => {
  it('parseMinMax returns object for no valid input', () => {
    expect(parseMinMax(undefined, 0, 0)).toEqual({
      min: 0,
      max: 0
    });
  });

  it('parseMinMax returns object for empty input', () => {
    expect(parseMinMax("", 0, 0)).toEqual({
      min: 0,
      max: 0
    });
  });

  it('parseMinMax returns object for reversed input', () => {
    expect(parseMinMax("22,13", 1, 24)).toEqual({
      min: 13,
      max: 22
    });
  });

  it('parseMinMax returns object for expected input', () => {
    expect(parseMinMax("5,12", 1, 24)).toEqual({
      min: 5,
      max: 12
    });
  });

  it('parseMinMax returns object for expected input', () => {
    expect(parseMinMax("5", 1, 24)).toEqual({
      min: 5,
      max: 5
    });
  });

  it('parseMinMax returns object for expected input', () => {
    expect(parseMinMax("5,5", 1, 24)).toEqual({
      min: 5,
      max: 5
    });
  });

  it('parseMinMax returns object for expected input', () => {
    expect(parseMinMax("64,-1", 0, 24)).toEqual({
      min: 0,
      max: 24
    });
  });

  it('parseMinMax returns object for expected input', () => {
    expect(parseMinMax("64000, 22", 0, 250000000)).toEqual({
      min: 22,
      max: 64000
    });
  });

  it('parseMinMax returns object for expected input', () => {
    expect(parseMinMax("250000000, 22", 50, 200000000)).toEqual({
      min: 50,
      max: 200000000
    });
  });

  it('parseMinMax returns object for expected input', () => {
    expect(parseMinMax("22, 250000000", 50, 200000000)).toEqual({
      min: 50,
      max: 200000000
    });
  });

  it('parseMinMax returns object for expected input', () => {
    expect(parseMinMax("22, 250000, 49, 50, 51", 50, 200000000)).toEqual({
      min: 50,
      max: 250000
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
    expect(isValidSearchPosition("off")).toBeTruthy();
  });

  it('returns false for invalid input', () => {
    expect(isValidSearchPosition(undefined)).toBeFalsy();
    expect(isValidSearchPosition(null)).toBeFalsy();
    expect(isValidSearchPosition("")).toBeFalsy();
    expect(isValidSearchPosition("0")).toBeFalsy();
    expect(isValidSearchPosition(" ")).toBeFalsy();
    expect(isValidSearchPosition("1234")).toBeFalsy();
    expect(isValidSearchPosition("on")).toBeFalsy();
    expect(isValidSearchPosition("true")).toBeFalsy();
  });
});

describe("Valid UI setting", () => {

  it("returns true for request to show (or the default)", () => {
    expect(showUI("on")).toBe(true);
    expect(showUI("show")).toBe(true);
    expect(showUI("enable")).toBe(true);
    expect(showUI("true")).toBe(true);
    expect(showUI("1")).toBe(true);
    expect(showUI("")).toBe(true);
    expect(showUI(null)).toBe(true);
    expect(showUI(undefined)).toBe(true);
  });

  it("returns false for request to hide", () => {
    expect(showUI("hide")).toBe(false);
    expect(showUI("false")).toBe(false);
    expect(showUI("disable")).toBe(false);
    expect(showUI("0")).toBe(false);
    expect(showUI("abc")).toBe(true);
  });
});
