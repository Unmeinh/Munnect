
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Component/SplashScreen';
import LoginScreen from './Component/LoginScreen';
import RegistScreen from './Component/RegistScreen';
import HomeScreen from './Component/HomeScreen';
import ForgetPassScreen from './Component/ForgetPassScreen';

const StackNav = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
        <StackNav.Screen name='SplashScreen' component={SplashScreen} />
        <StackNav.Screen name='LoginScreen' component={LoginScreen} />
        <StackNav.Screen name='RegistScreen' component={RegistScreen} />
        <StackNav.Screen name='HomeScreen' component={HomeScreen} />
        <StackNav.Screen name='ForgetPassScreen' component={ForgetPassScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  )
}
export default App;
