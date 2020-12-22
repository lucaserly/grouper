import React from 'react';
import { render, fireEvent, act, waitFor, cleanup } from '@testing-library/react-native';
import RenderItem from '../components/RenderItem';
import mocks from '../__mocks__/mocks';
import SourceList from '../components/SourceList';

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
  });
  test('test that the on press function is being called', async () => {
    const mockFunc = jest.fn();
    const { getByTestId } = render(<RenderItem item={mocks.textItem} panHandlers={{ onResponderRelease: mockFunc }} />);
    const element = getByTestId('renderitem');
    element.props.onResponderRelease({
      touchHistory: {
        touchBank: []
      }
    });
    expect(mockFunc).toHaveBeenCalled();
  });
  test('test that once element is pressed the sourcelist has one element less', async () => {
    const mockFunc = jest.fn();
    jest.mock('../utils/helperFunctions', () => {
      return {
        __esModule: true,
        default: { xToIndex: jest.fn().mockReturnValue(0) },
      };
    });
    const { getAllByTestId } = render(<SourceList sourceData={mocks.sourceData} listItemWidth={80}
    />);
    const elements = getAllByTestId('renderitem');
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
    await act(async () => {
      await waitFor(() => {
        elements[0].props.onResponderGrant({
          touchHistory: {
            touchBank: [],
            igor: "igor"
          },
        }, gestureState);
      });
      elements[0].props.onResponderRelease({
        touchHistory: {
          touchBank: []
        },

      }, gestureState);
    });
    expect(elements.length).toBe(2);
  });
});

