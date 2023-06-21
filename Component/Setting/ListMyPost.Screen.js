import { Dimensions, FlatList, Image, ScrollView, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemPost from "../Posts/ItemPost";
import styles from '../../Styles/Account/AccScreen.styles'
import AutoHeightImage from "react-native-auto-height-image";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Moment from 'moment';

const ListMyPost = (route) => {
    const [arr_post, setarr_post] = useState({});
    const [isSelected, setisSelected] = useState(true);
    const [infoLogin, setinfoLogin] = useState(route.infoLogin);
    const [isRefresh, setisRefresh] = useState(true);

    const GetListPost = async () => {
        try {
            const loginId = await AsyncStorage.getItem("idLogin");
            const response = await fetch(
                'https://backend-munnect.herokuapp.com/BaiViet/DanhSach?idNguoiDung=' + loginId,
            );
            const json = await response.json();
            setarr_post(json.data.listBaiViet);
            setisSelected(false);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        if (route.refreshing == false) {
            if (route.selected == true) {
                console.log("select");
                setinfoLogin(route.infoLogin);
                GetListPost();

            }
            setisRefresh(false);
        } else {
            console.log("refresh");
            setinfoLogin(route.infoLogin);
            setisRefresh(true);
            GetListPost();
        }
    }, [route.refreshing]);

    function OpenViewAccount() {
        if (row.info != undefined) {
            if (nguoiDung._id != row.info._id) {
                row.nav.navigate('ViewAccount', { infoAcc: nguoiDung });
            } else {
                row.openAcc();
            }
        }
    }
    const ItemMyPost = (row) => {

        return (
            <View style={{ borderColor: '#000000', borderWidth: 1, borderRadius: 20, padding: 20 }}>
                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width * 85 / 100 }}>
                    <TouchableOpacity onPress={OpenViewAccount}>
                        <Image source={{ uri: row.item.idNguoiDung.anhDaiDien }}
                            style={{ width: 50, height: 50, borderRadius: 50 }} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 7 }}>
                        <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6}
                            onPress={OpenViewAccount}>
                            <Text style={styles.textName} numberOfLines={2}>
                                {row.item.idNguoiDung.tenTaiKhoan}
                            </Text>
                        </TouchableHighlight>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <EvilIcons name='clock' size={20} color={'rgba(0, 0, 0, 0.50)'} />
                            <Text style={{ color: 'rgba(0, 0, 0, 0.75)' }}>{Moment(row.item.thoiGian).format('MMM DD/YYYY')}</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={{
                        margin: 10, fontSize: 20,
                        fontFamily: (String(row.item.phongChu) == 'Default') ? "" : String(row.item.phongChu)
                    }} numberOfLines={2}>
                        {row.item.noiDung}</Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                        <AutoHeightImage source={{ uri: row.item.anhBaiViet }}
                            width={Dimensions.get('window').width * 85 / 100} />
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'space-around' ,marginTop:10}}>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row' ,alignItems:'center'}}>
                            <Image source={require('../../assets/images/iconEditPost.png')} style={{width:30}}/>
                            <Text style={{fontSize:20,marginLeft:5}}>Sửa bài viết</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row',alignItems:'center' }}>
                            <Image source={require('../../assets/images/iconDelPost.png')}  style={{width:30}} />
                            <Text  style={{fontSize:20, marginLeft:5}}>Sửa bài viết</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 30 }}>



            {
                (isSelected == true)
                    ?
                    <View style={styles.viewOther}>
                        <AutoHeightImage source={require('../../assets/images/blogs.png')}
                            width={(Dimensions.get("window").width * 75) / 100} />
                        <Text style={styles.textHint}>Đang tải bài viết..</Text>
                    </View>
                    :
                    <View>
                        {
                            (arr_post.length > 0)
                                ?
                                // arr_post.map((post, index, arr) => {
                                //     return <ItemPost post={post} key={index} nav={route.nav} isRefresh={isRefresh} />
                                // })
                                <ScrollView horizontal={true} style={{width:'100%'}}>
                                    <FlatList data={arr_post} keyExtractor={(item) => { return item._id }} renderItem={ItemMyPost} isRefresh={isRefresh} />
                                </ScrollView>

                                :
                                <View style={styles.viewOther}>
                                    <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                        width={(Dimensions.get("window").width * 75) / 100} />
                                    <Text style={styles.textHint}>Không có bài viết nào..</Text>
                                </View>
                        }
                    </View>
            }

        </View>
    )
}
export default ListMyPost;