import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const PostScreen = () => {
    
    
        
       
    
    return (
        <View style={st.container}>
            <ScrollView >
                <View style={{ flexDirection: 'row',alignItems:'center', justifyContent: 'space-between', padding: 15 }}>
                    <View style={{flexDirection:'row', alignItems:"center"}}>
                       
                        <TouchableHighlight underlayColor={'#b0ebc1'} onPress={() => { }} activeOpacity={0.5}>
                            <Image source={require('../assets/home.png')}/>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={'#b0ebc1'} onPress={() => { }} activeOpacity={0.5}>
                            <Text style={{marginLeft:15,fontSize:16}}>Bạn đang nghĩ gì ?</Text>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight underlayColor={'#b0ebc1'} onPress={() => { }} activeOpacity={0.5}>
                        <Image source={require('../assets/addImage.png')} />
                    </TouchableHighlight>
                </View>

                <View style={{backgroundColor:'#D9D9D9',height:7}}/>
            </ScrollView>
        </View>

    )
}
export default PostScreen;

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',


        marginTop: 60
    }
})