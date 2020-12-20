const helperFuncs = {
  
  xToIndex: (...args: any) => {
    const x = args[0];
    const scrollOffSet = args[1];
    const flatListLayoutX = args[2];
    const listItemWidth = args[3];
    const arrLen = args[4];

    console.log('arrLen', arrLen)
    // const [ x, scrollOffSet, flatListLayoutX, listItemWidth, arrLen ] = args

    if (listItemWidth === 0) throw new Error('Denominator cannot be 0');
    if (typeof x === "string" || typeof scrollOffSet === "string"
      || typeof flatListLayoutX === "string" || typeof listItemWidth === "string"
    ) throw new Error('Args cannot be strings')
    const res = Math.floor((scrollOffSet + x - flatListLayoutX) / listItemWidth);
    console.log('scrollOffSet', scrollOffSet)
    console.log('x', x)
    console.log('flatListLayoutX', flatListLayoutX)
    console.log('listItemWidth', listItemWidth)
    console.log('res', res)
    if (res > arrLen || res < 0) throw new Error('Result cannot be out of array length range')
    return res;
  },

  // onPanResponderRelease: (...args: any) => {
  //   const gestureState = args[0];
  //   const sourceList = args[1];
  //   const currentItemIndex = args[2];
  //   const Animated = args[3];
  //   const animatedItemPoint = args[4];
  //   const targetListLocation = args[5];
  //   const targetCounter = args[6];
  //   const listItemWidth = args[7];

  //   const sendItems = args[8];
  //   const sethidden = args[9];
  //   const setTargetCounter = args[10];
  //   const setSourceCounter = args[11];
  //   const sourceCounter = args[12];
  //   const setsourceList = args[13];
  //   const setdraggingIndex = args[14];


  //   const itemToSend = sourceList[currentItemIndex];

  //   Animated.decay(animatedItemPoint, {
  //     useNativeDriver: false,
  //     velocity: { x: gestureState.vx, y: gestureState.vy },
  //     deceleration: 0.996,
  //   }).start(() => {
  //     Animated.timing(animatedItemPoint, {
  //       toValue: {
  //         y: targetListLocation,
  //         x: targetCounter * listItemWidth,
  //       },
  //       duration: 500,
  //       useNativeDriver: false,
  //     }).start(() => {
  //       sendItems(itemToSend); // one of these 4 caues memory leak
  //       sethidden(true);
  //       setTargetCounter(targetCounter + 1);
  //       setSourceCounter(sourceCounter - 1);
  //     });
  //   });

  //   let newSourceList = sourceList;
  //   if (currentItemIndex > -1) {
  //     newSourceList.splice(currentItemIndex, 1);
  //   }
  //   setsourceList(newSourceList);
  //   setdraggingIndex(-1);
  // },
}

export default helperFuncs;

// export default xToIndex;