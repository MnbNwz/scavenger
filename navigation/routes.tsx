import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Homepage from '../src/Components/Home/homepage';
import Items from '../src/Components/Items//Items';
import PDS_Data from '../src/Components/PDF-Data/PDS_Data';
import Screen3 from '../src/Components/Screen3/Screen3';
import Screen4 from '../src/Components/Screen4/Screen4';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ECECEC',
            borderBottomWidth: 0.7,
            borderBottomColor: '#000',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            textAlign: 'center',
          },
        }}
        initialRouteName="Sign in">
        <Stack.Screen name="Sign in" component={Homepage} />
        <Stack.Screen name="Items" component={Items} />
        <Stack.Screen name="PDF Data" component={PDS_Data} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="Screen4" component={Screen4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
