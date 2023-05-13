import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const CardComponent = props => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = option => {
    setSelectedOption(prevOption => (prevOption === option ? null : option));
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{props?.title}</Text>
        <Text style={styles.points}>{props?.points}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: props?.imageSource}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.optionsContainer}>
        {props?.options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton]}
            onPress={() => handleOptionSelect(option)}
            disabled={selectedOption && selectedOption !== option}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {console.log(props?.correct, props?.selected_option)}
      <Text style={styles.selectedOptionText}>
        Status:
        <Text style={styles.selectedOptionText}>
          Status:{' '}
          {props?.selected_option === undefined
            ? 'Pending'
            : props?.correct === props?.selected_option
            ? 'Correct'
            : 'Wrong'}
        </Text>
      </Text>
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
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledSubmitButton: {
    opacity: 0.6,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CardComponent;
