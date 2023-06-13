import { RefreshControl, View } from 'react-native';

import styles from '../Styles/HomeScreen.styles'
import React, { useState, useRef } from "react";

import PostScreen from "./Posts/PostScreen";
// import AccountScreen from "./Account/AccountScreen";
import MyAccount from './Account/MyAccount';
import NotifyScreen from "./NotifyScreen";
import SettingScreen from "./Setting/SettingScreen";
import DynamicHeader from './DynamicHeader';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';


const HomeScreen = ({navigation}) => {
    const [tabNum, settabNum] = useState(0);
    const [isReloading, setisReloading] = useState(false);
    const [isSelecting, setisSelecting] = useState(true);
    const [infoLogin, setinfoLogin] = useState({});

   function callBackSetTab([num,change]) {
        settabNum(num);
        setisSelecting(change);
    }

    const ReloadData = React.useCallback(() => {
        setisReloading(true);
        GetInfoLogin();
        setTimeout(() => {
            setisReloading(false);
        }, 2000);
    }, []);

    const GetInfoLogin = async () => {
        try {
            const response = await fetch(
                'https://backend-mob104.herokuapp.com/listBaiViet',
            );
            const json = await response.json();
            setinfoLogin(json.data.listBaiViet[1].idNguoiDung);
            console.log(infoLogin);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetInfoLogin();
        });

        return unsubscribe;
    }, [navigation]);

    var arr_Screen = [
        <PostScreen infoLogin={infoLogin} nav={navigation} selected={isSelecting}  settabNum={callBackSetTab}  refreshing={isReloading}/>,
        <MyAccount  infoLogin={infoLogin}  nav={navigation} selected={isSelecting}  settabNum={callBackSetTab}  refreshing={isReloading}/>,
        <NotifyScreen />,
        <SettingScreen  infoLogin={infoLogin} nav={navigation} selected={isSelecting} settabNum={callBackSetTab}  refreshing={isReloading}/>,
       
    ]

    return (
        <View style={styles.container}>

            <CollapsibleHeaderScrollView
                CollapsibleHeaderComponent={<DynamicHeader settabNum={callBackSetTab} tabNum={tabNum} nav={navigation} />}
                headerHeight={135}
                statusBarHeight={Platform.OS === 'ios' ? 20 : 0}
                refreshControl={
                    <RefreshControl refreshing={isReloading} onRefresh={ReloadData} progressViewOffset={200} />
                }>
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

