import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: '7%'
    },

    viewItemUpdate: {
        width: '85%',
        marginTop: 20
    },

    txtTitle: {
        fontSize: 24, fontWeight: 'bold'
    },

    viewValue: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },

    txtValue: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'white',
        padding: 2,
        width: '100%',
        borderBottomColor: 'gray',
        borderRadius: 10
    },

    viewButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: '7%'
    },

    btnBack: {
        backgroundColor: '#9b9e9b',
        color: 'white',
        borderRadius: 25,
        padding: 5,
        width: 120,
        textAlign: 'center',
        fontSize: 18,
        borderColor: 'black',
        borderWidth: 1
    },

    btnUpdate: {
        backgroundColor: '#00ff80', 
        color: 'black', 
        borderRadius: 25, 
        padding: 5, 
        width: 120, 
        textAlign: 'center',
        fontSize: 18, 
        borderColor: 'black', 
        borderWidth: 1

    }

});
