import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import { NavigationContainer } from "@react-navigation/native";
import RegistScreen from "./RegistScreen";
import ForgetPassScreen from "./ForgetPassScreen";
const Tab = createBottomTabNavigator();
const HomeScreen = (props) => {
    return (
        // <View style={st.container}>
        //     <View style={st.topHome}>
        //         <Text style={st.txtLogo}>MUNNECT</Text>

        //         <Image source={require('../assets/iconSearch.png')} />


        //     </View>
        //     <NavigationContainer independent={true}>
                
        //     </NavigationContainer>

        // </View>
        <Tab.Navigator initialRouteName='SplashScreen' screenOptions={{ tabBarActiveTintColor: 'black', headerShown: false }}>
                    <Tab.Screen name="Home" component={RegistScreen} options={{

                        tabBarIcon: ({ color, size }) => <Icon size={size} color={color} name="home" />
                    }} />
                    
                    <Tab.Screen name="Settings" component={ForgetPassScreen} options={{

                        tabBarIcon: ({ color, size }) => <Icon size={size} color={color} name='cog' />
                    }} />
                    {/* <Tab.Screen name="Settings" component={Settings} options={{

                        tabBarIcon: ({ color, size }) => <Icon size={size} color={color} name='align-justify' />
                    }} /> */}
                </Tab.Navigator>
    )

}
export default HomeScreen;

const st = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        backgroundColor: 'white',

    },
    topHome: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    txtLogo: {
        color: '#00ff80',
        fontSize: 35,
        fontWeight: 'bold',
        width: 200,
        marginRight: 150
    }
})