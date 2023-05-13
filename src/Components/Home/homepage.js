import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ProgressLoader from 'rn-progress-loader';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const LoginScreen = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  useFocusEffect(
    useCallback(() => {
      removeAllItems();
      setName('');
      setEmail('');

      return () => {};
    }, []),
  );

  const removeAllItems = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      return null;
    }
  };
  const url = 'https://nonchalant-foregoing-guarantee.glitch.me/create-player';

  const handleLogin = async () => {
    if (name === '' || email === '') {
    } else {
      setLoader(true);
      const payload = {
        name,
        email,
      };

      try {
        const response = await axios.post(url, payload);
        if (response?.data?.success === true) {
          await AsyncStorage.setItem('name', name);
          await AsyncStorage.setItem('email', email);
          props?.navigation?.navigate('Items', {
            name,
            email,
            id: response?.data?.data?.id,
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    setLoader(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{height: Dimensions.get('window').height}}>
        <SafeAreaView style={styles.container}>
          <ProgressLoader
            visible={loader}
            isModal={true}
            isHUD={true}
            hudColor={'#000000'}
            color={'#FFFFFF'}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>scavenger_Hunt</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={text => {
                setName(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
            <Button
              title="Enter Details"
              onPress={() => {
                handleLogin();
              }}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    marginTop: -5 * StatusBar.currentHeight,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Dimensions.get('window').width * 0.1,
  },
  title: {
    fontSize: Dimensions.get('window').width * 0.06,
    marginBottom: Dimensions.get('window').height * 0.04,
    color: '#333333',
  },
  input: {
    width: '100%',
    height: Dimensions.get('window').height * 0.05,
    marginBottom: Dimensions.get('window').height * 0.02,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
});

export default LoginScreen;
