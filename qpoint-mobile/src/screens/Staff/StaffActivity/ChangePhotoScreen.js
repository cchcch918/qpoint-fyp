import React,{useState,useEffect} from 'react'
import {View,StyleSheet,TouchableOpacity,Linking, Dimensions,Image} from 'react-native'
import { Card, ListItem, Icon, Header,Text,SearchBar } from 'react-native-elements'
import {theme} from '../../../core/theme'
import { RNCamera } from 'react-native-camera';

const ChangePhotoScreen = ({navigation,route}) => {
    let camera;
    const takePicture = async () => {
        try {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            navigation.navigate('StudentActivityEdit',{imageUri:data.uri})
            // console.log(data.uri, '<<<<<<<<<<<<<<<<<<<<<');
        } catch (error) {
            console.log(error, "ERROR <<<<<<<<<<<<<")
        }
    };

    

    return(
        <View style={{flex:1}}> 
            <Header
            leftComponent = {
                <Icon
                    name = 'arrow-left'
                    type = 'material-community'
                    size = {30}
                    iconStyle = {{color:'white'}}
                    onPress = {()=> navigation.goBack() }
                />
                }
            centerComponent = {
                <Text style={{fontSize:20,color:'white'}}>Take Photo</Text>
            }
            containerStyle = {{height:90, backgroundColor:theme.colors.primary, borderBottomColor:'transparent'}}
            />
            <View style={styles.container}>
            <RNCamera
                ref={ref => (camera = ref)}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
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

export default ChangePhotoScreen