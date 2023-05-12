import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './navigation/routes';
import {View, Text} from 'react-native';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Routes navigation={undefined} route={undefined} />
    </NavigationContainer>
  );
}

export default App;
