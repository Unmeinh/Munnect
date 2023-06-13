import {
    Image, Text,
    TouchableOpacity,
    TouchableHighlight,
    View, Dimensions,
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Posts/PostScreen.styles';
import Moment from 'moment';

import AutoHeightImage from 'react-native-auto-height-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

const ItemPost = (row) => {
    var baiViet = row.post;
    var nguoiDung = baiViet.idNguoiDung;
    const [myTuongTac, setmyTuongTac] = useState('none');
    const [isGetInteract, setisGetInteract] = useState(true);
    var arr_dongTinh = [];
    var arr_phanDoi = [];
    Moment.locale('en');
    var arr_dongTinh = baiViet.arr_dongTinh;
    var arr_phanDoi = baiViet.arr_phanDoi;
    var arr_binhLuan = baiViet.arr_binhLuan;

    const GetInteract = async () => {
        try {
            const response = await fetch(
                // 'https://backend-munnect.herokuapp.com/NguoiDung/DanhSach?inputID='+loginId,
                'http://192.168.191.7:3000/BaiViet/TuongTac?idNguoiDung=' + nguoiDung._id + '&&idBaiViet=' + baiViet._id,
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
                'http://192.168.191.7:3000/BaiViet/TuongTac/TuongTacMoi?idNguoiDung=' + nguoiDung._id + '&&idBaiViet=' + baiViet._id + '&&tuongTac=' + type,
            );
            row.refreshList();
            const json = await response.json();
            setmyTuongTac(json.data.tuongTac);
            console.log(json.data.tuongTac);
        } catch (error) {
            console.log("Set");
            console.error(error);
        }
    }

    const DetailPost = () => { console.log(row); };

    function OpenViewAccount() {
        if (row.info != undefined) {
            if (nguoiDung._id != row.info._id) {
                row.nav.navigate('ViewAccount', { infoAcc: nguoiDung, });
            } else {
                row.openAcc();
            }
        }
    }

    React.useEffect(() => {
        if (isGetInteract == true) {
            console.log("Get");
            GetInteract();
        }
    }, [isGetInteract]);

    return (
        <View>
            <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
                <TouchableOpacity activeOpacity={0.5} style={styles.buttonMore}
                    onPress={() => { alert('option') }}>
                    <Feather name='more-horizontal' size={30} />
                </TouchableOpacity>
            </View>

            <Text style={{
                margin: 10, fontSize: 20,
                fontFamily: (String(baiViet.phongChu) == 'Default') ? "" : String(baiViet.phongChu)
            }}>
                {baiViet.noiDung}</Text>

            <TouchableOpacity activeOpacity={0.6}>
                <AutoHeightImage source={{ uri: baiViet.anhBaiViet }}
                    width={Dimensions.get('window').width} />
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

export default ItemPost;