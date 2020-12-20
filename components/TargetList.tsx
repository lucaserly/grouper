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

const TargetList = (props: any) => {
  // console.log('------> 1st TARGETLIST')
  const {
    horizontal,
    returnItems,
    sourceListLocation,
    listItemWidth,
    listItemHeight,
    targetStyle,
    targetData,
    sendTargetLocation,
    targetListLocation,
    targetCounter,
    setTargetCounter,
    sourceCounter,
    setSourceCounter
  } = props;


  const [targetList, setTargetList] = useState(targetData);

  useEffect(() => {
    if (targetData.length) {
      setTargetList(targetData);
    }
  }, [targetData])

  const [currentItem, setcurrentItem] = useState({});
  const [hidden, sethidden] = useState(true);

  let animatedItemPoint = useRef(new Animated.ValueXY()).current;
  let currentItemIndex = -1;
  let scrollOffSet = 0;
  let flatListLayoutX = 0;

  const panResponderTarget = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {

        sethidden(false);
        currentItemIndex = helperFuncs.xToIndex(gestureState.x0, scrollOffSet, flatListLayoutX, listItemWidth, targetList.length);

        setcurrentItem(targetList[currentItemIndex]);

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

        const itemToSendBack = targetList[currentItemIndex];

        Animated.decay(animatedItemPoint, {
          useNativeDriver: false,
          velocity: { x: gestureState.vx, y: gestureState.vy },
          deceleration: 0.996,
        }).start(() => {
          Animated.timing(animatedItemPoint, {
            toValue: {
              y: sourceListLocation, // why changed this?
              x: sourceCounter * listItemWidth,
            },
            duration: 500,
            useNativeDriver: false,
          }).start(() => {
            returnItems(itemToSendBack);
            sethidden(true);
            setTargetCounter(targetCounter - 1); // what's happening here?
            setSourceCounter(sourceCounter + 1);
          });
        });

        let newTargetList = targetList;
        if (currentItemIndex > -1) {
          newTargetList.splice(currentItemIndex, 1);
        }
        setTargetList(newTargetList);
        // setdraggingIndex(-1);
        animatedItemPoint.flattenOffset(); // what is this?
      },
      onShouldBlockNativeResponder: (evt, gestureState) => { // what is this?
        return true;
      },
    }),
  ).current;

  // const renderData = (item) => {
  //   return (
  //     <View
  //       {...panResponderTarget.panHandlers}
  //       style={targetStyle}>
  //       <RenderItem item={item} />
  //     </View>
  //   )
  // }
  return (
    // you render the component
    // inside the render getbytestId
    // check if that testID is present
    // pass in data in targetlist and check if it is rendered
    // check callback function in rnderitem
    // check hidden -> if happens ->
    // mock hidden

    // start from smallest component
    // check whether you can see it
    // then check functionalities
    //

    <View testID='targetlist'>
      <FlatList
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={targetData}
        renderItem={({ item, index }) => {
          // const panner = { ...panResponderTarget.panHandlers };
          // console.log('TARGET LIST FLAT LIST')
          // console.log('item', item)
          // return RenderItem(item, index, targetStyle, panner)
          // return renderData(item, index);
          return <RenderItem item={item} index={index} sourceStyle={targetStyle} panHandlers={panResponderTarget.panHandlers} />

        }}
        keyExtractor={(item, index) => index + ''}
        scrollEventThrottle={16}
        onLayout={(e) => {
          sendTargetLocation(e.nativeEvent.layout.y);
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
          {/* {RenderItem(currentItem)} */}
          <RenderItem item={currentItem} index='hiddenItem' sourceStyle={targetStyle} panHandlers={panResponderTarget.panHandlers} />
        </Animated.View>
      )}
    </View>
  );
};

export default TargetList