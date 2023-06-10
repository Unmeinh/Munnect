import {
    ScrollView,
    Text, Image,
    View, TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Account/ListAcc.styles';
import Moment from 'moment';

import Entypo from 'react-native-vector-icons/Entypo';

const ListAccount = ({ route, navigation }) => {
    const [arr_follow, setarr_follow] = useState([]);
    const [infoAcc, setinfoAcc] = useState(route.params.infoAcc);
    Moment.locale('en');

    const GetListFollow = async () => {
        try {
            const response = await fetch(
                'https://backend-mob104.herokuapp.com/listBaiViet',
            );
            //api gửi id người dùng lên -> lấy danh sách ng theo dõi -> trả về danh sách
            const json = await response.json();
            if (json.data.listBaiViet.length > 0) {
                for (let i = 0; i < json.data.listBaiViet.length; i++) {
                    arr_follow.push(json.data.listBaiViet[i].idNguoiDung);
                    setarr_follow(arr_follow);
                }
            }
            console.log(arr_follow);
        } catch (error) {
            console.error(error);
        }
    }

    const ItemAcc = (row) => {
        var nguoiDung = row.nguoiDung;
        const [isFollowing, setisFollowing] = useState(true);

        function OpenViewAccount() {
            row.nav.navigate('ViewAccount', { infoAcc: nguoiDung, });
        }

        return (
            <View style={styles.viewRowCenter}>
                <TouchableOpacity onPress={OpenViewAccount}>
                    <Image source={{ uri: String(nguoiDung.anhDaiDien) }} style={styles.avatar} />
                </TouchableOpacity>
                <View>
                    <TouchableHighlight underlayColor={'#e1e6e4'} activeOpacity={0.6}
                        onPress={OpenViewAccount}>
                        <Text style={styles.textName} numberOfLines={2}>
                            {nguoiDung.hoTen}
                        </Text>
                    </TouchableHighlight>
                    <View style={styles.viewInfoItem}>
                        <Image source={require('../../assets/images/location.png')} style={styles.imageInfoItem} />
                        <Text style={styles.infoText}>{String(nguoiDung.queQuan)}</Text>
                    </View>
                    <View style={styles.viewInfoItem}>
                        <Image source={require('../../assets/images/birthday-cake.png')} style={styles.imageInfoItem} />
                        <Text style={styles.infoText}>{Moment(nguoiDung.ngaySinh).format('MMM DD/YYYY')}</Text>
                    </View>
                </View>
                {
                    (isFollowing == false)
                        ?
                        <TouchableOpacity style={styles.buttonFollowing} onPress={() => setisFollowing(true)}>
                            <Text style={{ fontSize: 16, color: '#0C7F45', fontWeight: '500' }}>Theo dõi</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.buttonFollow} onPress={() => setisFollowing(false)}>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>Đã theo dõi</Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            GetListFollow();
        });

        return unsub;
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                {
                    (arr_follow.length > 0)
                        ?
                        arr_follow.map((nguoiDung, index, arr) => {
                            return <ItemAcc nguoiDung={nguoiDung} key={index} nav={navigation} />
                        })
                        : ""
                }
            </ScrollView>
        </View>
    );
}


export default ListAccount;