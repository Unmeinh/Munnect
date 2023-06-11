import {
    Text, View,
    Dimensions,
    Image, ScrollView,
    TouchableOpacity,
    Animated,
} from "react-native"
import React, { useState, useEffect, useRef } from "react";
import styles from '../../Styles/Account/AccScreen.styles';
import Moment from 'moment';

import ItemPost from "../Posts/ItemPost";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AutoHeightImage from "react-native-auto-height-image";
import { RefreshControl } from "react-native-gesture-handler";

const ViewAccount = ({ route, navigation }) => {
    const [arr_post, setarr_post] = useState({});
    const [infoAcc, setinfoAcc] = useState(route.params.infoAcc);
    const [isReloading, setisReloading] = useState(false);
    const [isSelected, setisSelected] = useState(true);
    const [isFollowing, setisFollowing] = useState(true);
    const [offset, setoffset] = useState(0);
    const scrollRef = useRef(null);
    const startValue = useRef(new Animated.Value(0)).current;
    const duration = 150;
    Moment.locale('en');

    function OpenListAcc(type) {
        if (type == 'following') {
            navigation.navigate('ListAccount', { title: 'Đang theo dõi', infoAcc: infoAcc });
        } else {
            navigation.navigate('ListAccount', { title: 'Người theo dõi', infoAcc: infoAcc });
        }
    }

    const ReloadData = React.useCallback(() => {
        setisReloading(true);
        setinfoAcc(route.params.infoAcc);
        GetListPost();
        setTimeout(() => {
            setisReloading(false);
        }, 2000);
    }, []);

    const GetListPost = async () => {
        console.log(infoAcc._id);
        try {
            const response = await fetch(
                'http://192.168.191.19:3000/BaiViet/DanhSach?idNguoiDung=' + infoAcc._id,
            );
            const json = await response.json();
            setarr_post(json.data.listBaiViet);
            setisSelected(false);
            console.log(json.data.listBaiViet.length);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            setinfoAcc(route.params.infoAcc);
            GetListPost();
        });

        return unsub;
    }, [navigation]);

    const GoToTop = () => {
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        });
    }

    const onScrollView = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const dif = currentOffset - (offset || 0);

        if (Math.abs(dif) < 3) {
            console.log('unclear');
        } else if (dif < 0) {
            console.log('up');
            Animated.timing(startValue, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
            }).start();
        } else {
            console.log('down');
            Animated.timing(startValue, {
                toValue: 90,
                duration: duration,
                useNativeDriver: true,
            }).start();
        }

        setoffset(currentOffset);
    };

    return (
        <View style={styles.containerVA}>
            <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}
                onScroll={onScrollView}
                refreshControl={
                    <RefreshControl refreshing={isReloading} onRefresh={ReloadData} />
                }>
                <View>
                    <View>
                        <Image source={{ uri: String(infoAcc.anhBia) }}
                            style={styles.imageWallpapar} />
                        <View style={styles.viewAvatar}>
                            <View>
                                <Image source={{ uri: String(infoAcc.anhDaiDien) }}
                                    style={styles.imageAvatar} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}
                            style={[styles.buttonPickImage, { left: 5, top: 5 }]}>
                            <MaterialIcons name="arrow-back" size={22} />
                        </TouchableOpacity>

                    </View>

                    {/* View thông tin */}
                    <View>
                        <Text style={styles.textNameVA} numberOfLines={2}>
                            {String(infoAcc.tenTaiKhoan)}
                        </Text>
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
                        <View style={styles.viewInfo}>
                            <View>
                                <View style={styles.viewInfoItem}>
                                    <Entypo name="location" size={17} color={'background: rgba(0, 0, 0, 0.6);'} />
                                    <Text style={styles.infoText}>{String(infoAcc.queQuan)}</Text>
                                </View>
                                <View style={styles.viewInfoItem}>
                                    <Image source={require('../../assets/images/birthday-cake.png')} style={styles.imageInfoItem} />
                                    <Text style={styles.infoText}>{Moment(infoAcc.sinhNhat).format('MMM DD/YYYY')}</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.viewInfoItem} onPress={() => OpenListAcc('following')}>
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{infoAcc.arr_TheoDoi.length}</Text>
                                    <Text style={styles.infoText}>Đang theo dõi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewInfoItem} onPress={() => OpenListAcc('follower')}>
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{infoAcc.arr_NguoiTheoDoi.length}</Text>
                                    <Text style={styles.infoText}>Người theo dõi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewIntro}>
                            <Text style={styles.textTitle}>
                                Giới thiệu
                            </Text>
                            <Text style={styles.textIntro}>
                                {String(infoAcc.gioiThieu)}
                            </Text>
                        </View>
                    </View>

                    {/* View bài viết */}
                    <View style={styles.container}>
                        <Text style={styles.textTitle}>
                            Bài viết
                        </Text>

                        <View style={{ backgroundColor: '#D9D9D9', height: 7, marginTop: 10 }} />
                        {
                            (isSelected == true)
                                ?
                                <View style={styles.viewOther}>
                                    <AutoHeightImage source={require('../../assets/images/blogs.png')}
                                        width={(Dimensions.get("window").width * 75) / 100} />
                                    <Text style={styles.textHint}>Đang tải bài viết..</Text>
                                </View>
                                :
                                <ScrollView>
                                    {
                                        (arr_post.length > 0)
                                            ?
                                            arr_post.map((post, index, arr) => {
                                                return <ItemPost post={post} key={index} nav={navigation} />
                                            })
                                            :
                                            <View style={styles.viewOther}>
                                                <AutoHeightImage source={require('../../assets/images/no_post.png')}
                                                    width={(Dimensions.get("window").width * 75) / 100} />
                                                <Text style={styles.textHint}>Không có bài viết nào..</Text>
                                            </View>
                                    }
                                </ScrollView>
                        }
                    </View>
                </View>
            </ScrollView>

            <Animated.View style={{
                transform: [
                    {
                        translateY: startValue,
                    },],
            }}>
                <TouchableOpacity onPress={GoToTop} style={styles.floatButtonUp}>
                    <Entypo name="arrow-up" size={45} />
                </TouchableOpacity>
            </Animated.View>

        </View>
    )
}

export default ViewAccount;