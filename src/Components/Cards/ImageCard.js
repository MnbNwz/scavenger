import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import AudioBar from './Audio';

const ImageCard = props => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionSelect = option => {
    setSelectedOption(prevOption => (prevOption === option ? null : option));
  };

  const renderImageRows = () => {
    const {images} = props;
    const rows = [];

    for (let i = 0; i < images.length; i += 2) {
      const row = (
        <View style={styles.imageRow} key={i}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption === i + 1 && styles.selectedOptionButton,
            ]}
            onPress={() => handleOptionSelect(i + 1)}>
            <Image
              source={{uri: images[i]}}
              style={styles.image}
              resizeMode="cover"
            />

            {selectedOption === i + 1 && <View style={styles.selectedButton} />}
          </TouchableOpacity>

          {i + 1 < images.length && (
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === i + 2 && styles.selectedOptionButton,
              ]}
              onPress={() => handleOptionSelect(i + 2)}>
              <Image
                source={{uri: images[i + 1]}}
                style={styles.image}
                resizeMode="cover"
              />

              {selectedOption === i + 2 && (
                <View style={styles.selectedButton} />
              )}
            </TouchableOpacity>
          )}
        </View>
      );

      rows.push(row);
    }

    return rows;
  };
  console.log(props);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props?.imageCard?.title}</Text>

      <View style={styles.imageContainer}>{renderImageRows()}</View>
      <AudioBar />
      <TouchableOpacity
        style={[
          styles.submitButton,
          selectedOption ? null : styles.disabledSubmitButton,
        ]}
        onPress={() => {
          props?.back();
        }}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 20,
    marginHorizontal: 20,
    elevation: 4,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    width: Dimensions.get('window').width,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 7,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionButton: {
    flex: 1,
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedOptionButton: {
    borderWidth: 2,
    borderColor: 'blue',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  selectedButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  audioField: {
    height: 40,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default ImageCard;
