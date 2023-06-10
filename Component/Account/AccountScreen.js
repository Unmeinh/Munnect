import { Button, Text, View } from "react-native"

const AccountScreen = (props) => {
    return (
        <View>
            <Text>
                Màn tài khoản
            </Text>
            <Button title='bài mới' onPress={() => { props.navigation.navigate('NewPost'); }}/>
            <Button title='home' onPress={() => { props.navigation.navigate('PostScreen'); }}/>
        </View>
    )
}
export default AccountScreen;