import React, { useState, useRef, useEffect } from 'react';
import { Animated, FlatList, PanResponder, View } from 'react-native';
import RenderItem from './RenderItem';
import helperFuncs from './../utils/helperFunctions'

const TargetList = (props: any) => {
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
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        sethidden(false);
        currentItemIndex = helperFuncs.xToIndex(gestureState.x0, scrollOffSet, flatListLayoutX,
          listItemWidth, targetList.length);
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
              y: sourceListLocation,
              x: sourceCounter * listItemWidth,
            },
            duration: 500,
            useNativeDriver: false,
          }).start(() => {
            returnItems(itemToSendBack);
            sethidden(true);
            setTargetCounter(targetCounter - 1);
            setSourceCounter(sourceCounter + 1);
          });
        });

        if (currentItemIndex > -1) {
          targetList.splice(currentItemIndex, 1);
        }
        setTargetList(targetList);
        animatedItemPoint.flattenOffset();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    }),
  ).current;

  return (
    <View testID='targetlist'>
      <FlatList
        horizontal={horizontal}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={targetData}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} sourceStyle={targetStyle}
            panHandlers={panResponderTarget.panHandlers} />

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
          <RenderItem item={currentItem} index='hiddenItem'
            sourceStyle={targetStyle} panHandlers={panResponderTarget.panHandlers} />
        </Animated.View>
      )}
    </View>
  );
};

export default TargetList