import React,{useState,useEffect} from 'react'
import {View,StyleSheet,Dimensions,Vibration, ToastAndroid} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';
import qpointApi from '../../../api/qpointApi'
import { Card, ListItem, Icon, Header,Text,SearchBar,Button } from 'react-native-elements'
import {theme} from '../../../core/theme'

const ScanQrScreen = ({navigation}) => {

  const [student,setStudent] = useState([])
  const [allStudents,setAllStudents] = useState([])

  useEffect(() => {
    const getStudents = async () => {
      const response = await qpointApi.post('/student/show-all-students')
      setAllStudents(response.data)
    }
    const unsubscribe = navigation.addListener('blur', () => {
      setStudent([])
    });
    getStudents()
    return unsubscribe;
  }, [navigation]);

  const showErrorToast = () => {
    ToastAndroid.show("QR code not found. Please try again", ToastAndroid.LONG);
  };

  const showQRErrorToast = () => {
    ToastAndroid.show("Invalid QR code. Please try again", ToastAndroid.LONG);
  }
 
  
  // console.log(student)
  // console.log(allStudents)

  const onSuccess = (e) => {
    try{
      if(JSON.stringify(student).includes(e.data)){
        
      }else{
        setStudent([...student,JSON.parse(e.data)])
        Vibration.vibrate()
      }
    }catch (err){
      showQRErrorToast();
    }
  };

  const onPressed = () => {
    let verify = allStudents.filter((item) => student.find(ele => item.studentId === ele.studentId))
    if(!verify.length==0){
      navigation.navigate('SelectBehaviour',{student:verify})
    }
    else{
      showErrorToast();
    }
    
  } 

    return(
      <View style={{flex:1}}> 
        <Header
          centerComponent = {
            <Text style={{fontSize:20,color:'white'}}>Scan QR</Text>
          }
          rightComponent = {
            <Icon
              reverse
              reverseColor = {theme.colors.primary}
              color = 'white'
              size = {18}
              name = 'format-list-bulleted'
              type = 'material-community'
              onPress = {()=>navigation.navigate('SelectStudent')}
            />
          }
          containerStyle = {{height:90, backgroundColor:theme.colors.primary, borderBottomColor:'transparent'}}
        />
        <QRCodeScanner
          onRead = {onSuccess}
          cameraStyle = {styles.cameraContainer}
          topViewStyle = {styles.zeroContainer}
          reactivate = {true}
          reactivateTimeout = {3000}
          showMarker = {true}
          markerStyle = {{borderColor: 'white',bottom:50}}
          vibrate={false}
          bottomContent={
            <View style={{flex:1,justifyContent:'flex-end'}}>
              <Button  
                title='Select Behaviour'
                onPress={onPressed} 
                buttonStyle = {{backgroundColor:theme.colors.primary}}
                containerStyle = {{paddingBottom:30}}
              />
            </View>
          }
        />
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
   
});

export default ScanQrScreen;
