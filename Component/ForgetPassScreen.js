import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Button, TouchableHighlight, Alert } from "react-native";
import { useState } from "react";

const ForgetPassScreen = (props) => {
    const [taiKhoan, settaiKhoan] = useState('');
    const [email, setemail] = useState('')
    const [isSelected, setSelection] = useState(false);
    const GetPass = () => {
        if (taiKhoan.length == 0) {
            Alert.alert('Lỗi rồi', 'Bạn chưa nhập tài khoản');
            return;
        }
        if (email.length == 0) {
            Alert.alert('Lỗi rồi', 'Bạn chưa nhập email xác minh');
            return;
        }

        let url_api_user = 'http://192.168.1.82:3000/api';
        fetch(url_api_user)
            .then((res) => {
                return res.json();
            })
            .then((arr_user) => {
                arr_user.data.forEach((row) => {

                    if (taiKhoan == row.taiKhoan) {
                        if (email == row.email) {
                            Alert.alert('Chúc mừng bạn!', 'Mật khẩu của tài khoản ' + row.taiKhoan + ' là: ' + row.matKhau);
                        }
                        else {
                            Alert.alert('Lỗi rồi', 'Sai email');
                            return;
                        }
                    }
                    else {
                        Alert.alert('Lỗi rồi', 'Không tồn tại tài khoản này');
                        return;
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <View style={st.container}>

            <View style={st.container2}>
                <Text></Text>
            </View>

            <Text style={st.nameLogo}>Lấy lại mật khẩu</Text>
            <Text style={st.note}>Vui lòng nhập chính xác tên tài khoản và email của bạn để lấy lại mật khẩu</Text>


            <View style={st.viewInput}>
                <TextInput style={st.txtInput} placeholder="Tên tài khoản của bạn" onChangeText={(txt) => { settaiKhoan(txt) }} />
                <TextInput style={st.txtInput} placeholder="Email của bạn" onChangeText={(txt) => { setemail(txt) }} />


            </View>


            <TouchableHighlight style={st.btnGetPass} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={GetPass}>
                <Text style={st.txtGetPass}>Tiếp tục</Text>
            </TouchableHighlight>

            <View style={{flexDirection:"row",margin:20}}>
                <Text style={{fontSize:17}}>Bạn nhớ ra mật khẩu?</Text>
                <TouchableHighlight underlayColor={'#e3cac8'} activeOpacity={0.5} onPress={()=>{props.navigation.navigate('LoginScreen')}}>
                    <Text style={st.txtLogin}>Đăng nhập</Text>
                </TouchableHighlight>

            </View>


        </View>

    )
}
export default ForgetPassScreen;

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
        width: 650,
        borderRadius: 480,
        position: 'absolute',
        top: 250,

    },

    nameLogo: {
        fontSize: 32,
        alignSelf: 'flex-start',
        margin: 45,

    },

    note: {
        width: '80%',

        fontSize: 17
    },
    viewInput: {
        width: '85%',
        marginTop: 150

    },
    txtInput: {
        borderWidth: 2,
        borderColor: '#ddf0eb',
        backgroundColor: '#FFFFFF',
        fontSize: 18,
        margin: 15,
        borderRadius: 4,
        padding: 13,

    },

    btnGetPass: {
        backgroundColor: '#FFDC00',
        width: '80%',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#e4e86f',
        marginTop: 50
    },
    txtGetPass: {
        padding: 10,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#262625'
    },
    txtLogin:{
        fontWeight:'bold',
        textDecorationLine:'underline',
        fontSize:17,
        marginLeft:15
    }

})