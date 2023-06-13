import {
    Text, TextInput,
    TouchableOpacity, Image, View,
    ToastAndroid, TouchableHighlight, Alert
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Login/LoginScreen.styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
    const [inputEmail, setinputEmail] = useState('');
    const [inputPassword, setinputPassword] = useState('');
    const [err, seterr] = useState('');
    const [isHide, setisHide] = useState(true);
    const [isSelected, setSelection] = useState(false);
    const onPress = () => {
        setSelection(!isSelected);
    };

    const Login = () => {
        // let url_api = 'https://backend-munnect.herokuapp.com/NguoiDung/DangNhap?inputEmail=' + inputEmail;
        let url_api = 'http://192.168.191.7:3000/NguoiDung/DangNhap?inputEmail=' + inputEmail;
        var inputObj = {
            email: inputEmail,
            matKhau: inputPassword
        }

        fetch(url_api, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(inputObj)
        })
            .then(async (res) => {
                if (res.status == 200) {
                    const json = await res.json();
                    if (json.success == true) {
                        ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT);
                        await AsyncStorage.setItem('idLogin', json.objData._id);
                        await AsyncStorage.setItem('isLogin', 'true');
                        navigation.navigate('HomeNavi');
                    } else {
                        console.log(json.message);
                        ToastAndroid.show('Đăng nhập thất bại!', ToastAndroid.SHORT);
                        ToastAndroid.show(json.message, ToastAndroid.SHORT);
                    }
                } else {
                    ToastAndroid.show('Đăng nhập thất bại!', ToastAndroid.SHORT);
                }
            })
            .catch((e) => {
                console.log(e);
            });

    }

    return (
        <View style={styles.container} >

            <View style={styles.container2}>
                <Text></Text>
            </View>

            <Text style={styles.nameLogo}>MUNNECT</Text>
            <Text style={styles.txtIntro}>Vui lòng đăng nhập để tiếp tục</Text>
            <View style={styles.viewInput}>
                <TextInput style={styles.txtInput} placeholder="Email.." onChangeText={(txt) => { setinputEmail(txt) }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput style={styles.txtInput} placeholder="Mật khẩu.." secureTextEntry={isHide} onChangeText={(txt) => { setinputPassword(txt) }} />
                    <TouchableOpacity activeOpacity={0.5} underlayColor={'#c2f0ce'} style={{ height: 40, position: 'absolute', right: 30, top: 15 }}
                        onPress={() => {
                            setisHide(!isHide);
                        }} >
                        {isHide
                            ? <Image
                                style={styles.iconhide}
                                source={require('../../assets/images/view.png')}
                            />
                            : <Image
                                style={styles.iconhide}
                                source={require('../../assets/images/private.png')}
                            />}
                    </TouchableOpacity>
                </View>

                <View style={styles.viewRemember}>
                    <View style={styles.viewRow}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TouchableOpacity onPress={onPress}>
                                <View style={styles.viewCheckBox}>
                                    {isSelected
                                        ? <Image source={require('../../assets/images/checkBox.png')} />
                                        : <View />}
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.textRemem}>Lưu mật khẩu</Text>
                        </View>
                    </View>
                    <TouchableHighlight underlayColor={'#daeff5'} activeOpacity={0.5} onPress={() => { navigation.navigate('ForgetPassScreen') }}>
                        <Text style={styles.textForget}>Quên mật khẩu ?</Text>
                    </TouchableHighlight>

                </View>
            </View>

            <Text style={{ color: 'red', fontSize: 17, alignSelf: 'flex-start', marginLeft: 50, marginTop: 20 }}>{err}</Text>

            <TouchableHighlight style={styles.btnLogin} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={Login}>
                <Text style={styles.txtLogin}>Đăng nhập</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btnRegist} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={() => { navigation.navigate('RegistScreen') }}>
                <Text style={styles.txtRegist}>Tạo tài khoản mới</Text>
            </TouchableHighlight>

        </View>

    )
}

export default LoginScreen;
