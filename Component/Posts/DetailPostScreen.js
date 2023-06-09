import { Dimensions, Image, ScrollView, StatusBar, Text, TouchableHighlight, View ,TouchableOpacity} from "react-native";
import React, { useState } from "react";
import AutoHeightImage from "react-native-auto-height-image";
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../Styles/Posts/DetailPostScreen.styles'
const DetailPostScreen = (props) => {
    var baiViet = props.route.params.row;
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
        <View style={styles.container}>
            
            <ScrollView>
                <View style={styles.viewTitle}>
                    <TouchableOpacity underlayColor={'#cbcdd1'} activeOpacity={0.6} onPress={() => {props.navigation.goBack() }}>
                        <Image source={require('../../assets/images/left_arrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.txtTitle}>Bài viết của {props.route.params.row.idNguoiDung.hoTen}</Text>
                </View>
                <View style={styles.viewDetailPost}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{
                            uri: props.route.params.row.idNguoiDung.anhDaiDien
                        }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>{props.route.params.row.idNguoiDung.hoTen}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/clock.png')} />
                                <Text style={{ marginLeft: 6 }}>{props.route.params.row.thoiGian}</Text>
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 5 }}
                        onPress={() => { alert('option') }}>
                        <Feather name='more-horizontal' size={30} />
                    </TouchableOpacity>

                </View>
                <Text style={{ margin: 10, fontSize: 20 }}>{props.route.params.row.noiDung}</Text>
                <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6} onPress={() => { }}>
                    <AutoHeightImage source={{
                        uri: props.route.params.row.anhBaiViet
                    }} width={Dimensions.get('window').width} />
                </TouchableHighlight>
                
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
                        <Text  style={styles.textInteract}>{arr_dongTinh.length}</Text>
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
                        <Image source={require('../../assets/images/comment.png')} />
                        <Text style={styles.textInteract}>{arr_binhLuan.length}</Text>
                        <Image source={require('../../assets/images/share.png')} />
                        <Text style={styles.textInteract}>{baiViet.soLuongChiaSe}</Text>
                        
                    </View>
                </View>
                <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />

                <View>
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../../assets/images/iconFillerComment.png')} />
                        <Text>Bình luận: Tương tác nhiều nhất</Text>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}
export default DetailPostScreen;