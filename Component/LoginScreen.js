import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Button, TouchableHighlight, Alert } from "react-native";
import { useState, useCallback } from "react";

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

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
    // const Login = () => {
    //     if (email.length == 0) {
    //         seterr('Bạn chưa nhập email!');
    //         return;
    //     }
    //     else {
    //         seterr('')
    //     }
    //     if (matKhau.length == 0) {
    //         seterr('Bạn chưa nhập mật khẩu!');
    //         return;
    //     }

    //     let url_api_user = 'http://192.168.1.82:3000/api';
    //     fetch(url_api_user)
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then( async(arr_user) => {
    //             console.log(arr_user);


    //             arr_user.data.forEach(async (row) => {


    //                 if (row.email == email) {
    //                     if (row.matKhau == matKhau) {
    //                         seterr(null);

    //                         try {
    //                             await AsyncStorage.setItem('id',row._id);
    //                             await AsyncStorage.setItem('taiKhoan',row.taiKhoan);
    //                             await AsyncStorage.setItem('hoTen',row.hoTen);
    //                             await AsyncStorage.setItem('email',row.email);
    //                             await AsyncStorage.setItem('gioiTinh',row.gioiTinh);
    //                             await AsyncStorage.setItem('sdt',row.sdt);
    //                             await AsyncStorage.setItem('queQuan',row.queQuan);
    //                             await AsyncStorage.setItem('ngaySinh',row.ngaySinh);
    //                             await AsyncStorage.setItem('anhDaiDien',row.anhDaiDien);
    //                             await AsyncStorage.setItem('anhBia',row.anhBia);
    //                             // await AsyncStorage.setItem('arr_TheoDoi',row.arr_TheoDoi);
    //                             // await AsyncStorage.setItem('arr_NguoiTheoDoi',row.arr_NguoiTheoDoi);
    //                             // await AsyncStorage.setItem('arr_HoiNhom',row.arr_HoiNhom);
                                
    //                             props.navigation.navigate('HomeScreen');
    //                         } catch (error) {
    //                             console.log(error);
    //                             console.log("Chưa lưu dc obj");
    //                         }
    //                     }
    //                     else {
    //                         // Alert.alert('Lỗi đăng nhập', "Sai pass rồi");
    //                         seterr('Sai mật khẩu rồi!');
    //                         return;
    //                     }

    //                 }


    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    const Login = () => {
        props.navigation.navigate('HomeScreen');
    }

    return (
        <View style={st.container} >

            <View style={st.container2}>
                <Text></Text>
            </View>

            <Text style={st.nameLogo}>MUNNECT</Text>
            <Text style={st.txtIntro}>Vui lòng đăng nhập để tiếp tục</Text>
            <View style={st.viewInput}>
                <TextInput style={st.txtInput} placeholder="Email" onChangeText={(txt) => { setemail(txt) }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput style={st.txtInput} placeholder="Mật Khẩu" secureTextEntry={isHide} onChangeText={(txt) => { setmatKhau(txt) }} />
                    <TouchableHighlight activeOpacity={0.5} underlayColor={'#c2f0ce'} style={{ height: 40, position: 'absolute', right: 30, top: 15 }}
                        onPress={() => {
                            setisHide(!isHide);
                        }}
                    >
                        {isHide
                            ? <Image
                                style={st.iconhide}
                                source={require('../assets/images/view.png')}
                            />
                            : <Image
                                style={st.iconhide}
                                source={require('../assets/images/private.png')}
                            />}
                    </TouchableHighlight>
                </View>


                <View style={st.viewRemember}>
                    <View style={st.viewRow}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <TouchableOpacity onPress={onPress}>
                                <View style={st.viewCheckBox}>
                                    {isSelected
                                        ? <Image source={require('../assets/images/checkBox.png')} />
                                        : <View />}
                                </View>
                            </TouchableOpacity>
                            <Text style={st.textRemem}>Lưu mật khẩu</Text>
                        </View>
                    </View>
                    <TouchableHighlight underlayColor={'#daeff5'} activeOpacity={0.5} onPress={() => { props.navigation.navigate('ForgetPassScreen') }}>
                        <Text style={st.textForget}>Quên mật khẩu ?</Text>
                    </TouchableHighlight>

                </View>
            </View>

            <Text style={{ color: 'red', fontSize: 17, alignSelf: 'flex-start', marginLeft: 50, marginTop: 20 }}>{err}</Text>

            <TouchableHighlight style={st.btnLogin} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={Login}>
                <Text style={st.txtLogin}>Đăng nhập</Text>
            </TouchableHighlight>
            <TouchableHighlight style={st.btnRegist} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={() => { props.navigation.navigate('RegistScreen') }}>
                <Text style={st.txtRegist}>Tạo tài khoản mới</Text>
            </TouchableHighlight>


        </View>

    )
}
export default LoginScreen;

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',

    },
    container2: {
        backgroundColor: '#00ff80',
        height: 1500,
        width: 760,
        borderRadius: 350,
        position: 'absolute',
        top: 240,
        left: 0
    },
    nameLogo: {
        fontSize: 40,
        margin: 30,
        fontFamily: 'Aclonica'
    },
    txtIntro: {
        fontSize: 32,
        width: '75%'
    },
    viewInput: {
        width: '90%',
        marginTop: 130

    },
    txtInput: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        backgroundColor: '#FFFFFF',
        fontSize: 18,
        margin: 15,
        borderRadius: 4,
        padding: 13,
        width: '90%',
        paddingRight: 40
    },
    iconhide: {
        width: 30,
        height: 24,
        resizeMode: 'stretch',
        alignItems: 'center',
        marginTop: 15,

    },
    viewRemember: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 40,

    },
    viewRow: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    viewCheckBox: {
        width: 22,
        height: 22,
        borderWidth: 1,
        borderColor: '#D5C5C5',
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        backgroundColor: 'white'
    },
    textRemem: {
        color: '#6B5E5E',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'normal',
        marginLeft: 10,
    },

    textForget: {
        color: '#0386D0',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'normal',
        textDecorationLine: 'underline'
    },
    btnLogin: {
        backgroundColor: '#FFDC00',
        width: '80%',
        borderRadius: 5,
        marginTop: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    txtLogin: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#262625'
    },
    btnRegist: {
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 5,
        marginTop: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    txtRegist: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00ff80'
    },

})