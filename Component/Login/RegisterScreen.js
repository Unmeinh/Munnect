import {
    StatusBar, StyleSheet,
    Text, TextInput, View,
    Button, TouchableHighlight
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Login/ResisScreen.styles';

const RegistScreen = (props) => {
    const [email, setemail] = useState('');
    const [taiKhoan, settaiKhoan] = useState('');
    const [matKhau, setmatKhau] = useState('');
    const [ngaySinh, setngaySinh] = useState('');
    const onPress = () => {
        setSelection(!isSelected);
    };

    return (
        <View style={styles.container}>

            <View style={styles.container2}>
                <Text></Text>
            </View>

            <Text style={styles.nameRegist}>Đăng kí tài khoản</Text>
            <Text style={styles.txtIntro}>Vui lòng nhập chính xác thông tin !!!</Text>
            <View style={styles.viewInput}>
                <TextInput style={styles.txtInput} placeholder="Email" onChangeText={(txt) => { setemail(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Tài Khoản" onChangeText={(txt) => { settaiKhoan(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Mật khẩu" secureTextEntry={true} />
                <TextInput style={styles.txtInput} placeholder="Nhập lại mật khẩu" secureTextEntry={true} />
                <TextInput style={styles.txtInput} placeholder="Ngày Sinh" />

            </View>

            <TouchableHighlight style={styles.btnRegist} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={onPress}>
                <Text style={styles.txtRegist}>Đăng kí</Text>
            </TouchableHighlight>
            <View style={{ flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 17 }}>Bạn đã có tài khoản?</Text>
                <TouchableHighlight underlayColor={'#e3cac8'} activeOpacity={0.5} onPress={() => { props.navigation.navigate('LoginScreen') }}>
                    <Text style={styles.txtLogin}>Đăng nhập</Text>
                </TouchableHighlight>
            </View>


        </View>

    )
}

export default RegistScreen;
