import {
    Dimensions, Image,
    StatusBar, StyleSheet,
    Text, TouchableHighlight, View
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../Styles/HomeScreen.styles';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";

import PostScreen from "./Posts/PostScreen";
import AccountScreen from "./AccountScreen";
import NotifyScreen from "./NotifyScreen";
import SettingScreen from "./Setting/SettingScreen";
import NewPost from "./Posts/NewPost";

const Tab = createBottomTabNavigator();
const HomeScreen = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.topHome} >
                <Text style={styles.txtLogo}>MUNNECT</Text>

                <TouchableHighlight underlayColor={'#b0ebc1'} onPress={() => { }} activeOpacity={0.5}>
                    <Image source={require('../assets/images/iconSearch.png')} />
                </TouchableHighlight>


            </View>
            <View
                style={{
                    width: Dimensions.get('window').width,
                    height: 5,
                    backgroundColor: '#fff',
                }}
            />
            <NavigationContainer independent={true}>
                <Tab.Navigator initialRouteName='PostScreen' screenOptions={{
                    tabBarActiveTintColor: '#00ff80',
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: 'white',
                        top: 0,
                        height: 60,
                        shadowColor: 'transparent',
                        borderWidth: 1,
                        borderBottomColor: '#D9D9D9',
                        borderTopColor: '#ffff',
                    },

                }}>
                    <Tab.Screen name="PostScreen" component={PostScreen} options={{
                        tabBarLabel: 'Trang Chủ',

                        tabBarLabelStyle: { fontSize: 15 },
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#00ff80' : '',
                                }}
                                source={require('../assets/images/home.png')}
                            />
                        ),
                    }} />

                    <Tab.Screen name="AccountScreen" component={AccountScreen} options={{
                        tabBarLabel: 'Tài khoản',

                        tabBarLabelStyle: { fontSize: 15 },
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#00ff80' : '',
                                }}
                                source={require('../assets/images/account.png')}
                            />
                        ),
                    }} />

                    <Tab.Screen name="NotifyScreen" component={NotifyScreen} options={{
                        tabBarLabel: 'Thông báo',

                        tabBarLabelStyle: { fontSize: 15 },
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#00ff80' : '',
                                }}
                                source={require('../assets/images/notify.png')}
                            />
                        ),
                    }} />
                    <Tab.Screen name="SettingScreen" component={SettingScreen} options={{
                        tabBarLabel: 'Cài đặt',

                        tabBarLabelStyle: { fontSize: 15 },
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? '#00ff80' : '',
                                }}
                                source={require('../assets/images/align.png')}
                            />
                        ),
                    }} />
                </Tab.Navigator>
            </NavigationContainer>

        </View>

    )

}

export default HomeScreen;