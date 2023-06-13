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
const ItemPost = (row)=>{
    var baiViet = row.post;
    var nguoiDung = baiViet.idNguoiDung;
    var myTuongTac = "";
    var arr_dongTinh = [];
    var arr_phanDoi = [];
    Moment.locale('en');
    var arr_dongTinh = baiViet.arr_dongTinh;
    var arr_phanDoi = baiViet.arr_phanDoi;
    var arr_binhLuan = baiViet.arr_binhLuan;

    // arr_tuongTac.map((tt, index, arr) => {
    //     if (tt.idNguoiDung._id == nguoiDung._id) {
    //         myTuongTac = tt.trangThai;
    //     }
    // })
    return (
        <View>
            <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { row.nav.navigate('ViewAccount', { infoAcc: nguoiDung }) }}>
                        <Image source={{
                            uri: baiViet.idNguoiDung.anhDaiDien
                        }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    </TouchableOpacity>

                    <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { row.nav.navigate('ViewAccount', { infoAcc: nguoiDung, }) }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{baiViet.idNguoiDung.tenTaiKhoan}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <EvilIcons name='clock' size={20} color={'rgba(0, 0, 0, 0.50)'} />
                            <Text style={{ marginLeft: 6, fontSize: 16, color: 'rgba(0, 0, 0, 0.75)' }}>{Moment(baiViet.thoiGian).format('MMM DD/YYYY')}</Text>
                        </View>

                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 5 }}
                    onPress={() => { alert('option') }}>
                    <Feather name='more-horizontal' size={30} />
                </TouchableOpacity>

            </View>
            <TouchableOpacity activeOpacity={1} onPress={() => { row.nav.navigate('DetailItemPost', { row: baiViet }); }}>
                <Text style={{ margin: 10, fontSize: 20 }}>{baiViet.noiDung}</Text>
                <View>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => { row.nav.navigate('DetailItemPost', { row: baiViet }); }}>
                        <AutoHeightImage source={{
                            uri: baiViet.anhBaiViet
                        }} width={Dimensions.get('window').width} />
                    </TouchableOpacity>
                </View>
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
                    <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6} onPress={() => { row.nav.navigate('DetailItemPost', { row: baiViet }); }}>
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
export default ItemPost;