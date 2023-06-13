import {
    Text, TouchableOpacity
} from "react-native"
import React, { useState, useCallback } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./HomeScreen";
import NewPost from './Posts/NewPost';
import DetailItemPost from "./Posts/DetailItemPost";
import ViewAccount from "./Account/ViewAccount";
import PreviewAccount from './Account/PreviewAccount';
import ListAccount from "./Account/ListAccount";
import SearchScreen from "./Setting/SearchScreen";
import UpdateAccountScreen from "./Setting/UpdateAccountScreen";
import UpdateItemScreen from "./Setting/UpdateItemScreen";


const StackNav = createNativeStackNavigator();

const HomeNavi = ({ navigation }) => {

    return (
        <StackNav.Navigator>
            <StackNav.Screen name='HomeScreen' component={HomeScreen}
                options={{ headerShown: false }} />
            <StackNav.Screen name='NewPost' component={NewPost}
                options={{
                    title: 'Bài viết mới',
                    headerStyle: {},
                    headerTitleStyle: {
                        fontWeight: '400',
                        fontSize: 27
                    },
                }} />
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
            <StackNav.Screen name='SearchScreen' component={SearchScreen}
                options={{ headerShown: false }} />
            <StackNav.Screen name="UpdateAccountScreen" component={UpdateAccountScreen} options={
                (props) =>
                ({
        
                    title: 'Cập nhật thông tin tài khoản',
                    headerTitleStyle: {
                        fontSize: 26
                    }
                })
            } />
            <StackNav.Screen name='UpdateItemScreen' component={UpdateItemScreen} options={
                (props) =>
                ({
                    
                    title: 'Cập nhật '+props.route.params.title+' tài khoản',
                    headerTitleStyle: {
                        fontSize: 26
                    }
                })
            }/>
            <StackNav.Screen name='DetailItemPost' component={DetailItemPost}
                options={{
                    headerShown:false
                }} />
        </StackNav.Navigator>
    )
}

export default HomeNavi;