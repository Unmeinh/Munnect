import React, { useState, useCallback } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashMunnectScreen from './Component/SplashMunnectScreen';
import LoginScreen from './Component/Login/LoginScreen';
import RegistScreen from './Component/Login/RegistScreen';
import HomeScreen from './Component/HomeScreen';
import ForgetPassScreen from './Component/Login/ForgetPassScreen';
import NewPost from './Component/Posts/NewPost';
import ItemPost from "./Component/Posts/ItemPost";
import DetailItemPost from "./Component/Posts/DetailItemPost";
// import AccountScreen from "./Component/Account/AccountScreen";
import MyAccount from './Component/Account/MyAccount';
import ViewAccount from "./Component/Account/ViewAccount";
import ListAccount from './Component/Account/ListAccount';
import UpdateAccountScreen from "./Component/Account/UpdateAccountScreen";
import UpdateItemScreen from "./Component/Account/UpdateItemScreen";

const StackNav = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='SplashScreen'>
        <StackNav.Screen name='SplashMunnectScreen' component={SplashMunnectScreen} options={{headerShown:false}}/>
        <StackNav.Screen name='LoginScreen' component={LoginScreen}  options={{headerShown:false}}/>
        <StackNav.Screen name='RegistScreen' component={RegistScreen}  options={{headerShown:false}}/>
        <StackNav.Screen name='HomeScreen' component={HomeScreen}  options={{headerShown:false}}/>
        <StackNav.Screen name='ForgetPassScreen' component={ForgetPassScreen} options={{headerShown:false}} />
        <StackNav.Screen name='NewPost' component={NewPost} options={{
          
          title: 'Thêm bài viết mới'
        }} />
        <StackNav.Screen name='ItemPost' component={ItemPost}  options={{headerShown:false}}/>
        <StackNav.Screen name='DetailItemPost' component={DetailItemPost}  options={{headerShown:false}}/>
        {/* <StackNav.Screen name='AccountScreen' component={AccountScreen}  options={{headerShown:false}}/> */}
        <StackNav.Screen name='MyAccount' component={MyAccount}  options={{headerShown:false}}/>
        <StackNav.Screen name='ViewAccount' component={ViewAccount}  options={{headerShown:false}}/>
        <StackNav.Screen name='UpdateAccountScreen' component={UpdateAccountScreen} options={{
         
          title: 'Thay đổi thông tin hồ sơ',
          headerTitleStyle: {
            fontSize: 26
          }
        }} />
        <StackNav.Screen name='UpdateItemScreen' component={UpdateItemScreen} options={ 
          (props) => 
            ({
             
              title: 'Cập nhật '+ props.route.params.title +' tài khoản',
              headerTitleStyle: {
                fontSize: 26
              }
            })
        } />
        
        <StackNav.Screen name='ListAccount' component={ListAccount} options={ 
          (props) => 
            ({
             
              title:props.route.params.title,
              headerTitleStyle: {
                fontSize: 26
              }
            })
        } />

      </StackNav.Navigator>
    </NavigationContainer>
  )
}
export default App;
