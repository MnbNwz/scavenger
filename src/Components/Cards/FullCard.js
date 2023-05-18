import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader';
import ImageCard from './ImageCard';

const SingleCardComponent = props => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleOptionSelect = option => {
    setSelectedOption(prevOption => (prevOption === option ? null : option));
  };
  const url =
    'https://nonchalant-foregoing-guarantee.glitch.me/submit-card-option';
  const handleSubmit = async () => {
    setLoader(true);
    const payload = {
      id: props?.userID,
      card_id: props?.id,
      selected: selectedOption,
    };

    if (selectedOption) {
      try {
        const response = await axios.post(url, payload);
        if (response?.data.success === true) {
          props?.back();
        }
      } catch (err) {
        console.log(err);
      }
    }
    setLoader(false);
  };

  const {id, image, points, correct, options, card_title} = props;
  console.log(selectedOption);

  return (
    <View key={id} style={styles.card}>
      <ProgressLoader
        visible={loader}
        isModal={true}
        isHUD={true}
        hudColor={'#000000'}
        color={'#FFFFFF'}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Question: </Text>

        <Text style={styles.points}>
          <Text style={{fontWeight: 'bold'}}>Points:</Text>{' '}
          <Text style={{fontWeight: points === 0 ? 'normal' : 'bold'}}>
            {points}
          </Text>
        </Text>
      </View>
      <Text style={[styles.title, {marginTop: '-2%'}]}>{card_title}</Text>

      <View style={styles.imageContainer}>
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.optionsContainer}>
        {options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton,
            ]}
            onPress={() => handleOptionSelect(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.selectedOptionText}>
        {selectedOption
          ? `Selected Option: ${selectedOption}`
          : 'No option selected'}
      </Text>
      <TouchableOpacity
        style={[
          styles.submitButton,
          selectedOption ? null : styles.disabledSubmitButton,
        ]}
        onPress={handleSubmit}
        disabled={!selectedOption}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 4,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  points: {
    fontSize: 20,
    color: '#333333',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    width: '31.2%',
  },
  selectedOptionButton: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedOptionText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledSubmitButton: {
    backgroundColor: '#CCCCCC',
  },
  submitText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SingleCardComponent;
