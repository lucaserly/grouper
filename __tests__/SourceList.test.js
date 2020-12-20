import React from 'react';
import { FlatList, View } from 'react-native';
import { render, fireEvent, createEvent, cleanup } from '@testing-library/react-native';
import SourceList from '../components/SourceList';
import mocks from '../__mocks__/mocks';

const testResults = {};

describe('SourceList Tests', () => {
  afterEach(() => {
    cleanup();
  });
  test('the list is an array', () => {
    const { getByTestId } = render(<SourceList sourceData={mocks.sourceData} />);
    const element = Array.isArray(getByTestId('sourcelist')._fiber.stateNode.children[0].children);
    expect(element).toEqual(true);
  });
  test('the list is an array with elements', () => {
    const { getByTestId } = render(<SourceList sourceData={mocks.sourceData} />);
    const arrayLen = getByTestId('sourcelist')._fiber.stateNode.children[0].children.length;
    const output = 3;
    expect(arrayLen).toEqual(output);
    testResults.arrayLength = arrayLen;
  });
  // test('get an overview of the dom', () => {
  //   const { debug } = render(<SourceList sourceData={mocks.sourceData} />);
  //   debug();
  // });
});

export default testResults;