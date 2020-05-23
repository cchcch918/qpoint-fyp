import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet,Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationEvents } from 'react-navigation';
import { Camera } from 'expo-camera';
import { showMessage, hideMessage } from "react-native-flash-message";

const QrScanner = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFocused,setIsFocused] = useState(true)
  const [student,setStudent] = useState([])

  // const onBarCodeScanned = async ({ type, data }) => {
  //   if(student.indexOf(data) == -1){
  //     setStudent([...student,data])
  //     showMessage({
  //       message: `${data} has been recorded`,
  //       type: "info",
  //     });
  //   } else {
  //     console.log('exist')
  //   }
    
  // }

  const onBarCodeScanned = async ({ type, data }) => {
    if(student.indexOf(data) == -1){
      setStudent([...student,data])
      showMessage({
        message: `${data[0]} has been recorded`,
        type: "info",
      });
    } else {
      console.log('exist')
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
      />
      <Button
        title = "Select Task"
        
        onPress = {() => navigation.navigate('Behavior',student)}
      />
      
    </View>
    )
  }
}

// const QrScanner = ({navigation}) => {
//   const [hasPermission, setHasPermission] = useState('');
//   const [scanned, setScanned] = useState(false);
//   const [student,setStudent] = useState([])
  
//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   },);



//   const onBarCodeScanned = async ({ type, data }) => {
//       setScanned('true')
//       setStudent([...student,data])
//     }

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

 

//   return (
//     <View
//       style={{flex: 1}}>
//       <NavigationEvents onDidBlur={() => {
//         setScanned(false)
//         setStudent([])
//         }} /> 
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined :onBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
      
//       <Button
//         title = "Select Task"
//         onPress = {() => navigation.navigate('Behavior',student)}
//       />
//       {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
//     </View>
//   )

// }


const styles = StyleSheet.create({
  
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