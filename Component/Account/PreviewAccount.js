import {
    Text, View,
    Dimensions,
    Image, ScrollView,
    TouchableOpacity,
} from "react-native"
import React, { useState, useLayoutEffect } from "react";
import styles from '../../Styles/Account/AccScreen.styles';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AutoHeightImage from "react-native-auto-height-image";

const PreviewAccount = ({ route, navigation }) => {
    const [infoLogin, setinfoLogin] = useState(route.params.infoLogin);
    const [pickedAvatar, setpickedAvatar] = useState("");
    const [pickedWallpaper, setpickedWallpaper] = useState("");

    const GetInfoLogin = async () => {
        try {
            const response = await fetch(
                'https://backend-mob104.herokuapp.com/listBaiViet',
            );
            const json = await response.json();
            setinfoLogin(json.data.listBaiViet[1].idNguoiDung);
            console.log(infoLogin);
        } catch (error) {
            console.error(error);
        }
    }

    const PickingImage = async (type) => {
        let result;
        console.log(type);
        if (type == 'imageWallpaper') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [2, 1],
                quality: 1,
            });
        }
        if (type == 'imageAvatar') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [1, 1],
                allowsEditing: true,
                quality: 1,
            });
        }

        if (!result.canceled) {
            let imageUri = result.assets[0].uri;
            let fileType = imageUri.substring(imageUri.lastIndexOf(".") + 1);

            FileSystem.readAsStringAsync(imageUri, { encoding: "base64" }).then(
                (res) => {
                    let uriBase64 = "data:image/" + fileType + ";base64," + res;
                    if (type == 'imageWallpaper') {
                        setpickedWallpaper(uriBase64);
                    }
                    if (type == 'imageAvatar') {
                        setpickedAvatar(uriBase64);
                    }
                }
            );
        }
    };

    function saveImage() {
        alert('ya');
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={saveImage}>
                    <Text style={{ fontSize: 21, color: '#148A4F' }}>Lưu</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            GetInfoLogin();
            if (route.params.typePicked == 'avatar') {
                setpickedAvatar(route.params.picked);
                setpickedWallpaper(infoLogin.anhBia);
            } else {
                setpickedWallpaper(route.params.picked);
                setpickedAvatar(infoLogin.anhDaiDien);
            }
        });

        return unsub;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 20 }}>
                    <View>
                        {
                            (pickedWallpaper == "")
                                ?
                                <Image source={require('../../assets/images/upload-image-ui.png')}
                                    style={styles.imageWallpapar} />
                                :
                                <Image source={{ uri: String(pickedWallpaper) }}
                                    style={styles.imageWallpapar} />
                        }
                        <TouchableOpacity onPress={() => PickingImage('imageWallpaper')} activeOpacity={0.5}
                            style={[styles.buttonPickImage, { right: 5, top: 5 }]}>
                            <MaterialIcons name="camera-alt" size={20} />
                        </TouchableOpacity>
                        <View style={styles.viewAvatar}>
                            <View>
                                {
                                    (pickedAvatar == "")
                                        ?
                                        <Image source={require('../../assets/images/upload-image-ui.png')}
                                            style={styles.imageAvatar} />
                                        :
                                        <Image source={{ uri: String(pickedAvatar) }}
                                            style={styles.imageAvatar} />
                                }
                                <TouchableOpacity onPress={() => PickingImage('imageAvatar')} activeOpacity={0.5}
                                    style={[styles.buttonPickImage, { right: 2, bottom: 2 }]}>
                                    <MaterialIcons name="camera-alt" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* View thông tin */}
                    <View>
                        <Text style={styles.textName} numberOfLines={2}>
                            {String(infoLogin.hoTen)}
                        </Text>
                        <View style={styles.viewInfo}>
                            <View>
                                <View style={styles.viewInfoItem}>
                                    <Entypo name="location" size={17} color={'background: rgba(0, 0, 0, 0.6);'} />
                                    <Text style={styles.infoText}>{String(infoLogin.queQuan)}</Text>
                                </View>
                                <View style={styles.viewInfoItem}>
                                    <Image source={require('../../assets/images/birthday-cake.png')} style={styles.imageInfoItem} />
                                    <Text style={styles.infoText}>{String(infoLogin.sinhNhat)}</Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.viewInfoItem}>
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{infoLogin.arr_TheoDoi.length}</Text>
                                    <Text style={styles.infoText}>Đang theo dõi</Text>
                                </View>
                                <View style={styles.viewInfoItem}>
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{infoLogin.arr_NguoiTheoDoi.length}</Text>
                                    <Text style={styles.infoText}>Người theo dõi</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.viewIntro}>
                            <Text style={styles.textTitle}>
                                Giới thiệu
                            </Text>
                            <Text style={styles.textIntro}>
                                {String(infoLogin.gioiThieu)}
                            </Text>
                        </View>
                    </View>

                    {/* View bài viết */}
                    <View style={styles.container}>
                        <Text style={styles.textTitle}>
                            Bài viết
                        </Text>
                        <View style={styles.viewNewPost}>
                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                {
                                    (pickedAvatar == "")
                                        ?
                                        <Image source={require('../../assets/images/upload-image-ui.png')}
                                            style={styles.imageAvatarNP} />
                                        :
                                        <Image source={{ uri: String(pickedAvatar) }}
                                            style={styles.imageAvatarNP} />
                                }
                                <Text style={styles.textHint}>Bạn muốn nói gì?</Text>
                            </View>
                            <Image source={require('../../assets/images/addImage.png')}
                                style={{ width: 35, height: 35 }} />
                        </View>

                        <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />
                        <View style={styles.viewOther}>
                            <AutoHeightImage source={require('../../assets/images/blogs.png')}
                                width={(Dimensions.get("window").width * 75) / 100} />
                            <Text style={styles.textHint}>Đang tải bài viết..</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default PreviewAccount;