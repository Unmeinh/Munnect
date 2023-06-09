import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../Styles/HomeScreen.styles';

const DynamicHeader = (route) => {

    return (
        <View style={styles.viewHeader}>
            <View style={styles.topHome} >
                <Text style={styles.txtLogo}>MUNNECT</Text>

                <TouchableOpacity underlayColor={'#b0ebc1'} onPress={() => { console.log(); }} activeOpacity={0.5}>
                    <Image source={require('../assets/images/iconSearch.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.viewNavi} >
                <TouchableOpacity onPress={() => {route.settabNum(0);}}>
                    <Image style={{
                        width: 30,
                        height: 30,
                        tintColor: (route.tabNum == 0) ? '#00BD5F' : 'rgba(0, 0, 0, 0.7)',
                    }}
                        source={require('../assets/images/home.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {route.settabNum(1);}}>
                    <Image style={{
                        width: 30,
                        height: 30,
                        tintColor: (route.tabNum == 1) ? '#00BD5F' : 'rgba(0, 0, 0, 0.7)',
                    }}
                        source={require('../assets/images/account.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {route.settabNum(2);}}>
                    <Image style={{
                        width: 27,
                        height: 30,
                        tintColor: (route.tabNum == 2) ? '#00BD5F' : 'rgba(0, 0, 0, 0.7)',
                    }}
                        source={require('../assets/images/notify.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {route.settabNum(3);}}>
                    <Image style={{
                        width: 27,
                        height: 27,
                        tintColor: (route.tabNum == 3) ? '#00BD5F' : 'rgba(0, 0, 0, 0.7)',
                    }}
                        source={require('../assets/images/align.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default DynamicHeader;