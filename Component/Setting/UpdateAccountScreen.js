const { View, Text, Image, TouchableOpacity } = require("react-native")
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Styles/Setting/UpdateAccountScreen.style'
const UpdateAccountScreen = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.viewItemName} onPress={()=>{props.navigation.navigate('UpdateItemScreen',{title:'tên'})}}>
                    <View style={styles.viewItemName1}>
                        <Image style={{tintColor:'#52524f'}} source={require('../../assets/images/updateName.png')} />
                        <View style={styles.viewTxt}>
                            <Text style={styles.txtTile}>Tên tài khoản</Text>
                            <Text style={styles.txtValue}>ten</Text>
                        </View>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={40}/>
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItemName}  onPress={()=>{props.navigation.navigate('UpdateItemScreen',{title:'email'})}}>
                    <View style={styles.viewItemName1}>
                        <Image source={require('../../assets/images/updateEmail.png')} />
                        <View style={styles.viewTxt}>
                            <Text style={styles.txtTile}>Email</Text>
                            <Text style={styles.txtValue}>email</Text>
                        </View>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={40}/>
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItemName}  onPress={()=>{props.navigation.navigate('UpdateItemScreen',{title:'SĐT'})}}>
                    <View style={styles.viewItemName1}>
                        <Image source={require('../../assets/images/updatePhone.png')} />
                        <View style={styles.viewTxt}>
                            <Text style={styles.txtTile}>Số điện thoại</Text>
                            <Text style={styles.txtValue}>chưa có</Text>
                        </View>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={40}/>
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItemName}  onPress={()=>{props.navigation.navigate('UpdateItemScreen',{title:'giới thiệu'})}}>
                    <View style={styles.viewItemName1}>
                        <Image source={require('../../assets/images/updateDesc.png')} />
                        <View style={styles.viewTxt}>
                            <Text style={styles.txtTile}>Giới thiệu</Text>
                            <Text style={styles.txtValue}>chưa có</Text>
                        </View>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={40}/>
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItemName}  onPress={()=>{props.navigation.navigate('UpdateItemScreen',{title:'ngày sinh'})}}>
                    <View style={styles.viewItemName1}>
                        <Image source={require('../../assets/images/updateDate.png')} />
                        <View style={styles.viewTxt}>
                            <Text style={styles.txtTile}>Sinh nhật</Text>
                            <Text style={styles.txtValue}>chưa có</Text>
                        </View>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={40}/>
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

            <TouchableOpacity style={styles.viewItemName}  onPress={()=>{props.navigation.navigate('UpdateItemScreen',{title:'quê quán'})}}>
                    <View style={styles.viewItemName1}>
                        <Image style={{tintColor:'#52524f'}} source={require('../../assets/images/updateLocation.png')} />
                        <View style={styles.viewTxt}>
                            <Text style={styles.txtTile}>Quê quán</Text>
                            <Text style={styles.txtValue}>chưa có</Text>
                        </View>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={40}/>
            </TouchableOpacity>

            <View style={{ height: 1, backgroundColor: '#c9c4c3' }} />

        </View>
    )
}
export default UpdateAccountScreen;