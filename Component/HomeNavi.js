import {
    Image, ScrollView,
    Text, Button,
    TouchableHighlight, View
} from "react-native";
import React, { useState, useCallback } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./HomeScreen";
import NewPost from "./NewPost";

const StackNav = createNativeStackNavigator();

const HomeNavi = ({ navigation }) => {

    return (
        <StackNav.Navigator>
            <StackNav.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
            <StackNav.Screen name='NewPost' component={NewPost} options={{
                title: 'Bài viết mới',
                headerStyle: {},
                headerTitleStyle: {
                    fontWeight: '400',
                    fontSize: 30
                },
            }} />
        </StackNav.Navigator>
    )
}

export default HomeNavi;