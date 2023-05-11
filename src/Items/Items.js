import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollContainer: {
    width: '40%',
    borderRightWidth: 1,
    borderColor: 'gray',
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
    backgroundColor: 'lightgray',
  },
  icon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cameraContainer: {
    // flex: 1,
    width: '60%',
  },
});

const Items = () => {
  const [showCamera, setShowCamera] = React.useState(false);

  const handleIconPress = () => {
    setShowCamera(!showCamera);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {[...Array(20).keys()].map(index => (
          <Text key={index} style={styles.item}>
            Item {index + 1}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleIconPress}>
          <Text style={styles.icon}>Camera Icon</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        {/* <RNCamera style={{flex: 1}} type={RNCamera.Constants.Type.back} /> */}
        {/* <Icon name="camera" size={30} color="black" /> */}
      </View>
    </View>
  );
};

export default Items;
