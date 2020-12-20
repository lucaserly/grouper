import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Text,
  FlatList,
  Image,
  PanResponder,
  View,
} from 'react-native';

import RenderItem from './RenderItem';
import helperFuncs from './../utils/helperFunctions'

const SourceList = (props: any) => {
  const {
    horizontal,
    sendItems,
    targetListLocation,
    listItemWidth,
    listItemHeight,
    sourceStyle,
    sourceData,
    sendSourceLocation,
    sourceListLocation,
    targetCounter,
    setTargetCounter,
    sourceCounter,
    setSourceCounter
  } = props;

  // console.log('INSIDE SOURCELIST sourceData', sourceData)

  console.log('listItemWidth', listItemWidth)
  const [sourceList, setsourceList] = useState(sourceData);
  const [currentItem, setcurrentItem] = useState({});
  const [hidden, sethidden] = useState(true);

  const [draggingIndex, setdraggingIndex] = useState(-1);

  let animatedItemPoint = useRef(new Animated.ValueXY()).current;
  let currentItemIndex = -1;
  let scrollOffSet = 0;
  let flatListLayoutX = 0;

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log('evt', evt)
        console.log('gestureState', gestureState)
        // console.log('evt', evt)
        sethidden(false);
        // currentItemIndex = xToIndex(gestureState.x0);
        // console.log('gestureState', {...gestureState})
        currentItemIndex = helperFuncs.xToIndex(gestureState.x0, scrollOffSet, flatListLayoutX,
          listItemWidth, sourceList.length); // consider implementing typescript for the helper function's arguments.
        console.log('currenindex GRANT', currentItemIndex)
        setdraggingIndex(currentItemIndex)
        setcurrentItem(sourceList[currentItemIndex]);

        Animated.event([{
          y: animatedItemPoint.y,
          x: animatedItemPoint.x,
        }], { useNativeDriver: false })({
          y: gestureState.y0 - 50 - listItemHeight / 2,
          x: gestureState.x0 - listItemWidth / 2,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{
          y: animatedItemPoint.y,
          x: animatedItemPoint.x,
        }], { useNativeDriver: false })({
          y: gestureState.moveY - 50 - listItemHeight / 2,
          x: gestureState.moveX - listItemWidth / 2,
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('RELEASE')
        // console.log('currenindex', currentItemIndex)
        // console.log('gestureState', {...gestureState})
        // console.log('gestureState', gestureState)

        const itemToSend = sourceList[currentItemIndex]; // Why not currentItem????
        console.log('itemToSend', itemToSend)
        Animated.decay(animatedItemPoint, {
          useNativeDriver: false,
          velocity: { x: gestureState.vx, y: gestureState.vy },
          deceleration: 0.996,
        }).start(() => {
          Animated.timing(animatedItemPoint, {
            toValue: {
              y: targetListLocation,
              x: targetCounter * listItemWidth,
            },
            duration: 500,
            useNativeDriver: false,
          }).start(() => {
            sendItems(itemToSend); // one of these 4 caues memory leak
            sethidden(true);
            setTargetCounter(targetCounter + 1);
            setSourceCounter(sourceCounter - 1);
          });
        });

        /*
        * Check if there's a reason for creating the new variable (newSourceList).
        * Eitherclone the old list and workwith the newSourceList ====>let newSourceList = [...sourceList];
        *ORuse the old sourceList directly. There's no need forthe new variable.
        */
        let newSourceList = sourceList;
        if (currentItemIndex > -1) {
          newSourceList.splice(currentItemIndex, 1);
        }
        setsourceList(newSourceList);
        setdraggingIndex(-1);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    }),
  ).current;

  // test the result of the function not the logic itself
  // if you press
  // focus on trigger the event of releasing the pan responder


  // Incorporate the viewon this function into the renderItem component
  //Get rid of this function and render the component directly on line145

  return (
    <>
      <FlatList
        data={sourceList}
        testID='sourcelist'
        renderItem={({ item, index }) => {
          // const panner = { ...panResponder.panHandlers };
          // console.log('INSIDE FLAT LIST')
          // console.log('item', item)
          // console.log('index', index)
          // console.log('sourceStyle', sourceStyle)
          // console.log('panner', panner)
          return <RenderItem item={item} index={index} sourceStyle={sourceStyle} panHandlers={panResponder.panHandlers} panResponder={panResponder} />
          // return RenderItem(item, index, sourceStyle, panner)
        }}
        keyExtractor={(item, index) => index + ''}
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ position: 'absolute' }}
        scrollEventThrottle={16}
        onScroll={e => scrollOffSet = e.nativeEvent.contentOffset.x}
        onLayout={(e) => {
          // console.log('INSIDE ON LAYOUT')
          // console.log('e', e)
          sendSourceLocation(e.nativeEvent.layout.y);
          flatListLayoutX = e.nativeEvent.layout.x;
        }}
      />

      {!hidden && (
        <Animated.View
          style={{
            top: animatedItemPoint.getLayout().top,
            left: animatedItemPoint.getLayout().left,
            position: 'absolute',
          }}
        >
          <RenderItem item={currentItem} index='hiddenItem' sourceStyle={sourceStyle} panHandlers={panResponder.panHandlers} />
          {/* {RenderItem(currentItem)} */}
        </Animated.View>
      )}
    </>
  );
};

export default SourceList