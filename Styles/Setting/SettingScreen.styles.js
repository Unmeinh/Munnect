import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;

export default StyleSheet.create({
    container: {
        flex: 1,
        height: WindowHeight - 75,
        justifyContent: 'space-between'
    },

    viewAccount: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        margin: 10
    },

    viewItemSetting: {
        flexDirection: 'row',
        alignItems: "center",
        margin: 15
    },

    txtItemSetting: {
        marginLeft: 30,
        fontSize: 19
    },

    topLine: {
        borderTopWidth: 1,
        borderTopColor: '#C0C0C0'
    },

    bottomLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#C0C0C0'
    },

    viewBottom: {
        // position:'absolute',
        // bottom:0,

        width: '100%'
    }
});
