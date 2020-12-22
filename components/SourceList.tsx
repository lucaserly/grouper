import React, { useState, useRef } from 'react';
import { Animated, FlatList, PanResponder } from 'react-native';
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
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        sethidden(false);
        currentItemIndex = helperFuncs.xToIndex(gestureState.x0, scrollOffSet, flatListLayoutX,
          listItemWidth, sourceList.length);
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
        const itemToSend = sourceList[currentItemIndex];
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
            sendItems(itemToSend);
            sethidden(true);
            setTargetCounter(targetCounter + 1);
            setSourceCounter(sourceCounter - 1);
          });
        });

        if (currentItemIndex > -1) {
          sourceList.splice(currentItemIndex, 1);
        }
        setsourceList(sourceList);
        setdraggingIndex(-1);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    }),
  ).current;

  return (
    <>
      <FlatList
        data={sourceList}
        testID='sourcelist'
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} sourceStyle={sourceStyle}
            panHandlers={panResponder.panHandlers} panResponder={panResponder} />
        }}
        keyExtractor={(item, index) => index + ''}
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ position: 'absolute' }}
        scrollEventThrottle={16}
        onScroll={e => scrollOffSet = e.nativeEvent.contentOffset.x}
        onLayout={(e) => {
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
          <RenderItem item={currentItem} index='hiddenItem' sourceStyle={sourceStyle}
            panHandlers={panResponder.panHandlers} />
        </Animated.View>
      )}
    </>
  );
};

export default SourceList