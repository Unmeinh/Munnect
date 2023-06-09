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
    var myTuongTac = "";
    var arr_dongTinh = [];
    var arr_phanDoi = [];
    var arr_tuongTac = baiViet.arr_tuongTac;
    Moment.locale('en');
    // var arr_dongTinh = baiViet.arr_dongTinh;
    // var arr_phanDoi = baiViet.arr_phanDoi;
    var arr_binhLuan = baiViet.arr_binhLuan;

    arr_tuongTac.map((tt, index, arr) => {
        if (tt.idNguoiDung._id == nguoiDung._id) {
            myTuongTac = tt.trangThai;
        }
    })

    const DetailPost = () => { console.log(row); };

    function OpenViewAccount() {
        row.nav.navigate('ViewAccount', { infoAcc: nguoiDung, });
    }

    return (
        <View>
            <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 85 / 100 }}>
                    <Image source={{
                        uri: nguoiDung.anhDaiDien
                    }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    <View style={{ marginLeft: 7 }}>
                        <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6}
                            onPress={OpenViewAccount}>
                            <Text style={styles.textName} numberOfLines={2}>
                                {nguoiDung.hoTen} 
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

export default ItemPost;