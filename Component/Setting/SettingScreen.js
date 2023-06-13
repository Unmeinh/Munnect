import { Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import React, { useState } from "react";
import styles from '../../Styles/Setting/SettingScreen.styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingScreen = (route) => {
    
    const [infoLogin, setinfoLogin] = useState(route.infoLogin);
 
    const GetInfoLogin = async () => {
        try {
            const dataLoginInfo = await AsyncStorage.getItem("infoLogin");
            if (dataLoginInfo !== null) {
                setinfoLogin(JSON.parse(dataLoginInfo));
            }
        } catch (error) {
            console.error(error);
        }
    }
    React.useEffect(() => {
        GetInfoLogin();

    }, []);

    const Logout = async () => {
        var obj = await AsyncStorage.getItem('infoLogin')
        if (obj != null) {
            AsyncStorage.clear();
            route.nav.navigate('LoginScreen');
        }
    }
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { route.settabNum([1, true]) }}>
                    <View style={styles.viewAccount}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{
                                uri: String(infoLogin.anhDaiDien)
                            }} style={{ width: 60, height: 60, borderRadius: 50 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{String(infoLogin.tenTaiKhoan)}</Text>
                                <Text style={{ fontSize: 18 }}>Xem hồ sơ chi tiết</Text>
                            </View>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={40}/>
                        {/* <Image source={require('../../assets/images/right_arrow.png')} /> */}
                    </View>
                </TouchableOpacity>

                <View style={{ height: 2, backgroundColor: '#c9c4c3' }} />

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { route.nav.navigate('ListAccount',{ title: 'Đang theo dõi' })}}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/following.png')} />
                        <Text style={styles.txtItemSetting}>Người tôi theo dõi</Text>
                    </View>
                </TouchableHighlight>

                <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => {  route.nav.navigate('ListAccount',{ title: 'Người theo dõi' })}}>
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

                <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => {route.nav.navigate('SearchScreen') }}>
                    <View style={styles.viewItemSetting}>
                        <Image source={require('../../assets/images/search.png')} />
                        <Text style={styles.txtItemSetting}>Tìm kiếm</Text>
                    </View>
                </TouchableHighlight>
            </View>

            <View>
                <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

                <View style={styles.viewBottom}>
                    <View style={{ height: 1, backgroundColor: '#c9c4c3', alignItems: 'center' }} />

                    <TouchableHighlight underlayColor={'#ededeb'} activeOpacity={0.8} onPress={() => { route.nav.navigate('UpdateAccountScreen') }}>
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
        </View>
    )
}
export default SettingScreen;