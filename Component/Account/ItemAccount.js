import {
    ScrollView,
    Text, Image,
    View, TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Account/ListAcc.styles';
import Moment from 'moment';

const ItemAccount = (row) => {
    var nguoiDung = row.nguoiDung;
    const [isFollowing, setisFollowing] = useState(true);
    Moment.locale('en');

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
                        {nguoiDung.tenTaiKhoan}
                    </Text>
                </TouchableHighlight>
                <View style={styles.viewInfoItem}>
                    <Image source={require('../../assets/images/location.png')} style={styles.imageInfoItem} />
                    <Text style={styles.infoText}>{String(nguoiDung.queQuan)}</Text>
                </View>
                <View style={styles.viewInfoItem}>
                    <Image source={require('../../assets/images/birthday-cake.png')} style={styles.imageInfoItem} />
                    <Text style={styles.infoText}>{Moment(nguoiDung.sinhNhat).format('MMM DD/YYYY')}</Text>
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

export default ItemAccount;