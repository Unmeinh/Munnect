import {
    Text, View, Button
} from "react-native"
import React, { useState, useCallback } from "react";
import styles from '../Styles/AccScreen.styles';

const AccountScreen = ({ navigation }) => {
    return (
        <View style={{ marginTop: 60 }}>
            <Text>
                Màn tài khoản
            </Text>
            <Button title='bài mới' onPress={() => { navigation.navigate('NewPost'); }}></Button>
            <Button title='home' onPress={() => { navigation.navigate('PostScreen'); }}></Button>
        </View>
    )
}

export default AccountScreen;