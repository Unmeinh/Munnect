import {
    Text, TextInput, View,
    ToastAndroid, TouchableHighlight, TouchableOpacity
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Login/ResisScreen.styles';

const RegistScreen = (props) => {
    const [inputEmail, setinputEmail] = useState('abc@def.xyz');
    const [inputUsername, setinputUsername] = useState('Demo');
    const [inputPassword, setinputPassword] = useState('1223451');
    const [inputDate, setinputDate] = useState(new Date().toDateString());
    const onPress = () => {
        setSelection(!isSelected);
    };

    function Resigter() {
        // let url_api = 'https://backend-munnect.herokuapp.com/NguoiDung/DangKy';
        let url_api = 'http://192.168.191.7:3000/NguoiDung/DangKy';
        var inputObj = {
            tenTaiKhoan: inputUsername,
            email: inputEmail,
            matKhau: inputPassword,
            sinhNhat: inputDate
        }
        console.log(inputObj);

        fetch(url_api, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(inputObj)
        })
            .then(async (res) => {
                const json = await res.json();
                if (res.status == 200) {
                    if (json.success == true) {
                        ToastAndroid.show('Cập nhật tài khoản thành công!', ToastAndroid.SHORT);
                        navigation.goBack();
                    }
                } else {
                    ToastAndroid.show('Đăng ký thất bại!', ToastAndroid.SHORT);
                    ToastAndroid.show(json.message, ToastAndroid.SHORT);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <View style={styles.container}>

            <View style={styles.container2}>
                <Text></Text>
            </View>

            <Text style={styles.nameRegist}>Đăng kí tài khoản</Text>
            <Text style={styles.txtIntro}>Vui lòng nhập chính xác thông tin !!!</Text>
            <View style={styles.viewInput}>
                <TextInput style={styles.txtInput} placeholder="Email.." onChangeText={(txt) => { setinputEmail(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Tên tài khoản.." onChangeText={(txt) => { setinputUsername(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Mật khẩu.." secureTextEntry={true} onChangeText={(txt) => { setinputPassword(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Nhập lại mật khẩu.." secureTextEntry={true} />
                <TextInput style={styles.txtInput} placeholder="Ngày sinh.." onChangeText={(txt) => { setinputDate(new Date().toDateString()) }} />

            </View>

            <TouchableOpacity style={styles.btnRegist} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={Resigter}>
                <Text style={styles.txtRegist}>Đăng kí</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 19 }}>Bạn đã có tài khoản?</Text>
                <TouchableOpacity underlayColor={'#e3cac8'} activeOpacity={0.5} onPress={() => { props.navigation.navigate('LoginScreen') }}>
                    <Text style={styles.txtLogin}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RegistScreen;
