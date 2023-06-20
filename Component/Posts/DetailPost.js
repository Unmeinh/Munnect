import {
    Dimensions, Image,
    ScrollView, Text,
    TouchableHighlight, View,
    TouchableOpacity, FlatList, TextInput,
    ToastAndroid,
    Modal
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AutoHeightImage from "react-native-auto-height-image";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Moment from "moment";
import styles from '../../Styles/Posts/ItemPost.styles';

const DetailPost = ({ route, navigation }) => {
    const [binhLuanMoi, setbinhLuanMoi] = useState('');
    const [baiViet, setbaiViet] = useState(route.params.post);
    const [arr_dongTinh, setarr_dongTinh] = useState(baiViet.arr_dongTinh);
    const [arr_phanDoi, setarr_phanDoi] = useState(baiViet.arr_phanDoi);
    const [arr_binhLuan, setarr_binhLuan] = useState(baiViet.arr_binhLuan);
    const [myTuongTac, setmyTuongTac] = useState('none');
    const [isGetInteract, setisGetInteract] = useState(true);
    var nguoiDung = baiViet.idNguoiDung;
    Moment.locale('en');

    const [isShowMore, setisShowMore] = useState(false);


    const GetPost = async () => {
        try {
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                'http://10.0.2.2:3000/BaiViet/DanhSach/' + baiViet._id,
            );
            const json = await response.json();
            setbaiViet(json.data.baiViet);
            setarr_dongTinh(json.data.baiViet.arr_dongTinh);
            setarr_phanDoi(json.data.baiViet.arr_phanDoi);
            setarr_binhLuan(json.data.baiViet.arr_binhLuan);
        } catch (error) {
            console.log("Get");
            console.error(error);
        }
    }

    const GetComment = async () => {
        try {
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/BaiViet/BinhLuan/DanhSach?idBaiViet=' + baiViet._id,
                'http://10.0.2.2:3000/BaiViet/BinhLuan/DanhSach?idBaiViet=' + baiViet._id,
            );
            const json = await response.json();
            setarr_binhLuan(json.data.listBinhLuan);
        } catch (error) {
            console.log("Get");
            console.error(error);
        }
    }

    const GetInteract = async () => {
        try {
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                'http://10.0.2.2:3000/BaiViet/TuongTac?idNguoiDung=' + nguoiDung._id + '&&idBaiViet=' + baiViet._id,
            );
            const json = await response.json();
            setmyTuongTac(json.data.tuongTac);
            console.log(json.data.tuongTac);
        } catch (error) {
            console.log("Get");
            console.error(error);
        }
    }

    const SetInteract = async (type) => {
        try {
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                'http://10.0.2.2:3000/BaiViet/TuongTac/TuongTacMoi?idNguoiDung=' + nguoiDung._id + '&&idBaiViet=' + baiViet._id + '&&tuongTac=' + type,
            );
            const json = await response.json();
            setmyTuongTac(json.data.tuongTac);
            GetPost();
            console.log(json.data.tuongTac);
        } catch (error) {
            console.log("Set");
            console.error(error);
        }
    }

    async function OpenViewAccount() {
        const loginId = await AsyncStorage.getItem("idLogin");
        if (loginId != undefined) {
            if (nguoiDung._id != loginId) {
                navigation.navigate('ViewAccount', { infoAcc: nguoiDung, });
            }
        }
    }

    const ItemComment = (route) => {
        var row = route.comment;
        return (
            <View style={{ flex: 1, margin: 7 }}>
                {
                    (typeof (row.idNguoiDung) != 'undefined')
                        ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={{
                                uri: row.idNguoiDung.anhDaiDien
                            }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{row.idNguoiDung.tenTaiKhoan}</Text>
                                <Text style={{ fontSize: 17 }}>{row.noiDung}</Text>
                            </View>
                        </View>
                        : ""
                }
            </View>
        )
    }

    const UploadComment = async () => {
        const loginId = await AsyncStorage.getItem("idLogin");
        let url_api = 'http://10.0.2.2:3000/BaiViet/BinhLuan/ThemBinhLuan';

        let formData = new FormData();
        formData.append('idNguoiDung', loginId);
        formData.append('idBaiViet', baiViet._id);
        formData.append('noiDung', binhLuanMoi);
        formData.append('thoiGian', new Date().toDateString());

        // if (dataImage != {} && ipImageUrl != "") {
        //     formData.append('anhBinhLuan', dataImage);
        // }

        fetch(url_api, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
                'content-type': 'multipart/form-data',
            },
            body: formData
        })
            .then((res) => {
                console.log(res);
                if (res.status == 201) {
                    ToastAndroid.show('Đăng bình luận thành công!', ToastAndroid.SHORT);
                    navigation.goBack();
                } else {
                    ToastAndroid.show('Đăng bình luận thất bại!', ToastAndroid.SHORT);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    React.useEffect(() => {
        if (isGetInteract == true) {
            console.log("Get");
            GetInteract();
        }
    }, [isGetInteract]);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            GetComment();
        });

        return unsub;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.viewDetailPost}>
                    <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 85 / 100 }}>
                        <TouchableOpacity onPress={OpenViewAccount}>
                            <Image source={{ uri: nguoiDung.anhDaiDien }}
                                style={{ width: 50, height: 50, borderRadius: 50 }} />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 7 }}>
                            <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6}
                                onPress={OpenViewAccount}>
                                <Text style={styles.textName} numberOfLines={2}>
                                    {nguoiDung.tenTaiKhoan}
                                </Text>
                            </TouchableHighlight>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <EvilIcons name='clock' size={20} color={'rgba(0, 0, 0, 0.50)'} />
                                <Text style={{ color: 'rgba(0, 0, 0, 0.75)' }}>{Moment(baiViet.thoiGian).format('MMM DD/YYYY')}</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => { setisShowMore(true)} }>
                        <Feather name='more-horizontal' size={30} />
                    </TouchableOpacity>
                    {/* SHOW MODAL MORE */}
                    <Modal visible={isShowMore} animationType="fade" transparent={true} onRequestClose={() => { setisShowMore(false) }}>
                        <View style={styles.viewModalMore}>
                            <TouchableHighlight style={styles.viewModalItemMore} underlayColor={'#ebedeb'} activeOpacity={0.5} onPress={()=>{
                                setisShowMore(false);
                                }}>
                                <Text style={{fontSize:18, margin:7}}>Sửa bài viết</Text>
                            </TouchableHighlight>
                            <View style={{height:1, backgroundColor:'#000000'}}/>
                            <TouchableHighlight  style={styles.viewModalItemMore}  underlayColor={'#ebedeb'} activeOpacity={0.5} onPress={()=>{
                                setisShowMore(false)
                                }}>
                                <Text  style={{fontSize:18, margin:7}}>Xóa bài viết</Text>
                            </TouchableHighlight>
                        </View>

                    </Modal>

                </View>
                <TouchableOpacity activeOpacity={1} >
                    <View>
                        <Text style={{
                            margin: 10, fontSize: 20,
                            fontFamily: (String(baiViet.phongChu) == 'Default') ? "" : String(baiViet.phongChu)
                        }}>
                            {baiViet.noiDung}</Text>

                        <TouchableOpacity activeOpacity={0.6}>
                            <AutoHeightImage source={{ uri: baiViet.anhBaiViet }}
                                width={Dimensions.get('window').width} />
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
                <View style={styles.viewBelowPost}>
                    <View style={styles.viewRowCenterBetween}>
                        {
                            (myTuongTac == "Liked")
                                ?
                                <TouchableOpacity activeOpacity={0.6} onPress={() => SetInteract('none')}>
                                    <Image source={require('../../assets/images/positive_color.png')}
                                        style={styles.buttonInteract} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={0.6} onPress={() => SetInteract('Liked')}>
                                    <Image source={require('../../assets/images/positive.png')}
                                        style={styles.buttonInteract} />
                                </TouchableOpacity>
                        }
                        <Text style={styles.textInteract}>{arr_dongTinh.length}</Text>
                        {
                            (myTuongTac == "Disliked")
                                ?
                                <TouchableOpacity activeOpacity={0.6} onPress={() => SetInteract('none')}>
                                    <Image source={require('../../assets/images/negative_color.png')}
                                        style={styles.buttonInteract} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={0.6} onPress={() => SetInteract('Disliked')}>
                                    <Image source={require('../../assets/images/negative.png')}
                                        style={styles.buttonInteract} />
                                </TouchableOpacity>
                        }
                        <Text style={styles.textInteract}>{arr_phanDoi.length}</Text>
                    </View>

                    <View style={styles.viewRowCenterBetween}>
                        <TouchableOpacity activeOpacity={1}>
                            <Image source={require('../../assets/images/comment.png')}
                                style={styles.buttonInteract} />
                        </TouchableOpacity>
                        <Text style={styles.textInteract}>{arr_binhLuan.length}</Text>
                        <TouchableOpacity activeOpacity={1}>
                            <Image source={require('../../assets/images/share.png')}
                                style={styles.buttonInteract} />
                        </TouchableOpacity>
                        <Text style={styles.textInteract}>{baiViet.soLuongChiaSe}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />

                <View>
                    <Text style={{ fontSize: 18, margin: 10 }}>Tất cả bình luận</Text>
                    {
                        <ScrollView>
                            <View style={{ flex: 1 }}>
                                {
                                    arr_binhLuan.map((binhLuan, index, arr) => {
                                        return <ItemComment comment={binhLuan} key={index} />
                                    })
                                }
                            </View>
                        </ScrollView>
                    }
                </View>
            </ScrollView>

            <View style={styles.viewBoxComment}>
                <View style={styles.viewComment}>
                    <TextInput style={styles.txtComment} placeholder="Bạn thấy sao về bài viết này?" onChangeText={(txt) => { setbinhLuanMoi(txt) }} value={binhLuanMoi} />
                    <TouchableHighlight underlayColor={'#b0ebc1'} onPress={() => { }} activeOpacity={0.5}>
                        <Image source={require('../../assets/images/iconImageCmt.png')}
                            style={{ width: 30, height: 30 }} />
                    </TouchableHighlight>
                </View>

                <TouchableOpacity style={styles.btnSendComment} onPress={UploadComment}>
                    <Feather name='send' size={22} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default DetailPost;