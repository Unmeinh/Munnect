import {
    Text, Image,
    View, ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions, ToastAndroid
} from 'react-native';
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Posts/NewPost.styles';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import FontModal from './FontModal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AutoHeightImage from 'react-native-auto-height-image';

const NewPost = ({ route, navigation }) => {
    const [infoLogin, setinfoLogin] = useState(route.params.infoLogin);
    const [dataImage, setdataImage] = useState(route.params.pickedImage);
    const [ipImageUrl, setipImageUrl] = useState(route.params.pickedBase64);
    const [inputContent, setinputContent] = useState("");
    const [inputFont, setinputFont] = useState("Default");
    const [isShowModal, setisShowModal] = useState(false);

    function CheckValidate(newPost) {
        if (newPost.idNguoiDung == undefined) {
            return false;
        }

        if (newPost.noiDung == "") {
            alert('Bạn hãy nhập gì đó trước khi đăng nhé!')
            return false;
        }
    }

    const UploadPost = () => {
        let newPost = {
            idNguoiDung: infoLogin._id,
            noiDung: inputContent,
            phongChu: inputFont,
        };
        let url_api = 'http://192.168.11.104:3000/BaiViet/ThemBaiViet';

        if (CheckValidate(newPost) == false) {
            return;
        }
        let formData = new FormData();
        formData.append('idNguoiDung', infoLogin._id);
        formData.append('noiDung', inputContent);
        formData.append('phongChu', inputFont);
        formData.append('thoiGian', new Date().toDateString());
        formData.append('viTriBaiViet', "personal");
        formData.append('arr_binhLuan', {});
        formData.append('arr_dongTinh', {});
        formData.append('arr_phanDoi', {});
        formData.append('soLuongChiaSe', 0);
        formData.append('soLuongBaoCao', 0);

        if (dataImage != {} && ipImageUrl != "") {
            formData.append('anhBaiViet', dataImage);
        }

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
                    ToastAndroid.show('Đăng bài viết mới thành công!', ToastAndroid.SHORT);
                    navigation.goBack();
                } else {
                    ToastAndroid.show('Đăng bài viết mới thất bại!', ToastAndroid.SHORT);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const PickingImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [1, 1],
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
                    setipImageUrl(uriBase64);
                    setdataImage({ uri: fileUri, name: fileName, type: "multipart/form-data" });
                }
            );
        }
    };

    const RemoveImage = () => {
        setipImageUrl("");
        setdataImage({});
    }

    const ShowFontModal = () => {
        if (isShowModal == false) {
            setisShowModal(true);
        } else {
            setisShowModal(false);
        }
    }

    const CallBackFontModal = (pickedFont) => {
        setisShowModal(false);
        if (pickedFont != undefined) {
            setinputFont(pickedFont);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ padding: 15, marginTop: 15 }}>
                <View style={styles.viewRowCenterBetween}>
                    <View style={styles.viewRowCenter}>
                        <Image source={{ uri: String(infoLogin.anhDaiDien) }}
                            style={styles.imageAvatar} />
                        <View>
                            <Text style={styles.textName}>{infoLogin.tenTaiKhoan}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <EvilIcons name='clock' size={25} color={'rgba(0, 0, 0, 0.50)'} />
                                <Text style={{ color: 'rgba(0, 0, 0, 0.75)' }}>Ngay bây giờ</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonUpload} onPress={UploadPost}>
                        <View style={styles.viewRowCenter}>
                            <Text style={styles.textButtonUpload}>Đăng</Text>
                            <Feather name='send' size={22} style={styles.iconClock} />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            <ScrollView style={styles.viewContent} showsVerticalScrollIndicator={false}>
                {
                    (inputContent == "" && ipImageUrl != "")
                        ?
                        <View>
                            <TextInput style={[styles.textContent,
                            { fontFamily: (String(inputFont) == 'Default') ? "" : String(inputFont) }]}
                                multiline={true}
                                placeholder='Bức ảnh này có gì?' value={inputContent}
                                onChangeText={(input) => { setinputContent(input) }} />
                        </View>
                        :
                        <View>
                            <TextInput style={[styles.textContent,
                            { fontFamily: (String(inputFont) == 'Default') ? "" : String(inputFont) }]}
                                multiline={true}
                                placeholder='Bạn muốn nói gì?' value={inputContent}
                                onChangeText={(input) => { setinputContent(input) }} />
                        </View>
                }
                {
                    (ipImageUrl != "")
                        ?
                        <View style={{ marginBottom: 250 }}>
                            <AutoHeightImage source={{ uri: String(ipImageUrl) }}
                                width={Dimensions.get("window").width}>
                            </AutoHeightImage>
                            <View style={styles.viewButtonIC}>
                                <TouchableOpacity style={styles.buttonImageContent}
                                    onPress={RemoveImage}>
                                    <Feather name='x' size={19} style={styles.iconImageContent} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        : ""
                }
            </ScrollView>

            {/* Nav below */}
            <View style={styles.navBelow}>
                <TouchableOpacity style={styles.viewRowCenter} onPress={PickingImage}>
                    <Image source={require('../../assets/images/getPicture.png')} style={styles.imageInNavBelow} />
                    <Text style={styles.textInNavBelow}>Hình ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewRowCenter} onPress={ShowFontModal}>
                    <Image source={require('../../assets/images/getText.png')} style={styles.fontInNavBelow} />
                    <Text style={styles.textInNavBelow}>Phông chữ</Text>
                </TouchableOpacity>
            </View>

            <FontModal isShow={isShowModal} callBack={CallBackFontModal} font={inputFont} />
        </View>
    );
}


export default NewPost;