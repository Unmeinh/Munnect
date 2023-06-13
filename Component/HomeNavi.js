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
// import DetailPostScreen from './Posts/DetailPostScreen';
import ItemPost from "../Component/Posts/ItemPost";
import ViewAccount from '../Component/Account/ViewAccount';
import PreviewAccount from '../Component/Account/PreviewAccount';
import ListAccount from './Account/ListAccount';
import ListAccount from "./Account/ListAccount";
import UpdateAccountScreen from "./Account/UpdateAccountScreen";
import UpdateItemScreen from "./Account/UpdateItemScreen";
import SearchScreen from "./Setting/SearchScreen";

const StackNav = createNativeStackNavigator();

const HomeNavi = ({ navigation }) => {

    return (
        <NavigationContainer>
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
                <StackNav.Screen name='ItemPost' component={ItemPost} options={{ headerShown: false }} />

                <StackNav.Screen name='ViewAccount' component={ViewAccount}
                options={{ headerShown: false }} />
                <StackNav.Screen name='PreviewAccount' component={PreviewAccount}
                    options={({ route }) =>
                    ({
                        title: route.params.title,
                        headerStyle: {},
                        headerTitleStyle: {
                            fontWeight: '400',
                            fontSize: 27
                        },
                        headerRight: () => (
                            <TouchableOpacity >
                                <Text style={{ fontSize: 21, color: '#148A4F' }}>Lưu</Text>
                            </TouchableOpacity>
                        ),
                    })} />
                <StackNav.Screen name='ListAccount' component={ListAccount}
                    options={({ route }) =>
                    ({
                        title: route.params.title,
                        headerStyle: {},
                        headerTitleStyle: {
                            fontWeight: '400',
                            fontSize: 27
                        },
                    })} />
                <StackNav.Screen name="UpdateAccountScreen" component={UpdateAccountScreen} />
                <StackNav.Screen name='UpdateItemScreen' component={UpdateItemScreen} />
                <StackNav.Screen name='SearchScreen' component={SearchScreen}
                options={{ headerShown: false }} />
            </StackNav.Navigator>
        </NavigationContainer>

    )
}

export default HomeNavi;