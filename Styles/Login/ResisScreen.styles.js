import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ff80',
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        
    },
    
    container2: {
        backgroundColor: '#ffffff',
        height: 2000,
        width: 780,
        borderRadius: 380,
        position: 'absolute',
        bottom: 260,
        right: 0
    },

    nameRegist: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 30
       
    },

    txtIntro: {
        fontSize: 17
    },

    viewInput: {
        width: '85%',
        marginTop: 70
    },

    txtInput: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        backgroundColor: '#FFFFFF',
        fontSize: 18,
        margin: 15,
        borderRadius: 4,
        padding: 13,

    },

    btnRegist: {
        backgroundColor: '#FFDC00',
        width: '80%',
        borderRadius: 5,
        borderWidth: 3,
        borderColor: '#e4e86f',
        marginTop: 50
    },

    txtRegist: {
        padding: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#262625'
    },

    btnRegist: {
        backgroundColor: '#FFDC00',
        width: '80%',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        marginTop: 40
    },

    txtLogin: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 19,
        marginLeft: 15
    }
});
