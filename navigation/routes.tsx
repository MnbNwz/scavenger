import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Homepage from '../src/Home/homepage';
import Items from '../src/Items/Items';
import PDS_Data from '../src/PDF-Data/PDS_Data';
import Screen3 from '../src/Screen3/Screen3';
import Screen4 from '../src/Screen4/Screen4';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Sign in">
        <Stack.Screen name="Sign in" component={Homepage} />
        <Stack.Screen name="Items" component={Items} />
        <Stack.Screen name="PDF Data  " component={PDS_Data} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="Screen4" component={Screen4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
