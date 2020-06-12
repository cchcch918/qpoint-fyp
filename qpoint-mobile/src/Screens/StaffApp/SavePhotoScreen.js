import React, {useContext,useEffect,useState} from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import {Context as ProcessFlowContext} from '../../Context/ProcessFlowContext'
import {Context as AuthContext} from '../../Context/AuthContext'
import {NavigationEvents} from 'react-navigation'
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons'; 

const SavePhotoScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if(Camera) {
            const options = {quality: 1, base64: true}
            const data = await camera.takePictureAsync(options)
            console.log(data)
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return(
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type}>
            <View style={stlyes.button}>
                <TouchableOpacity
                    onPress = {() => takePicture()}
                >
                    <Entypo name="circle" size={60} color="rgba(224, 224, 224, 1)" />
                </TouchableOpacity>
            </View>
            </Camera>
        </View>
    )
}

const stlyes = StyleSheet.create({
    button:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50
      },
})

export default SavePhotoScreen;