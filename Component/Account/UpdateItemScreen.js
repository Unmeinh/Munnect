import { View, Text, TextInput } from "react-native"
import { useState } from "react";
const UpdateItemScreen = (props) => {
    const [valueOld, setvalueOld] = useState('');
    const [valueNew, setvalueNew] = useState('');
    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <View style={{width:'90%'}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.route.params.title} cũ:</Text>
                <TextInput placeholder='giá trị cu' onChangeText={(txt) => { setvalueOld(txt) }} value={valueOld} />
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{props.route.params.title} mới:</Text>
                <TextInput placeholder='giá trị moi' onChangeText={(txt) => { setvalueNew(txt) }} value={valueNew} />
            </View>

        </View>
    )
}
export default UpdateItemScreen;
