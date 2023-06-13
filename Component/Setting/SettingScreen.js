import {
    Text, View
} from "react-native"
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Setting/SettingScreen.styles';

const SettingScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
            <Text>
                Màn cài đặt
            </Text>
        </View>
    )
}

export default SettingScreen;