import { parseLevelOfDetail } from './utils';

describe('parseLevelOfDetail', () => {
  it('returns object for no valid input', () => {
    expect(parseLevelOfDetail(undefined)).toEqual({
      longitude: 0,
      latitude: 0,
      levelOfDetail: 1,
      scale: 0
    });
  });

  it('returns object for invalid input', () => {
    expect(parseLevelOfDetail('0')).toEqual({
      longitude: 0,
      latitude: 0,
      levelOfDetail: 1,
      scale: 0
    });
  });

  it('returns object for invalid input', () => {
    expect(parseLevelOfDetail('0,0,0')).toEqual({
      longitude: 0,
      latitude: 0,
      levelOfDetail: 1,
      scale: 0
    });
  });

  it('returns object for valid input filling in missing defaults', () => {
    expect(parseLevelOfDetail('45.23234')).toEqual({
      longitude: 45.23234,
      latitude: 0,
      levelOfDetail: 1,
      scale: 0
    });
  });

  it('returns object for valid input filling in missing defaults', () => {
    expect(parseLevelOfDetail('45.23234,17.9084545,22')).toEqual({
      longitude: 45.23234,
      latitude: 17.9084545,
      levelOfDetail: 22,
      scale: 0
    });
  });
});
