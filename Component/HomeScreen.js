import { View } from 'react-native';

import styles from '../Styles/HomeScreen.styles'
import React, { useState, useRef } from "react";

import PostScreen from "./Posts/PostScreen";
import AccountScreen from "./AccountScreen";
import NotifyScreen from "./NotifyScreen";
import SettingScreen from "./Setting/SettingScreen";
import DynamicHeader from './DynamicHeader';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';


const HomeScreen = (props) => {
    const [tabNum, settabNum] = useState(0);

    function callBackSetTab(num) {
        settabNum(num);
    }

    var arr_Screen = [
        <PostScreen nav={props.navigation} tabNum={tabNum} settabNum={callBackSetTab} />,
        <AccountScreen />,
        <NotifyScreen />,
        <SettingScreen nav={props.navigation} tabNum={tabNum} settabNum={callBackSetTab} />]

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

