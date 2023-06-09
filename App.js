import React, { useState, useCallback } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashMunnectScreen from './Component/SplashMunnectScreen';
import LoginScreen from './Component/Login/LoginScreen';
import RegistScreen from './Component/Login/RegistScreen';
import HomeScreen from './Component/HomeScreen';
import ForgetPassScreen from './Component/Login/ForgetPassScreen';
import NewPost from './Component/Posts/NewPost';
import DetailPostScreen from './Component/Posts/DetailPostScreen';
import AccountScreen from "./Component/AccountScreen";

const StackNav = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
        <StackNav.Screen name='SplashMunnectScreen' component={SplashMunnectScreen} />
        <StackNav.Screen name='LoginScreen' component={LoginScreen} />
        <StackNav.Screen name='RegistScreen' component={RegistScreen} />
        <StackNav.Screen name='HomeScreen' component={HomeScreen} />
        <StackNav.Screen name='ForgetPassScreen' component={ForgetPassScreen} />
        <StackNav.Screen name='NewPost' component={NewPost} options={{
          headerShown: true,
          title: 'Thêm bài viết mới'
        }} />
         <StackNav.Screen name='DetailPostScreen' component={DetailPostScreen}/>
         <StackNav.Screen name='AccountScreen' component={AccountScreen}/>
      </StackNav.Navigator>
    </NavigationContainer>
  )
}
export default App;
