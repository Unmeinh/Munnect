import { View, Text, TextInput, TouchableOpacity } from "react-native"
import Feather from 'react-native-vector-icons/Feather';
import { useState } from "react";
import styles from '../../Styles/Setting/UpdateItemScreen.style'

const UpdateItemScreen = ({route, navigation}) => {
    const [valueOld, setvalueOld] = useState('');
    const [valueNew, setvalueNew] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.viewItemUpdate}>
                <Text style={styles.txtTitle}>{route.params.title1} cũ:</Text>
                <View style={styles.viewValue}>
                    <Feather name="chevron-right" size={22} />
                    <TextInput style={styles.txtValue} placeholder='Giá trị cũ' onChangeText={(txt) => { setvalueOld(txt) }} value={valueOld} />
                </View>

                <Text style={styles.txtTitle}>{route.params.title1} mới:</Text>
                <View style={styles.viewValue}>
                    <Feather name="chevron-right" size={22} />
                    <TextInput style={styles.txtValue} placeholder='Giá trị mới' onChangeText={(txt) => { setvalueNew(txt) }} value={valueNew} />
                </View>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.goBack();}}>
                    <Text style={styles.btnBack}>Quay lại</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 15 }} onPress={() => { }}>
                    <Text style={styles.btnUpdate}>Cập nhật</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default UpdateItemScreen;
