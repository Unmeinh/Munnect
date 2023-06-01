import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

import React,{useState,useCallback} from "react";

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();    
    
const SplashMunnectScreen = (props)=>{

    React.useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('LoginScreen');
        }, 2000);
      }, []);
     
    return(
        <View style={st.container} >
            <Image source={require('../assets/images/iconLogo.png')} style={st.iconLogo} />
            <Text style={st.nameApp}>MUNNECT</Text>
        </View>
    )
}
export default SplashMunnectScreen;

const st = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#00ff80',
        marginTop:StatusBar.currentHeight,
        alignItems:'center',
        justifyContent:'center'
    },
    iconLogo:{
        marginBottom:30
    },
    nameApp:{
        fontFamily:'Aclonica',
        color:'#FDFDFD',
        fontSize:48,
        marginBottom:40 
    }
});