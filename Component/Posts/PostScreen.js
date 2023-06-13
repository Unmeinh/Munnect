import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from '../../Styles/Posts/PostScreen.styles';
import ItemPost from "./ItemPost";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AutoHeightImage from 'react-native-auto-height-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostScreen = (props) => {
    const [arr_post, setarr_post] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isSelected, setisSelected] = useState(true);
    const [infoLogin, setinfoLogin] = useState(props.infoLogin);

    function OpenNewPost() {
        if (infoLogin != {}) {
            props.nav.navigate('NewPost', { infoLogin: infoLogin, pickedBase64: "", pickedImage: {} });
        }

    }
    function OpenAccount() {
        props.settabNum([1, true]);
    }

    const GetInfoLogin = async () => {
        try {
            const dataLoginInfo = await AsyncStorage.getItem("infoLogin");
            if (dataLoginInfo !== null) {
                setinfoLogin(JSON.parse(dataLoginInfo));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const GetListPost = async () => {
        try {
            const response = await fetch(
                'https://backend-munnect.herokuapp.com/BaiViet/DanhSach',
            );
            const json = await response.json();
            setarr_post(json.data.listBaiViet);
            setisSelected(false);
            setisLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false);
        }
    }

    const PickingImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            let fileUri = result.assets[0].uri;
            let fileName = fileUri.split('/').pop();
            let imageType = fileUri.substring(fileUri.lastIndexOf(".") + 1);

            let match = /\.(\w+)$/.exec(fileName);
            let fileType = match ? `image/${match[1]}` : `image`;

            FileSystem.readAsStringAsync(fileUri, { encoding: "base64" }).then(
                (res) => {
                    let uriBase64 = "data:image/" + imageType + ";base64," + res;
                    var dataImage = { uri: fileUri, name: fileName, type: "multipart/form-data" };
                    props.nav.navigate('NewPost', { infoLogin: infoLogin, pickedBase64: uriBase64, pickedImage: dataImage });
                }
            );
        }
    };

    React.useEffect(() => {
        if (props.refreshing == false) {
            if (props.selected == true) {
                console.log("select");
                GetInfoLogin();
                GetListPost();
                props.settabNum([0, false]);
            }
        } else {
            console.log("refresh");
            setinfoLogin(props.infoLogin);
            GetListPost();
        }
    }, [props.refreshing]);


    React.useEffect(() => {
        const unsub = props.nav.addListener('focus', () => {
            GetInfoLogin();
            GetListPost();
        });

        return unsub;
    }, [props.nav]);
    // const ItemPost = (row) => {
    //     var baiViet = row.item;
    //     var nguoiDung = baiViet.idNguoiDung;
    //     var myTuongTac = "";
    //     var arr_dongTinh = [];
    //     var arr_phanDoi = [];
    //     var arr_tuongTac = baiViet.arr_tuongTac;
    //     // var arr_dongTinh = baiViet.arr_dongTinh;
    //     // var arr_phanDoi = baiViet.arr_phanDoi;
    //     var arr_binhLuan = baiViet.arr_binhLuan;

    //     // arr_tuongTac.map((tt, index, arr) => {
    //     //     if (tt.idNguoiDung._id == nguoiDung._id) {
    //     //         myTuongTac = tt.trangThai;
    //     //     }
    //     // })
    //     return (
    //         <View>
    //             <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    //                 <View style={{ flexDirection: 'row' }}>
    //                     <TouchableOpacity onPress={() => { props.nav.navigate('ViewAccount', { infoAcc: nguoiDung }) }}>
    //                         <Image source={{
    //                             uri: baiViet.idNguoiDung.anhDaiDien
    //                         }} style={{ width: 50, height: 50, borderRadius: 50 }} />
    //                     </TouchableOpacity>

    //                     <View style={{ marginLeft: 10, justifyContent: 'center' }}>
    //                         <TouchableOpacity onPress={() => { row.nav.navigate('ViewAccount', { infoAcc: nguoiDung, }) }}>
    //                             <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{baiViet.idNguoiDung.tenTaiKhoan}</Text>
    //                         </TouchableOpacity>

    //                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //                             <EvilIcons name='clock' size={20} color={'rgba(0, 0, 0, 0.50)'} />
    //                             <Text style={{ marginLeft: 6, fontSize: 16, color: 'rgba(0, 0, 0, 0.75)' }}>{Moment(baiViet.thoiGian).format('MMM DD/YYYY')}</Text>
    //                         </View>

    //                     </View>
    //                 </View>
    //                 <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 5 }}
    //                     onPress={() => { alert('option') }}>
    //                     <Feather name='more-horizontal' size={30} />
    //                 </TouchableOpacity>

    //             </View>
    //             <TouchableOpacity activeOpacity={1} onPress={() => { props.nav.navigate('DetailItemPost', { row: baiViet }); }}>
    //                 <Text style={{ margin: 10, fontSize: 20 }}>{baiViet.noiDung}</Text>
    //                 <View>
    //                     <TouchableOpacity activeOpacity={0.6} onPress={() => { props.nav.navigate('DetailItemPost', { row: baiViet }); }}>
    //                         <AutoHeightImage source={{
    //                             uri: baiViet.anhBaiViet
    //                         }} width={Dimensions.get('window').width} />
    //                     </TouchableOpacity>
    //                 </View>
    //             </TouchableOpacity>
    //             <View style={styles.viewBelowPost}>
    //                 <View style={styles.viewRowCenterBetween}>
    //                     {
    //                         (myTuongTac == "Liked")
    //                             ?
    //                             <TouchableOpacity activeOpacity={0.6}>
    //                                 <Image source={require('../../assets/images/positive_color.png')}
    //                                     style={styles.buttonInteract} />
    //                             </TouchableOpacity>
    //                             :
    //                             <TouchableOpacity activeOpacity={0.6}>
    //                                 <Image source={require('../../assets/images/positive.png')}
    //                                     style={styles.buttonInteract} />
    //                             </TouchableOpacity>
    //                     }
    //                     <Text style={styles.textInteract}>{arr_dongTinh.length}</Text>
    //                     {
    //                         (myTuongTac == "Disliked")
    //                             ?
    //                             <TouchableOpacity activeOpacity={0.6}>
    //                                 <Image source={require('../../assets/images/negative_color.png')}
    //                                     style={styles.buttonInteract} />
    //                             </TouchableOpacity>
    //                             :
    //                             <TouchableOpacity activeOpacity={0.6}>
    //                                 <Image source={require('../../assets/images/negative.png')}
    //                                     style={styles.buttonInteract} />
    //                             </TouchableOpacity>
    //                     }
    //                     <Text style={styles.textInteract}>{arr_phanDoi.length}</Text>
    //                 </View>

    //                 <View style={styles.viewRowCenterBetween}>
    //                     <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6} onPress={() => { props.nav.navigate('DetailItemPost', { row: baiViet }); }}>
    //                         <Image source={require('../../assets/images/comment.png')} />
    //                     </TouchableHighlight>
    //                     <Text style={styles.textInteract}>{arr_binhLuan.length}</Text>
    //                     <Image source={require('../../assets/images/share.png')} />
    //                     <Text style={styles.textInteract}>{baiViet.soLuongChiaSe}</Text>
    //                 </View>
    //             </View>
    //             <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />

    //         </View>
    //     )
    // }

    return (

        <ScrollView
            nestedScrollEnabled={true}
            style={styles.container}
        >
            <View style={styles.viewNewPost}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity underlayColor={'#b0ebc1'} onPress={OpenAccount} activeOpacity={0.5} style={{ borderRadius: 50 }}>
                        <Image source={{
                            uri: String(infoLogin.anhDaiDien)
                        }} style={styles.imageAvatar} />

                    </TouchableOpacity>
                    <TouchableOpacity underlayColor={'#b0ebc1'} onPress={OpenNewPost} activeOpacity={0.5}>
                        <Text style={styles.textHint}>Bạn muốn nói gì ?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity underlayColor={'#b0ebc1'} onPress={PickingImage} activeOpacity={0.5} >
                    <Image source={require('../../assets/images/addImage.png')} style={{ width: 35, height: 35 }} />
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />

            {
                (isSelected == true)
                    ?
                    <View style={styles.viewOther}>
                        <AutoHeightImage source={require('../../assets/images/blogs.png')}
                            width={(Dimensions.get("window").width * 75) / 100} />
                        <Text style={styles.textHint}>Đang tải bài viết..</Text>
                    </View>
                    :
                    <ScrollView>
                        {
                            (arr_post.length > 0)
                                ? (
                                    // <ScrollView horizontal={true} style={{ width: "100%" }}>
                                    //     <FlatList
                                    //         data={arr_post}
                                    //         keyExtractor={(item) => { return item._id }}
                                    //         renderItem={ItemPost} />
                                    // </ScrollView>
                                    arr_post.map((post, index, arr) => {
                                        return <ItemPost post={post} key={index} nav={props.nav} />
                                    })
                                )
                                : (<View style={styles.viewNoPost}>
                                    <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                        width={(Dimensions.get("window").width * 75) / 100} />
                                    <Text style={styles.textHint}>Không có bài viết nào..</Text>
                                </View>)
                        }
                    </ScrollView>

            }
        </ScrollView>
    )
}
export default PostScreen;
