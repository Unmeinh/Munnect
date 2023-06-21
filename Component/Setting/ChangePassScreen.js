import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from '../../Styles/Setting/ChangePassScreen.style';
const ChangePassScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.txtTitle}>Mật khẩu cũ</Text>
            <TextInput style={styles.txtInput} placeholder="Nhập mật khẩu cũ của bạn" secureTextEntry={true}/>
            <Text style={styles.txtTitle}>Mật khẩu mới</Text>
            <TextInput style={styles.txtInput} placeholder="Nhập mật khẩu mới của bạn"  secureTextEntry={true}/>
            <Text style={styles.txtTitle}>Nhập lại mật khẩu mới</Text>
            <TextInput style={styles.txtInput} placeholder="Nhập lại mật khẩu mới của bạn"  secureTextEntry={true}/>
            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.btnChangePass} activeOpacity={0.6}>
                    <Text style={styles.txtChangePass}>Tiếp tục</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.btnBack}  activeOpacity={0.6}>
                    <Text style={styles.txtBack}>Quay lại</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ChangePassScreen;