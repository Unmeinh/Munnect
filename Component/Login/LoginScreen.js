import {
    StatusBar, StyleSheet,
    Text, TextInput,
    TouchableOpacity, Image, View,
    Button, TouchableHighlight, Alert
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Login/LoginScreen.styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
    const [email, setemail] = useState('');
    const [matKhau, setmatKhau] = useState('');
    const [err, seterr] = useState('');
    const [isHide, setisHide] = useState(true);
    const [isSelected, setSelection] = useState(false);
    const onPress = () => {
        setSelection(!isSelected);
    };

    const Login = () => {
        if (email.length == 0) {
            seterr('Bạn chưa nhập email!');
            return;
        }
        else {
            seterr('')
        }
        if (matKhau.length == 0) {
            seterr('Bạn chưa nhập mật khẩu!');
            return;
        }

        let url_api_user = 'https://backend-munnect.herokuapp.com/nguoi-dung-api/dang-nhap?email=' + email;
        fetch(url_api_user)
            .then((res) => {
                return res.json();
            })
            .then(async (arr_user) => {

                if (arr_user.length != 1) {
                    seterr('Không tồn tại tài khoản hoặc CSDL bị trùng lặp');
                    return;
                }
                seterr('');
                const obj = (arr_user[0]);
                console.log("obj " + obj.taiKhoan);
                if (matKhau == obj.matKhau) {
                    console.log("Login success full");
                    try {
                        const jsonValueObj = JSON.stringify(obj)
                        await AsyncStorage.setItem('jsonValueObj', jsonValueObj)
                        props.navigation.navigate('HomeScreen');
                    } catch (error) {
                        console.log(error);
                        console.log("Chưa lưu dc obj");
                    }

                }
                else {
                    // Alert.alert('Lỗi đăng nhập', "Sai pass rồi");
                    seterr('Sai mật khẩu rồi!');
                    return;
                }


            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <View style={styles.container} >

            <View style={styles.container2}>
                <Text></Text>
            </View>

            <Text style={styles.nameLogo}>MUNNECT</Text>
            <Text style={styles.txtIntro}>Vui lòng đăng nhập để tiếp tục</Text>
            <View style={styles.viewInput}>
                <TextInput style={styles.txtInput} placeholder="Email" onChangeText={(txt) => { setemail(txt) }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput style={styles.txtInput} placeholder="Mật Khẩu" secureTextEntry={isHide} onChangeText={(txt) => { setmatKhau(txt) }} />
                    <TouchableHighlight activeOpacity={0.5} underlayColor={'#c2f0ce'} style={{ height: 40, position: 'absolute', right: 30, top: 15 }}
                        onPress={() => {
                            setisHide(!isHide);
                        }}
                    >
                        {isHide
                            ? <Image
                                style={styles.iconhide}
                                source={require('../../assets/images/view.png')}
                            />
                            : <Image
                                style={styles.iconhide}
                                source={require('../../assets/images/private.png')}
                            />}
                    </TouchableHighlight>
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
                    <TouchableHighlight underlayColor={'#daeff5'} activeOpacity={0.5} onPress={() => { props.navigation.navigate('ForgetPassScreen') }}>
                        <Text style={styles.textForget}>Quên mật khẩu ?</Text>
                    </TouchableHighlight>

                </View>
            </View>

            <Text style={{ color: 'red', fontSize: 17, alignSelf: 'flex-start', marginLeft: 50, marginTop: 20 }}>{err}</Text>

            <TouchableHighlight style={styles.btnLogin} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={Login}>
                <Text style={styles.txtLogin}>Đăng nhập</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btnRegist} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={() => { props.navigation.navigate('RegistScreen') }}>
                <Text style={styles.txtRegist}>Tạo tài khoản mới</Text>
            </TouchableHighlight>


        </View>

    )
}

export default LoginScreen;
