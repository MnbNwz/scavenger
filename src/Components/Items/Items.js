import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollContainer: {
    borderColor: 'gray',
    borderRightWidth: 1,
    width: '40%',
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: Dimensions.get('window').width > 320 ? 16 : 14,
    fontWeight: 'bold',
    color: 'black',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cameraContainer: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Items = ({navigation}) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {[...Array(20).keys()].map(index => (
          <Text key={index} style={styles.item}>
            Item {index + 1}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.iconContainer}></View>

      <View style={[styles.cameraContainer, {}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PDF Data');
          }}
          style={{
            marginTop: -2.5 * StatusBar.currentHeight,
          }}>
          <Image
            style={{
              height: 150,
              width: 150,
            }}
            source={require('/Users/muneeb/Desktop/Data/scavenger_Hunt/Assets/qrCode.png')}
          />
          <Text
            style={{
              alignSelf: 'center',
              paddingVertical: '2%',
              fontSize: 17,
            }}>
            Click to scan PDF
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Items;
