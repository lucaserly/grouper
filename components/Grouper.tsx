import React, { useState, useEffect } from 'react';
import TargetList from './TargetList';
import SourceList from './SourceList';

const Grouper = (props: any) => {

  const incomingData = props.children[2].props.children.length ? props.children[2].props.children.map((el: any) => el) : [props.children[2].props.children];
  const [targetListLocation, setTargetListLocation] = useState(0);
  const [sourceListLocation, setSourceListLocation] = useState(568);
  const [sourceData, setSourceData] = useState(incomingData)
  const [targetData, setTargetData] = useState([]);
  const [sourceCounter, setSourceCounter] = useState(props.children[2].props.children.length);
  const [targetCounter, setTargetCounter] = useState(0);

  useEffect(() => {
    if (targetData.length) {
      props.setValues(targetData.map((el: any) => el.props.value))
    }
  }, [targetData, sourceData])

  const target = props.children[0];
  const middle = props.children[1];
  const source = props.children[2];
  const targetStyle = props.children[0].props.style;
  const sourceStyle = props.children[2].props.style;
  const listItemWidth = sourceStyle.width;
  const listItemHeight = sourceStyle.height;

  const sendItems = (item: never) => {
    setTargetData((list: never[]) => [...list, item]);
  };

  const returnItems = (item: any) => {
    setSourceData((list: any[]) => [...list, item]);
  };

  const sendTargetLocation = (y) => {
    setTargetListLocation(y);
  };

  const sendSourceLocation = (y) => {
    setSourceListLocation(y);
  };

  return (
    <>
      {[
        React.cloneElement(target, {
          key: Math.random().toString(),
          targetData,
          sendTargetLocation,
          returnItems,
          targetListLocation,
          targetStyle,
          listItemWidth,
          listItemHeight,
          sourceListLocation,
          targetCounter,
          setTargetCounter,
          sourceCounter,
          setSourceCounter
        }),

        React.cloneElement(middle,
          { key: Math.random().toString() }
        ),
        React.cloneElement(source, {
          key: Math.random().toString(),
          sourceData,
          sendSourceLocation,
          sendItems,
          targetListLocation,
          sourceStyle,
          listItemWidth,
          listItemHeight,
          sourceListLocation,
          targetCounter,
          setTargetCounter,
          sourceCounter,
          setSourceCounter
        }),
      ]}
    </>
  )
};

export { SourceList, TargetList, Grouper };