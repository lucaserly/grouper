import React, { useState, useEffect } from 'react';
import TargetList from './TargetList';
import SourceList from './SourceList';

const Grouper = (props) => {

  const incomingData = props.children[2].props.children.length ? props.children[2].props.children.map(el => el) : [props.children[2].props.children];

  const [targetListLocation, setTargetListLocation] = useState(0);
  const [sourceListLocation, setSourceListLocation] = useState(568);
  const [sourceData, setSourceData] = useState(incomingData)
  const [targetData, setTargetData] = useState([]);
  const [sourceCounter, setSourceCounter] = useState(props.children[2].props.children.length);
  const [targetCounter, setTargetCounter] = useState(0);

  useEffect(() => {
    if (targetData.length) {
      props.setValues(targetData.map(el => el.props.value))
    }
  }, [targetData, sourceData])

  const target = props.children[0]; //TargetList
  const middle = props.children[1]; //View behind the Lists
  const source = props.children[2]; //SourceList
  const targetStyle = props.children[0].props.style;
  const sourceStyle = props.children[2].props.style;
  const listItemWidth = sourceStyle.width;
  const listItemHeight = sourceStyle.height;

  const sendItems = (item) => {
    setTargetData((list: any) => [...list, item]);
  };

  const returnItems = (item) => {
    setSourceData((list: any) => [...list, item]);
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
          targetData, //all the items sent to the TargetList
          sendTargetLocation, //fn to set the y-Coordinate of the TargetList
          returnItems,  //fn to return item from Target to SourceList
          targetListLocation, //y-Coordinate of the TargetList
          targetStyle, //style set in the props of TargetList
          listItemWidth,  //read from the sourceStyle
          listItemHeight, //read from the sourceStyle
          sourceListLocation, //y-Coordinate of the SourceList
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
          sourceData,  //all the children of SourceList
          sendSourceLocation, //fn to set the y-Coordinate of the SourceList
          sendItems,  //fn to send item from Source to TargetList
          targetListLocation, //y-Coordinate of the TargetList
          sourceStyle, //style set in the props of SourceList
          listItemWidth,  //read from the sourceStyle
          listItemHeight, //read from the sourceStyle
          sourceListLocation, //y-Coordinate of the SourceList
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