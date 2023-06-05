import {
    Image, ScrollView,
    Text, TouchableOpacity,
    TouchableHighlight, View,
    Dimensions, FlatList
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Posts/PostScreen.styles';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AutoHeightImage from 'react-native-auto-height-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostScreen = (route) => {
    // {
    //     routeName: 'Main',
    //     action: route.navActions.navigate({ routeName: 'Bar' }),
    //   }),
    const [arr_post, setarr_post] = useState({});

    function OpenNewPost() {
        console.log(arr_post);
        route.nav.navigate('NewPost', { id_nguoiDung: 'null', picked: "" });
    }

    function OpenAccount() {
        route.settabNum(1);
    }

    const PickingImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            let imageUri = result.assets[0].uri;
            let fileType = imageUri.substring(imageUri.lastIndexOf(".") + 1);

            FileSystem.readAsStringAsync(imageUri, { encoding: "base64" }).then(
                (res) => {
                    let uriBase64 = "data:image/" + fileType + ";base64," + res;
                    route.nav.navigate('NewPost', { id_nguoiDung: 'null', picked: uriBase64 });
                }
            );
        }
    };

    const GetDataUser = async () => {
        // var avatar = await AsyncStorage.getItem('anhDaiDien');
        // setanhDaiDien(avatar);
    }

    React.useEffect(() => {
        if (arr_post.length > 0) {

        } else {
            console.log("get");
            GetDataUser();
            GetListPost();
        }
    });

    const GetListPost = async () => {
        try {
            const response = await fetch(
                'http://192.168.191.19:3000/listBaiViet',
            );
            const json = await response.json();
            setarr_post(json.data.listBaiViet);
            console.log(json.data.listBaiViet.length);
        } catch (error) {
            console.error(error);
        }
    }

    const ItemPost = (row) => {
        const DetailPost = () => { console.log(row); };
        var baiViet = row.post;
        var nguoiDung = baiViet.idNguoiDung;
        var myTuongTac = "";
        var arr_dongTinh = [];
        var arr_phanDoi = [];
        var arr_tuongTac = baiViet.arr_tuongTac;
        // var arr_dongTinh = baiViet.arr_dongTinh;
        // var arr_phanDoi = baiViet.arr_phanDoi;
        var arr_binhLuan = baiViet.arr_binhLuan;

        arr_tuongTac.map((tt, index, arr) => {
            if (tt.idNguoiDung._id == nguoiDung._id) {
                myTuongTac = tt.trangThai;
            }
        })

        return (
            <View>
                <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{
                            uri: nguoiDung.anhDaiDien
                        }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <View style={{ marginLeft: 7 }}>
                            <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6}>
                                <Text style={styles.textName}>{nguoiDung.hoTen}</Text>
                            </TouchableHighlight>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <EvilIcons name='clock' size={20} color={'rgba(0, 0, 0, 0.50)'} />
                                <Text style={{ color: 'rgba(0, 0, 0, 0.75)' }}>{baiViet.thoiGian}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 5 }}
                        onPress={() => { alert('option') }}>
                        <Feather name='more-horizontal' size={30} />
                    </TouchableOpacity>
                </View>

                <Text style={{ margin: 10, fontSize: 20 }}>{baiViet.noiDung}</Text>

                <TouchableOpacity activeOpacity={0.6}>
                    <AutoHeightImage source={{
                        uri: baiViet.anhBaiViet
                    }} width={Dimensions.get('window').width} />
                </TouchableOpacity>

                <View style={styles.viewBelowPost}>
                    <View style={styles.viewRowCenterBetween}>
                        {
                            (myTuongTac == "Liked")
                                ?
                                <TouchableOpacity activeOpacity={0.6}>
                                    <Image source={require('../../assets/images/positive_color.png')}
                                        style={styles.buttonInteract} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={0.6}>
                                    <Image source={require('../../assets/images/positive.png')}
                                        style={styles.buttonInteract} />
                                </TouchableOpacity>
                        }
                        <Text style={styles.textInteract}>{arr_dongTinh.length}</Text>
                        {
                            (myTuongTac == "Disliked")
                                ?
                                <TouchableOpacity activeOpacity={0.6}>
                                    <Image source={require('../../assets/images/negative_color.png')}
                                        style={styles.buttonInteract} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity activeOpacity={0.6}>
                                    <Image source={require('../../assets/images/negative.png')}
                                        style={styles.buttonInteract} />
                                </TouchableOpacity>
                        }
                        <Text style={styles.textInteract}>{arr_phanDoi.length}</Text>
                    </View>

                    <View style={styles.viewRowCenterBetween}>
                        <TouchableOpacity activeOpacity={0.6}>
                            <Image source={require('../../assets/images/comment.png')}
                                style={styles.buttonInteract} />
                        </TouchableOpacity>
                        <Text style={styles.textInteract}>{arr_binhLuan.length}</Text>
                        <TouchableOpacity activeOpacity={0.6}>
                            <Image source={require('../../assets/images/share.png')}
                                style={styles.buttonInteract} />
                        </TouchableOpacity>
                        <Text style={styles.textInteract}>{baiViet.soLuongChiaSe}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.viewTop}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity underlayColor={'#b0ebc1'} onPress={OpenAccount} activeOpacity={0.5}>
                            <Image source={{ uri: 'https://pbs.twimg.com/media/FoO2GXLakAAugOZ?format=jpg&name=4096x4096' }}
                                style={styles.imageAvatar} />
                        </TouchableOpacity>
                        <TouchableHighlight underlayColor={'#b0ebc1'} onPress={OpenNewPost} activeOpacity={0.5}>
                            <Text style={styles.textHint}>Bạn muốn nói gì?</Text>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight underlayColor={'#b0ebc1'} onPress={PickingImage} activeOpacity={0.5}>
                        <Image source={require('../../assets/images/addImage.png')}
                            style={{ width: 35, height: 35 }} />
                    </TouchableHighlight>
                </View>
                <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />
                {
                    (arr_post.length > 0)
                        ?
                        // <FlatList data={arr_post} keyExtractor={(item) => { return item._id }} renderItem={renderPost} />
                        arr_post.map((post, index, arr) => {
                            return <ItemPost post={post} key={index} />
                        })
                        :
                        <View style={styles.viewNoPost}>
                            <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                width={(Dimensions.get("window").width * 75) / 100} />
                            <Text style={styles.textHint}>Không có bài viết nào..</Text>
                        </View>
                }
            </ScrollView>
        </View>
    )
}

export default PostScreen;