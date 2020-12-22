import React from 'react';
import renderer from 'react-test-renderer';
import APP from '../App';

describe('APP Tests', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<APP />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});




