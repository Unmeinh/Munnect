import { Image, Text, TouchableHighlight, View } from "react-native"
import React, { useState } from "react";
import styles from '../../Styles/Setting/SettingScreen.styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingScreen = (props) => {
    const [anhDaiDien, setanhDaiDien] = useState();
    const [hoTen, sethoTen] = useState();

    // const [dsbv, setdsbv] = useState([]);

    const GetDataUser = async () => {
        var jsonValueObj = await AsyncStorage.getItem('jsonValueObj');

        setanhDaiDien(JSON.parse(jsonValueObj).anhDaiDien);
        sethoTen(JSON.parse(jsonValueObj).hoTen);
    }
    React.useEffect(() => {
        GetDataUser();

    }, []);

    const Logout = async()=>{
        var obj= await AsyncStorage.getItem('jsonValueObj')
        if(obj!=null)
        
        {
            AsyncStorage.clear();
            props.nav.navigate('LoginScreen');
        }
    }
    return (
        <View style={styles.container}>
            <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => {props.settabNum(1)}}>
                <View style={styles.viewAccount}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={{
                            uri: anhDaiDien
                        }} style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{hoTen}</Text>
                            <Text style={{ fontSize: 18 }}>Xem hồ sơ chi tiết</Text>
                        </View>
                    </View>
                    <Image source={require('../../assets/images/right_arrow.png')} />
                </View>
            </TouchableHighlight>

            <View style={{ height: 2, backgroundColor: '#c9c4c3' }} />

            <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { }}>
                <View style={styles.viewItemSetting}>
                    <Image source={require('../../assets/images/following.png')} />
                    <Text style={styles.txtItemSetting}>Người tôi theo dõi</Text>
                </View>
            </TouchableHighlight>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { }}>
                <View style={styles.viewItemSetting}>
                    <Image source={require('../../assets/images/follower.png')} />
                    <Text style={styles.txtItemSetting}>Người theo dõi tôi</Text>
                </View>
            </TouchableHighlight>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { }}>
                <View style={styles.viewItemSetting}>
                    <Image source={require('../../assets/images/myPost.png')} />
                    <Text style={styles.txtItemSetting}>Bài viết của tôi</Text>
                </View>
            </TouchableHighlight>

            {/* <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { }}>
                <View style={styles.viewItemSetting}>
                    <Image source={require('../../assets/images/group.png')} />
                    <Text style={styles.txtItemSetting}>Hội nhóm</Text>
                </View>
            </TouchableHighlight> */}

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { }}>
                <View style={styles.viewItemSetting}>
                    <Image source={require('../../assets/images/search.png')} />
                    <Text style={styles.txtItemSetting}>Tìm kiếm</Text>
                </View>
            </TouchableHighlight>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <View style={styles.viewBottom}>
                <View style={{ height: 1, backgroundColor: '#c9c4c3', alignItems: 'center' }} />

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => {props.nav.navigate('UpdateAccountScreen') }}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/manageAccount.png')} />
                        <Text style={styles.txtItemSetting}>Quản lý tài khoản</Text>
                    </View>
                </TouchableHighlight>

                <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { }}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/changePass.png')} />
                        <Text style={styles.txtItemSetting}>Thay đổi mật khẩu</Text>
                    </View>
                </TouchableHighlight>

                <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={Logout}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/logout.png')} />
                        <Text style={styles.txtItemSetting}>Đăng xuất</Text>
                    </View>
                </TouchableHighlight>

            </View>
        </View>
    )
}
export default SettingScreen;