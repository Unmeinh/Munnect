import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FFFFFF',
        marginTop:StatusBar.currentHeight 
        
    },
    viewTitle:{
        flexDirection: 'row',
         margin: 15,
          alignItems: 'center' 
    },
    txtTitle:{
        marginLeft: 10,
         fontSize: 19
    },
    viewDetailPost:{
        margin: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    
    viewBelowPost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    viewRowCenterBetween: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

    buttonInteract: {
        width: 30,
        height: 30,
        margin: 5,
    },

    textInteract: {
        fontSize: 20,
        margin: 3
    }
});
