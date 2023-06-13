import { Dimensions, Image, ScrollView, StatusBar, Text, TouchableHighlight, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import React, { useState } from "react";
import AutoHeightImage from "react-native-auto-height-image";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Moment from "moment";
import styles from '../../Styles/Posts/ItemPost.styles'
const DetailPostScreen = (props) => {

    const [binhLuanMoi, setbinhLuanMoi] = useState('');

    var baiViet = props.route.params.row;
    var nguoiDung = baiViet.idNguoiDung;
    var myTuongTac = "";
    var arr_dongTinh = [];
    var arr_phanDoi = [];
    var arr_tuongTac = baiViet.arr_tuongTac;
    // var arr_dongTinh = baiViet.arr_dongTinh;
    // var arr_phanDoi = baiViet.arr_phanDoi;
    var arr_binhLuan = baiViet.arr_binhLuan;

    // arr_tuongTac.map((tt, index, arr) => {
    //     if (tt.idNguoiDung._id == nguoiDung._id) {
    //         myTuongTac = tt.trangThai;
    //     }
    // })

    function OpenViewAccount() {
        props.navigation.navigate('ViewAccount', { infoAcc: nguoiDung });
    }

    const ItemComment = (row) => {
        return (
            <View style={{ flex: 1, margin: 7 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{
                        uri: row.item.idNguoiDung.anhDaiDien
                    }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{row.item.idNguoiDung.gioiThieu}</Text>
                        <Text style={{ fontSize: 17 }}>{row.item.noiDung}</Text>
                    </View>

                </View>

            </View>
        )
    }

    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.viewTitle}>
                    <TouchableOpacity underlayColor={'#cbcdd1'} activeOpacity={0.6} onPress={() => { props.navigation.goBack() }}>
                        <Image source={require('../../assets/images/left_arrow.png')} />
                    </TouchableOpacity>
                    <Text style={styles.txtTitle}>Bài viết của {baiViet.idNguoiDung.tenTaiKhoan}</Text>
                </View>
                <View style={styles.viewDetailPost}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={OpenViewAccount}>
                            <Image source={{
                                uri: baiViet.idNguoiDung.anhDaiDien
                            }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        </TouchableOpacity>

                        <View style={{ marginLeft: 10 }}>
                            <TouchableOpacity onPress={OpenViewAccount}>
                                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{baiViet.idNguoiDung.tenTaiKhoan}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <EvilIcons name='clock' size={20} color={'rgba(0, 0, 0, 0.50)'} />
                                <Text style={{ marginLeft: 6, fontSize: 16 }}>{Moment(baiViet.thoiGian).format('MMM DD/YYYY')}</Text>
                            </View>

                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 5 }}
                        onPress={() => { alert('option') }}>
                        <Feather name='more-horizontal' size={30} />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity activeOpacity={1} >
                    <View>
                        <Text style={{
                            margin: 10, fontSize: 20,
                            fontFamily: (String(baiViet.phongChu) == 'Default') ? "" : String(baiViet.phongChu)
                        }}>
                            {baiViet.noiDung}</Text>

                        <TouchableOpacity activeOpacity={0.6}>
                            <AutoHeightImage source={{ uri: baiViet.anhBaiViet }}
                                width={Dimensions.get('window').width} />
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
                    <TouchableOpacity activeOpacity={1}>
                        <Image source={require('../../assets/images/comment.png')}
                            style={styles.buttonInteract} />
                    </TouchableOpacity>
                    <Text style={styles.textInteract}>{arr_binhLuan.length}</Text>
                    <TouchableOpacity activeOpacity={1}>
                        <Image source={require('../../assets/images/share.png')}
                            style={styles.buttonInteract} />
                    </TouchableOpacity>
                    <Text style={styles.textInteract}>{baiViet.soLuongChiaSe}</Text>
                </View>
                </View>
                <View style={{ backgroundColor: '#D9D9D9', height: 7 }} />

                <View>
                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                        <TextInput style={{ fontSize: 18, borderWidth: 1, borderColor: '#abd4bd', borderRadius: 5, width: '90%', padding: 7, margin: 5 }} placeholder="Viết bình luận" onChangeText={(txt) => { setbinhLuanMoi(txt) }} value={binhLuanMoi} />
                        <TouchableOpacity>
                            <Image source={require('../../assets/images/sendCmt.png')} style={{ width: 35, height: 35 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <Image source={require('../../assets/images/iconFillerComment.png')} />
                        <Text style={{ fontSize: 17, marginLeft: 10 }}>Bình luận: Tương tác nhiều nhất</Text>


                    </View>

                    {
                        <ScrollView horizontal={true} style={{ width: "100%" }}>
                            <FlatList data={baiViet.arr_binhLuan} keyExtractor={(item) => { return item._id }} renderItem={ItemComment} />
                        </ScrollView>

                    }

                </View>
            </ScrollView>
        </View>
    )
}
export default DetailPostScreen;