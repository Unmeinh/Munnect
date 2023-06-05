import {
    Image, View,
    Text, TouchableOpacity,
    ScrollView, Dimensions, StatusBar
} from "react-native";
import React, { useState, useRef } from "react";
import styles from '../Styles/HomeScreen.styles';

import PostScreen from "./Posts/PostScreen";
import AccountScreen from "./AccountScreen";
import NotifyScreen from "./NotifyScreen";
import SettingScreen from "./Setting/SettingScreen";
import DynamicHeader from "./DynamicHeader";
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';

const HomeScreen = ({ navigation }) => {
    const [tabNum, settabNum] = useState(0);

    function callBackSetTab(num) {
        settabNum(num);
    }

    var arr_Screen = [
        <PostScreen nav={navigation} tabNum={tabNum} settabNum={callBackSetTab}/>,
        <AccountScreen />,
        <NotifyScreen />,
        <SettingScreen />]

    return (
        <View style={styles.container}>
            <CollapsibleHeaderScrollView
                CollapsibleHeaderComponent={<DynamicHeader settabNum={callBackSetTab} tabNum={tabNum} />}
                headerHeight={135}
                statusBarHeight={Platform.OS === 'ios' ? 20 : 0}>

                <View style={styles.viewTab}>
                    {
                        arr_Screen[tabNum]
                    }
                </View>

            </CollapsibleHeaderScrollView>
        </View>
    )
}

export default HomeScreen;