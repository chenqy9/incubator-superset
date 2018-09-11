import { describe, it } from 'mocha';
import { expect } from 'chai';

import {
  FETCH_ALL_SLICES_FAILED,
  FETCH_ALL_SLICES_STARTED,
  SET_ALL_SLICES,
} from '../../../../src/dashboard/actions/sliceEntities';

import sliceEntitiesReducer from '../../../../src/dashboard/reducers/sliceEntities';

describe('sliceEntities reducer', () => {
  it('should return initial state', () => {
    expect(sliceEntitiesReducer({}, {})).to.deep.equal({});
  });

  it('should set loading when fetching slices', () => {
    expect(
      sliceEntitiesReducer(
        { isLoading: false },
        { type: FETCH_ALL_SLICES_STARTED },
      ).isLoading,
    ).to.equal(true);
  });

  it('should set slices', () => {
    const result = sliceEntitiesReducer(
      { slices: { a: {} } },
      { type: SET_ALL_SLICES, payload: { slices: { 1: {}, 2: {} } } },
    );

    expect(result.slices).to.deep.equal({
      1: {},
      2: {},
      a: {},
    });
    expect(result.isLoading).to.equal(false);
  });

  it('should set an error on error', () => {
    const result = sliceEntitiesReducer(
      {},
      {
        type: FETCH_ALL_SLICES_FAILED,
        payload: { error: 'failed' },
      },
    );
    expect(result.isLoading).to.equal(false);
    expect(result.errorMessage.indexOf('failed')).to.be.above(-1);
  });
});
