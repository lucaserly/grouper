import React from 'react';
import { render } from '@testing-library/react-native';
import helperFuncs from '../utils/helperFunctions';
import mocks from '../__mocks__/mocks';
import testResults from './SourceList.test';

describe('helperfuncs tests', () => {
  test('xToIndex should return an index', () => {
    const a = mocks.xToIndex.x;
    const b = mocks.xToIndex.scrollOffSet;
    const c = mocks.xToIndex.flatListLayoutX;
    const d = mocks.xToIndex.listItemWidth;
    const output = 1;
    expect(helperFuncs.xToIndex(a, b, c, d)).toEqual(output);
  });
  test('xToIndex should return error if denominator is 0', () => {
    const a = mocks.xToIndex.x;
    const b = mocks.xToIndex.scrollOffSet;
    const c = mocks.xToIndex.flatListLayoutX;
    const d = 0;
    expect(() => {
      helperFuncs.xToIndex(a, b, c, d);
    }).toThrow();
  });
  test('xToIndex should return error if args are strings', () => {
    const a = '';
    const b = '';
    const c = '';
    const d = '';
    expect(() => {
      helperFuncs.xToIndex(a, b, c, d);
    }).toThrow();
  });
  test('xToIndex should return index whithin array s length', () => {
    const a = 300;
    const b = mocks.xToIndex.scrollOffSet;
    const c = mocks.xToIndex.flatListLayoutX;
    const d = mocks.xToIndex.listItemWidth;
    const e = mocks.xToIndex.arrLen;
    const output = 6;
    const arrayLength = testResults.arrayLength;
    if (output > arrayLength || output < 0) expect(() => {
      helperFuncs.xToIndex(a, b, c, d, e);
    }).toThrow();
  });
});
