import React,{useState,useEffect} from 'react'
import {View,StyleSheet,TouchableOpacity,Linking, Dimensions,Image} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Button } from 'react-native-paper';
import qpointApi from '../api/qpointApi'
import { Card, ListItem, Icon, Header,Text,SearchBar } from 'react-native-elements'
import {theme} from '../core/theme'
import { RNCamera } from 'react-native-camera';

const TakePhotoScreen = ({navigation,route}) => {
    const {record} = route.params
    console.log(record)
    let camera;
    const takePicture = async () => {
        try {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            // CameraRoll.saveToCameraRoll(data.uri)
            // setImg(data.uri)
            record.imageUri = data.uri
            navigation.navigate('ConfirmBehaviour',{imageUri:record})
            console.log(data.uri, '<<<<<<<<<<<<<<<<<<<<<');
        } catch (error) {
            console.log(error, "ERROR <<<<<<<<<<<<<")
        }
    };

    // const [img,setImg] = useState('')

    return(
        <View style={{flex:1}}> 
            <Header
            leftComponent = {
                <Icon
                    name = 'arrow-left'
                    type = 'material-community'
                    size = {30}
                    iconStyle = {{color:theme.colors.secondary}}
                    onPress = {()=> navigation.goBack() }
                />
                }
            centerComponent = {
                <Text style={{fontSize:20,color:theme.colors.secondary}}>Take Photo</Text>
            }
            containerStyle = {{height:90, backgroundColor:theme.colors.primary, borderBottomColor:'transparent'}}
            />
            <View style={styles.container}>
            <RNCamera
                ref={ref => (camera = ref)}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel'
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
            <View style={{ flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0 }}>
                <TouchableOpacity style={styles.capture} onPress={()=>console.log(takePicture())}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
            </View>
        </View>


        </View>
    )
}


const styles = StyleSheet.create({
    zeroContainer: {
        height: 0,
        flex: 0,
    },
    cameraContainer: {
        height: Dimensions.get('window').height,
    },

    buttonText: {
      marginTop: 180
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },

});

export default TakePhotoScreen