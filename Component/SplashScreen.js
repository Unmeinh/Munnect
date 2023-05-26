import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

import React from "react";
     
    
const SplashScreen = (props)=>{
    

    React.useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('LoginScreen');
        }, 2000);
      }, []);
    return(
        <View style={st.container}>
            <Image source={require('../assets/iconLogo.png')} style={st.iconLogo} />
            <Text style={st.nameApp}>MUNNECT</Text>
        </View>
    )
}
export default SplashScreen;

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
        color:'#FDFDFD',
        fontWeight:'bold',
        fontSize:48,
        marginBottom:40,
        
    }
});