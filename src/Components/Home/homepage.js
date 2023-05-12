import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
// import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';

const LoginScreen = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    removeAllItems();
    setName('');
    setEmail('');
  }, []);

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
      const payload = {
        name,
        email,
      };

      try {
        const response = await axios.post(url, payload);
        console.log('Response:', response);
        debugger;
        if (response?.data?.success === true) {
          debugger;
          await AsyncStorage.setItem('name', name);
          await AsyncStorage.setItem('email', email);
          // props?.navigation?.navigate('Items', {
          //   name,
          //   email,
          //   id: response?.data?.data?.id,
          // });
        }
        setLoader(false);
      } catch (error) {
        console.error('Error:', error);
        setLoader(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
            setLoader(true);
            handleLogin();
          }}
        />
        {/* <AnimatedLoader
          visible={loader}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={{width: 100, height: 100}}
          speed={1}>
          <Text>Doing something...</Text>
        </AnimatedLoader> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    marginTop: -2.5 * StatusBar.currentHeight,
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
