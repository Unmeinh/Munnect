import {
    Image, ScrollView,
    Text, Button,
    TouchableHighlight, View
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Posts/PostScreen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewPost from "./NewPost";

const PostScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>

                        <TouchableHighlight underlayColor={'#b0ebc1'} onPress={() => { }} activeOpacity={0.5}>
                            <Image source={require('../../assets/images/home.png')} />
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'#b0ebc1'} onPress={() => { navigation.navigate('NewPost'); }} activeOpacity={0.5}>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>Bạn muốn nói gì?</Text>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight underlayColor={'#b0ebc1'} onPress={() => { }} activeOpacity={0.5}>
                        <Image source={require('../../assets/images/addImage.png')} />
                    </TouchableHighlight>
                </View>
                <Button title='acc' onPress={() => { navigation.navigate('AccountScreen'); }}></Button>

                <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />
            </ScrollView>
        </View>

    )
}

export default PostScreen;
