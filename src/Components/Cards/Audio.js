import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
// import { Feather } from '@expo/vector-icons';

const AudioBar = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.resumeButton}>
        <Image
          source={require('../../../Assets/icons8-play-100.png')}
          style={{height: 27, width: 27}}
          color="#000"
        />
      </View>
      <TouchableOpacity style={styles.line} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '-2%',
    marginBottom: '15%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    width: '97%',
  },
  resumeButton: {
    marginRight: 10,
  },
  line: {
    // width: '85%',
    flex: 1,
    height: 2,
    backgroundColor: '#000',
    marginLeft: '-3%',
  },
});

export default AudioBar;
