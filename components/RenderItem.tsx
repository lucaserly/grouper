import React from 'react';
import { Text, Image, View } from 'react-native';

const RenderItem = (props: any) => {
  const { item, index, sourceStyle, panHandlers, panResponder } = props;
  let renderThisItem;
  if (item && item.type) {
    if (item.type.displayName == 'Image') renderThisItem = <Image style={item.props.style} source={item.props.source} />
    if (item.type.displayName == 'Text') renderThisItem = <Text style={item.props.style}>{item.props.children}</Text>;
  }
  return (
    <View testID='renderitem' style={sourceStyle}  {...panHandlers} panResponder={panResponder} onPress={panHandlers}>
      {renderThisItem}
    </View>
  )
}

export default RenderItem;

