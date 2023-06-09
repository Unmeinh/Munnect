import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, Image, View, Button, TouchableHighlight } from "react-native";
import { useState } from "react";
import styles from '../../Styles/Login/ResisScreen.styles';

const RegistScreen = (props) => {
    const [email, setemail] = useState('');
    const [taiKhoan, settaiKhoan] = useState('');
    const [ngaySinh, setngaySinh] = useState('');
    const [matKhau, setmatKhau] = useState('');
    const [matKhau2, setmatKhau2] = useState('');
    const [err, seterr] = useState('')

    const Regist = () => {
        if (email.length == '') {
            seterr('Email đang bị trống');
            return;
        }
        if (taiKhoan.length == '') {
            seterr('Tài khoản đang bị trống');
            return;
        }
        if (ngaySinh.length == '') {
            seterr('Ngày sinh đang bị trống');
            return;
        }
        if (matKhau.length == '') {
            seterr('Mật khẩu đang bị trống');
            return;
        }
        if (matKhau2.length == '') {
            seterr('Nhập lại mật khẩu đang bị trống');
            return;
        }
        if (matKhau != matKhau2) {
            seterr('Mật khẩu không trùng nhau');
            return;
        }
        seterr(null);

        let objU = {_id:'sdsdsd' ,email: email, taiKhoan: taiKhoan, ngaySinh: ngaySinh, matKhau: matKhau,hoTen:'',gioiTinh:'',sdt:'',queQuan:'' ,anhDaiDien:'',anhBia:'',arr_TheoDoi:[],arr_NguoiTheoDoi:[],arr_HoiNhom:[]};
        fetch('http://192.168.11.103:3000/nguoi-dung-api', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objU),
        }).then((res)=>{
            if(res.status==201)
            {
                alert('Them thanh cong')
            }
            else{
                alert('ko them dc '+res.status);
                
            }
           
        }).catch((e)=>{
            console.log(e);
        });
    }
    return (
        <View style={styles.container}>

            <View style={styles.container2}>
                <Text></Text>
            </View>

            <Text style={styles.nameRegist}>Đăng kí tài khoản mới</Text>
            <View style={styles.viewIntro}>
                <Text style={styles.txtIntro}>Vui lòng nhập</Text>
                <Text style={styles.txtIntro}>chính xác thông tin cá nhân</Text>
            </View>

            <View style={styles.viewInput}>
                <TextInput style={styles.txtInput} placeholder="Email" onChangeText={(txt) => { setemail(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Tên tài khoản" onChangeText={(txt) => { settaiKhoan(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Ngày Sinh" onChangeText={(txt) => { setngaySinh(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Mật khẩu" secureTextEntry={true} onChangeText={(txt) => { setmatKhau(txt) }} />
                <TextInput style={styles.txtInput} placeholder="Nhập lại mật khẩu" secureTextEntry={true} onChangeText={(txt) => { setmatKhau2(txt) }} />

                <Text>{err}</Text>
            </View>

            <TouchableHighlight style={styles.btnRegist} activeOpacity={0.6} underlayColor={'#cedbd9'} onPress={Regist}>
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

