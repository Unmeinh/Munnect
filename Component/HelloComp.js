import React, { useState, useRef } from 'react';
import {
    Text, Image,
    View, 
} from 'react-native';
import styles from '../Styles/HelloComp.styles';

const HelloComp = (navigation) => {
    
    return (
        <View style={styles.backGround}>
            <Image source={require('../assets/images/global-network.png')}
                    style={styles.logoImage} />
            <Text style={styles.nameApp}>MUNNECT APP duy mai</Text>
        </View>
    );
} 

export default HelloComp;
