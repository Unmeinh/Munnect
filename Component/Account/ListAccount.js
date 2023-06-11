import {
    ScrollView,
    Text, Image,
    View, TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import React, { useState, useCallback } from "react";
import styles from '../../Styles/Account/ListAcc.styles';
import ItemAccount from './ItemAccount';

const ListAccount = ({ route, navigation }) => {
    const [arr_follow, setarr_follow] = useState([]);
    const [infoAcc, setinfoAcc] = useState(route.params.infoAcc);

    const GetListFollow = async () => {
        try {
            const response = await fetch(
                'http://192.168.191.19:3000/NguoiDung/DanhSach',
            );
            //api gửi id người dùng lên -> lấy danh sách ng theo dõi -> trả về danh sách
            const json = await response.json();
            setarr_follow(json.data.listNguoiDung);
            console.log(arr_follow);
        } catch (error) {
            console.error(error);
        }
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
                            return <ItemAccount nguoiDung={nguoiDung} key={index} nav={navigation} />
                        })
                        : ""
                }
            </ScrollView>
        </View>
    );
}


export default ListAccount;