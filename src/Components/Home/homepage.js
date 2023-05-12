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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {showMessage} from 'react-native-flash-message';

const LoginScreen = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uniqueID] = useState(uuid.v4());

  useEffect(() => {
    removeAllItems();
  }, []);

  LoginScreen.navigationOptions = {
    header: props => <View title="My Screen Title" {...props} />,
  };
  const removeAllItems = async () => {
    try {
      // nameee = await AsyncStorage.getItem('name');
      // emailll = await AsyncStorage.getItem('email');

      await AsyncStorage.clear();
    } catch (error) {
      return null;
    }
  };
  const handleLogin = async () => {
    // showMessage({
    //   message: 'Hello World',
    //   description: 'This is our second message',
    //   type: 'success',
    //   position: 'top',
    // });
    if (name === '' || email === '') {
    } else {
      try {
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('UniqueId', uniqueID);
        console.log('Values stored successfully!');
      } catch (error) {
        console.log('Error storing values:', error);
      }
      props?.navigation.navigate('Items', {
        uniqueID,
        name,
        email,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>scavenger_Hunt Login</Text>
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
        <Button title="Login" onPress={handleLogin} />
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
