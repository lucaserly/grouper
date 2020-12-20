import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';

import { render, fireEvent, act, waitFor, cleanup } from '@testing-library/react-native';
import RenderItem from '../components/RenderItem';
import mocks from '../__mocks__/mocks';
import testResults from './SourceList.test';

import SourceList from '../components/SourceList';
import renderer from 'react-test-renderer';

describe('RenderItem Tests', () => {
  afterEach(() => {
    cleanup();
  });
  test('render item to be defined ', () => {
    const { getByTestId } = render(<RenderItem item={mocks.imageItem} />);
    const element = getByTestId('renderitem');
    expect(element).toBeDefined();
  });
  test('render image to be an image component', () => {
    const { getByTestId } = render(<RenderItem item={mocks.imageItem} />);
    const element = getByTestId('renderitem')._fiber.stateNode.props.children.type.displayName;
    // console.log('TYPE DISPLAYNAME-->', element);
    expect(element).toEqual('Image');
  });
  test('render text to be a text component', () => {
    const { getByTestId } = render(<RenderItem item={mocks.textItem} />);
    const element = getByTestId('renderitem')._fiber.stateNode.props.children.type.displayName;
    expect(element).toEqual('Text');
  });
  test('render text to contain text', async () => {
    const { getByText } = render(<RenderItem item={mocks.textItem} />);
    expect(getByText(/Lucas/i)).toBeTruthy();
    // expect(getByText('Lucas')).toBeTruthy();
  });
  test('test that the on press function is being called', async () => {
    const mockFunc = jest.fn();
    const { getByTestId } = render(<RenderItem item={mocks.textItem} panHandlers={{ onResponderRelease: mockFunc }} />);
    const element = getByTestId('renderitem');
    // console.log('element.props-->', element.props);
    element.props.onResponderRelease({
      touchHistory: {
        touchBank: []
      }
    });
    expect(mockFunc).toHaveBeenCalled();
  });
  test('test that once element is pressed the sourcelist has one element less', async () => {
    const mockFunc = jest.fn();

    // const treeBefore = renderer.create(<SourceList sourceData={mocks.sourceData} />).toTree();
    // console.log('treeBefore', treeBefore);
    // console.log('treeBefore.rendered.props', treeBefore.rendered.props);
    // console.log('treeBefore.rendered.props.data[0].props', treeBefore.rendered.props.data[0].props);

    jest.mock('../utils/helperFunctions', () => {
      return {
        __esModule: true,
        default: { xToIndex: jest.fn().mockReturnValue(0) },
      };
    });
    const { getAllByTestId } = render(<SourceList sourceData={mocks.sourceData} listItemWidth={80}
    />);
    const elements = getAllByTestId('renderitem');
    console.log('elements.length-->', elements.length);
    // console.log('elements[0].props-->', elements[0].props);

    // utils/helperFunctions.tsx
    // elements[0].props

    // console.log('elements[0].props-->', elements[0].props);

    // elements[0].props.onResponderRelease();

    const gestureState = {
      "_accountsForMovesUpTo": 189576495.19004163,
      "dx": 0,
      "dy": 0,
      "moveX": 49,
      "moveY": 607,
      "numberActiveTouches": 0,
      "stateID": 0.1669364666181461,
      "vx": 0,
      "vy": 0,
      "x0": 49,
      "y0": 607,
    };

    const test = 'igor';

    // const

    await act(async () => {
      await waitFor(() => {
        elements[0].props.onResponderGrant({
          touchHistory: {
            touchBank: [],
            igor: "igor"
          },
        }, gestureState);
      });
      /* fire events that update state */
      elements[0].props.onResponderRelease({
        touchHistory: {
          touchBank: []
        },

      }, gestureState);
    });


    // fireEvent.press(elements[0].props.panResponder);
    expect(elements.length).toBe(2);

    // console.log('elements.length AFTER-->', elements.length);



  });
});


   // const { container } = render(<SourceList sourceData={mocks.sourceData} />);
    // const RenderDom = render(<RenderItem item={mocks.textItem} panHandlers={{ onResponderRelease: mockFunc }} />);
    // const sourceListChildren = getByTestId('sourcelist')._fiber.stateNode.children[0].children;

    // console.log('container-->', container);


// console.log all the props
// make them the smallest possible
// shallow rendering
// create the smallest mock data it can accepts
// item Object


  // console.log('treeBefore.children[0]', treeBefore.children[0].children);


    // const { getByTestId } = render(<RenderItem item={mocks.textItem} panHandlers={{ onResponderRelease: mockFunc }} />);
    // const element = getByTestId('renderitem');
    // // console.log('element.props-->', element.props);
    // element.props.onResponderRelease({
    //   touchHistory: {
    //     touchBank: []
    //   }
    // });

    // HOW CAN I ACCESS

    // const treeAfter = renderer.create(<SourceList sourceData={mocks.sourceData} />).toJSON();
    // console.log('treeAfter.children', treeAfter.children);
    // console.log('treeAfter.children[0]', treeAfter.children[0].children);

    // i get one item by text
    // trigger the on release
    // check the length again

    // console.log('sourceListChildren-->', sourceListChildren);

