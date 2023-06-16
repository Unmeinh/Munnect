import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
       
    },
    viewItemName:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        margin: 15
    },
    viewItemName1:{
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    
    viewTxt:{
        marginLeft: 10
    },
    txtTile:{
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    txtValue:{
        fontSize: 17, 
        marginLeft: 15
    }
});
