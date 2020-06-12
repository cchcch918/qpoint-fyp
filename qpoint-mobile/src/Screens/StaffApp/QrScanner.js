import React, { useState, useEffect, useContext } from 'react';
import { Text, View,StyleSheet, Vibration,TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Camera } from 'expo-camera';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons'; 
import {Context as AuthContext} from '../../Context/AuthContext'

const QrScanner = ({navigation}) => {
  const {state} = useContext(AuthContext)
  const staffId = state.staffId
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFocused,setIsFocused] = useState(true)
  const [student,setStudent] = useState([])

  const onBarCodeScanned = async ({ type, data }) => {
    if(JSON.stringify(student).includes(data)){
      console.log('exist')
    } else {
      Vibration.vibrate()
      setStudent([...student,JSON.parse(data)])
      showMessage({
        message: `${JSON.parse(data).studentName} has been recorded`,
        type: "info",
      });
    }
  }
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if(isFocused === false){
    return (
      <NavigationEvents
        onWillFocus={payload => {
          //console.log("will focus", payload);
          setIsFocused(true)
        }}
        onDidBlur={payload => {
          //console.log('did leave',payload)
          setIsFocused(false)
        }}
      />
    )
  } else {
    return (
      <View style={{ flex: 1 }}>
          <NavigationEvents
            onWillFocus={() => {
                setIsFocused(true)
            }}
            onDidBlur={() => {
                setIsFocused(false)
                setStudent([])
            }}
          />
          <Camera 
            style={{ flex: 1 }} type={type}
            onBarCodeScanned = {onBarCodeScanned}
          >
            <View style = {styles.iconPosition}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ManualSelect',{staffId: staffId})}
                style = {styles.iconWrapper} 
              >
                <FontAwesome5
                  style = {{alignSelf: 'center', paddingLeft: 12}}
                  name="list-ul" 
                  size={24} 
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <Button
                title = "Select Task"
                titleStyle = {{
                  color: 'black'
                }}
                buttonStyle={{
                  backgroundColor: "#ffe6cc",
                }}
                onPress = {() => navigation.navigate('Behaviour',{student,staffId})}
              />
            </View>
          </Camera>
        
        
      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  },
  iconPosition: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingTop: 20
   },
   iconWrapper:{
    flexDirection: 'row',
    borderRadius: 100,
    // borderColor: 'black',
    // borderWidth: 2,
    width: 50,
    height: 50,
    backgroundColor: '#ffe6cc'
   }
})

export default QrScanner

{/* <View style={{ flex: 1 }}>
      <NavigationEvents
        onDidBlur = {() => {
          console.log('blur')
          
        }}
        onWillFocus = {() => {
          console.log('wil focus')
        }}
      />
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
         
        </View>
      </Camera>
    </View> */}