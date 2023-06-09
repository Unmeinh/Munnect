import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from '../../Styles/Posts/PostScreen.styles';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AutoHeightImage from 'react-native-auto-height-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostScreen = (props) => {
    const [anhDaiDien, setanhDaiDien] = useState();
    const [isLoading, setisLoading] = useState(true);
    const [arr_post, setarr_post] = useState([]);
    const [isReloading, setisReloading] = useState(false);



    const GetDataUser = async () => {

        var jsonValueObj = await AsyncStorage.getItem('jsonValueObj');
        setanhDaiDien(JSON.parse(jsonValueObj).anhDaiDien);

    }
    // React.useEffect(() => {
    //     GetDataUser();
    // }, []);

    const GetListPost = async () => {
        try {
            const response = await fetch(
                'http://192.168.11.102:3000/listBaiViet',
            );
            const json = await response.json();
            setarr_post(json.data.listBaiViet);
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false);
        }
    }
    React.useEffect(() => {
        // GetListPost();
        if (arr_post.length > 0) {

        } else {
            console.log("get");
            GetDataUser();
            GetListPost();
        }

    }, []);


    function OpenNewPost() {
        console.log(arr_post);
        props.nav.navigate('NewPost', { id_nguoiDung: 'null', picked: "" });
    }

    function OpenAccount() {
        props.settabNum(1);
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
                    props.nav.navigate('NewPost', { id_nguoiDung: 'null', picked: uriBase64 });
                }
            );
        }
    };

    const ItemPost = (row) => {
        var baiViet = row.item;
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
                            uri: row.item.idNguoiDung.anhDaiDien
                        }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>{row.item.idNguoiDung.hoTen}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/clock.png')} />
                                <Text style={{ marginLeft: 6 }}>{row.item.thoiGian}</Text>
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 5 }}
                        onPress={() => { alert('option') }}>
                        <Feather name='more-horizontal' size={30} />
                    </TouchableOpacity>

                </View>
                <Text style={{ margin: 10, fontSize: 20 }}>{row.item.noiDung}</Text>
                <View>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => { props.nav.navigate('DetailPostScreen', { row: row.item }); }}>
                        <AutoHeightImage source={{
                            uri: row.item.anhBaiViet
                        }} width={Dimensions.get('window').width} />
                    </TouchableOpacity>
                </View>

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
                        <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6} onPress={() => { props.navigation.navigate('DetailPostScreen', { row: row.item }); }}>
                            <Image source={require('../../assets/images/comment.png')} />
                        </TouchableHighlight>
                        <Text style={styles.textInteract}>{arr_binhLuan.length}</Text>
                        <Image source={require('../../assets/images/share.png')} />
                        <Text style={styles.textInteract}>{baiViet.soLuongChiaSe}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />

            </View>
        )
    }

    const reloadData = React.useCallback(
        () => {
            setisReloading(true);
            setTimeout(() => {
                setisReloading(false);
                GetListPost();
            }, 2000);
        }, []
    )
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                nestedScrollEnabled={true}
                style={{ width: '100%' }}
                refreshControl={
                    <RefreshControl
                        refreshing={isReloading}
                        onRefresh={reloadData} />
                }>
                <View style={styles.viewTop}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <TouchableOpacity underlayColor={'#b0ebc1'} onPress={OpenAccount} activeOpacity={0.5} style={{ borderRadius: 50 }}>
                            <Image source={{
                                uri: anhDaiDien
                            }} style={styles.imageAvatar} />

                        </TouchableOpacity>
                        <TouchableOpacity underlayColor={'#b0ebc1'} onPress={OpenNewPost} activeOpacity={0.5}>
                            <Text style={styles.textHint}>Bạn muốn nói gì ?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity underlayColor={'#b0ebc1'} onPress={PickingImage} activeOpacity={0.5} >
                        <Image source={require('../../assets/images/addImage.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />

                {
                    (isLoading) ? (<ActivityIndicator />) : (

                        (arr_post.length > 0)
                            ? (<ScrollView horizontal={true} style={{ width: "100%" }}>
                                <FlatList
                                    data={arr_post}
                                    keyExtractor={(item) => { return item._id }}
                                    renderItem={ItemPost} />
                            </ScrollView>
                            )
                            : (<View style={styles.viewNoPost}>
                                <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                    width={(Dimensions.get("window").width * 75) / 100} />
                                <Text style={styles.textHint}>Không có bài viết nào..</Text>
                            </View>)
                    )

                }
            </ScrollView>
        </SafeAreaView>
    )
}
export default PostScreen;
