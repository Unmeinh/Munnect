import React, { useState, useCallback } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashMunnectScreen from './Component/SplashMunnectScreen';
import LoginScreen from './Component/LoginScreen';
import RegistScreen from './Component/RegistScreen';
import HomeScreen from './Component/HomeScreen';
import ForgetPassScreen from './Component/ForgetPassScreen';
import { useFonts } from 'expo-font';

const StackNav = createNativeStackNavigator();

const App = () => {

  const [fontsLoaded] = useFonts({
    'Aclonica': require('./assets/fonts/Aclonica.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      <StackNav.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
        <StackNav.Screen name='SplashMunnectScreen' component={SplashMunnectScreen} />
        <StackNav.Screen name='LoginScreen' component={LoginScreen} />
        <StackNav.Screen name='RegistScreen' component={RegistScreen} />
        <StackNav.Screen name='HomeScreen' component={HomeScreen} />
        <StackNav.Screen name='ForgetPassScreen' component={ForgetPassScreen} />
      </StackNav.Navigator>
    </NavigationContainer>
  )
}
export default App;
