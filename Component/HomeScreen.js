import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableHighlight, View } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";

import { useState, useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import PostScreen from "./PostScreen";
import AccountScreen from "./AccountScreen";
import NotifyScreen from "./NotifyScreen";
import SettingScreen from "./SettingScreen";

import ForgetPassScreen from "./ForgetPassScreen";
const Tab = createBottomTabNavigator();
const HomeScreen = (props) => {

    return (
        <View style={st.container}>
            <View style={st.topHome} >
                <Text style={st.txtLogo}>MUNNECT</Text>

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

const st = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,

        backgroundColor: 'white',

    },
    topHome: {
        margin: 20,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtLogo: {
        color: '#00ff80',
        fontSize: 35,
        fontFamily: 'Aclonica',
        width: 200,

    }
})