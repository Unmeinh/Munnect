import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Button, TouchableHighlight } from "react-native";
import { useState } from "react";

const RegistScreen = (props) => {
    const [email, setemail] = useState('');
    const [taiKhoan, settaiKhoan] = useState('');
    const [matKhau, setmatKhau] = useState('');
    const [ngaySinh, setngaySinh] = useState('');
    const onPress = () => {
        setSelection(!isSelected);
    };
    return (
        <View style={st.container}>

            <View style={st.container2}>
                <Text></Text>
            </View>

            <Text style={st.nameRegist}>Đăng kí tài khoản</Text>
            <Text style={st.txtIntro}>Vui lòng nhập chính xác thông tin !!!</Text>
            <View style={st.viewInput}>
                <TextInput style={st.txtInput} placeholder="Email" onChangeText={(txt) => { setemail(txt) }} />
                <TextInput style={st.txtInput} placeholder="Tài Khoản" onChangeText={(txt) => { settaiKhoan(txt) }} />
                <TextInput style={st.txtInput} placeholder="Mật khẩu" secureTextEntry={true} />
                <TextInput style={st.txtInput} placeholder="Nhập lại mật khẩu" secureTextEntry={true} />
                <TextInput style={st.txtInput} placeholder="Ngày Sinh" />

            </View>

            <TouchableHighlight style={st.btnRegist} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={onPress}>
                <Text style={st.txtRegist}>Đăng kí</Text>
            </TouchableHighlight>
            <View style={{ flexDirection: "row", margin: 20 }}>
                <Text style={{ fontSize: 17 }}>Bạn đã có tài khoản?</Text>
                <TouchableHighlight underlayColor={'#e3cac8'} activeOpacity={0.5} onPress={() => { props.navigation.navigate('LoginScreen') }}>
                    <Text style={st.txtLogin}>Đăng nhập</Text>
                </TouchableHighlight>
            </View>


        </View>

    )
}
export default RegistScreen;

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ff80',
        marginTop: StatusBar.currentHeight,
        alignItems: 'center'

    },
    container2: {
        backgroundColor: '#ffffff',
        height: 2000,
        width: 780,
        borderRadius: 380,
        position: 'absolute',
        bottom: 260,
        right: 0
    },
    nameRegist: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 30
        // fontFamily:''
    },
    txtIntro: {
        fontSize: 17
    },
    viewInput: {
        width: '85%',
        marginTop: 70

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

    },

    btnRegist: {
        backgroundColor: '#FFDC00',
        width: '80%',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#e4e86f',
        marginTop: 50
    },
    txtRegist: {
        padding: 10,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#262625'
    },
    btnRegist: {
        backgroundColor: '#FFDC00',
        width: '80%',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
        marginTop: 40
    },

    txtLogin: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 17,
        marginLeft: 15
    }

})