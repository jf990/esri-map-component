import { parseViewpoint, isValidItemID, isValidSearchPosition } from './utils';

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
