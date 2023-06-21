import {
    Dimensions, ToastAndroid,
    Image, ScrollView,
    Text, TouchableHighlight,
    TouchableOpacity, View
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../Styles/Account/AccScreen.styles'
import AutoHeightImage from "react-native-auto-height-image";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Moment from 'moment';

const ListMyPost = ({ route, navigation }) => {
    const [arr_post, setarr_post] = useState({});
    const [isSelected, setisSelected] = useState(true);
    const [infoLogin, setinfoLogin] = useState(route.infoLogin);
    const [isRefresh, setisRefresh] = useState(true);

    const GetListPost = async () => {
        try {
            const loginId = await AsyncStorage.getItem("idLogin");
            const response = await fetch(
                'https://backend-munnect.herokuapp.com/BaiViet/DanhSach?idNguoiDung=' + loginId,
            );
            const json = await response.json();
            setarr_post(json.data.listBaiViet);
            setisSelected(false);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            GetListPost();
        });

        return unsubscribe;
    }, [navigation]);

    const ItemMyPost = (row) => {
        var baiViet = row.post;
        var nguoiDung = baiViet.idNguoiDung;

        async function UpdatePost() {
            const loginId = await AsyncStorage.getItem("idLogin");
            if (loginId == nguoiDung._id) {
                if (typeof (baiViet.anhBaiViet) != 'undefined') {
                    row.nav.navigate('UpdatePost', { infoLogin: nguoiDung, pickedBase64: baiViet.anhBaiViet, pickedImage: {}, post: baiViet });
                } else {
                    row.nav.navigate('UpdatePost', { infoLogin: nguoiDung, pickedBase64: "", pickedImage: {}, post: baiViet });
                }
            }
        }

        async function DeletePost() {
            const loginId = await AsyncStorage.getItem("idLogin");
            let url_api = 'http://10.0.2.2:3000/BaiViet/XoaBaiViet/' + baiViet._id;

            fetch(url_api, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.status == 203) {
                        ToastAndroid.show('Xóa bài viết thành công!', ToastAndroid.SHORT);
                        GetListPost();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }

        return (
            <View style={{ borderColor: '#000000', borderWidth: 1, borderRadius: 20, padding: 20 }}>
                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 85 / 100 }}>
                    <Image source={{ uri: nguoiDung.anhDaiDien }}
                        style={{ width: 50, height: 50, borderRadius: 50 }} />
                    <View style={{ marginLeft: 7 }}>
                        <Text style={styles.textName} numberOfLines={2}>
                            {nguoiDung.tenTaiKhoan}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <EvilIcons name='clock' size={20} color={'rgba(0, 0, 0, 0.50)'} />
                            <Text style={{ color: 'rgba(0, 0, 0, 0.75)' }}>{Moment(baiViet.thoiGian).format('MMM DD/YYYY')}</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={{
                        margin: 10, fontSize: 20,
                        fontFamily: (String(baiViet.phongChu) == 'Default') ? "" : String(baiViet.phongChu)
                    }} numberOfLines={2}>
                        {baiViet.noiDung}</Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                        <AutoHeightImage source={{ uri: baiViet.anhBaiViet }}
                            width={Dimensions.get('window').width * 85 / 100} />
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 10 }}>
                    <TouchableOpacity onPress={UpdatePost}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/iconEditPost.png')} style={{ width: 30 }} />
                            <Text style={{ fontSize: 20, marginLeft: 5 }}>Sửa bài viết</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={DeletePost}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/iconDelPost.png')} style={{ width: 30 }} />
                            <Text style={{ fontSize: 20, marginLeft: 5 }}>Sửa bài viết</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                {
                    (isSelected == true)
                        ?
                        <View style={styles.viewOther}>
                            <AutoHeightImage source={require('../../assets/images/blogs.png')}
                                width={(Dimensions.get("window").width * 75) / 100} />
                            <Text style={styles.textHint}>Đang tải bài viết..</Text>
                        </View>
                        :
                        <View>
                            {
                                (arr_post.length > 0)
                                    ?
                                    arr_post.map((post, index, arr) => {
                                        return <ItemMyPost post={post} key={index} nav={navigation} isRefresh={isRefresh} />
                                    })
                                    :
                                    <View style={styles.viewOther}>
                                        <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                            width={(Dimensions.get("window").width * 75) / 100} />
                                        <Text style={styles.textHint}>Không có bài viết nào..</Text>
                                    </View>
                            }
                        </View>
                }

            </View>
        </ScrollView>
    )
}
export default ListMyPost;