import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Grouper, SourceList, TargetList } from './components/Grouper';

const APP = () => {

  const [values, setValues] = useState([]);

  return (
    <SafeAreaView style={{ backgroundColor: 'black' }}>
      <View
        style={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Grouper values={values} setValues={setValues}>
          <TargetList
            style={styles.list}
            horizontal={true}
          ></TargetList>
          <View
            style={{
              height: '80%',
            }}>
            <Text style={{ marginTop: "50%", color: 'white', alignSelf: 'center' }}>Data: {values.join(', ')}</Text>
          </View>
          <SourceList
            style={styles.list}
            horizontal={true}
          >
            <Text value={'Lucas'} style={{ fontSize: 20, color: 'yellow' }}>Lucas</Text>
            <Image value={'Till'} style={{ width: 73, height: 73, borderRadius: 60 }} source={{ uri: 'https://ca.slack-edge.com/T0WU5R8NT-U015FNL1RQF-87fa8c57d5ca-512' }} />
            <Image value={'Andrew'} style={{ width: 73, height: 73, borderRadius: 60 }} source={{ uri: 'https://ca.slack-edge.com/T0WU5R8NT-UREPE1AR2-d3cad052b4a2-512' }} />
            <Image value={'Steven'} style={{ width: 73, height: 73, borderRadius: 60 }} source={{ uri: 'https://ca.slack-edge.com/T0WU5R8NT-U018DCLH4TG-ebb6b972770c-512' }} />
            <Image value={'Berta'} style={{ width: 73, height: 73, borderRadius: 60 }} source={{ uri: 'https://ca.slack-edge.com/T0WU5R8NT-UFCH43E4B-bf2eeac7c0fa-512' }} />
          </SourceList>
        </Grouper>
      </View>
    </SafeAreaView >
  );
};

let styles = StyleSheet.create({
  list: {
    // opacity: draggingIndex === index ? 0 : 1,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "maroon",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  }
})

export default APP;