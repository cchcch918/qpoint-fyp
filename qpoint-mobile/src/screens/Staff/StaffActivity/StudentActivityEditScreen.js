import React,{useLayoutEffect,useState, useEffect} from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity, Platform, } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';
import qpointApi from '../../../api/qpointApi'
import { ListItem,Header,Icon,SearchBar, Button, Tooltip } from 'react-native-elements'
import {theme} from '../../../core/theme'
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';

const StudentActivityEditScreen = ({route,navigation}) => {
    const [showAlert,setAlert] = useState(false)
    const {recordId} = route.params
    const {recordDetails} = route.params
    const [behaviour,setBehaviour] = useState([])
    const [selectedBehaviour,setSelectedBehaviour] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [imageUri,setImageUri] = useState(recordDetails.imageUri)
    // console.log(imageUri)
    // console.log(recordDetails.imageUri)

    // console.log(recordDetails)
    useEffect(() => {
      if (route.params?.imageUri) {
        // console.log('true')
        const imageUri = route.params.imageUri
        // console.log(imageUri)
        setImageUri(imageUri)
        
      }
      
      const getBehaviour = async () => {
        const response = await qpointApi.post('/behaviour/show-all-behaviours')
        setBehaviour(response.data)
      }

      getBehaviour()
    },[route.params?.imageUri])

    const updateRecord = async () => {
      const response = await qpointApi.post('/student-behaviour-record/update-student-behaviour-records',{recordId,behaviourId:selectedBehaviour,imageUri})
      console.log(response.data)
      navigation.goBack()
    }

    const deleteRecord = async () => {
      const response = await qpointApi.post('/student-behaviour-record/delete-student-behaviour-records',{recordList:[recordId]})
      console.log(response.data)
    }

    const deleteImage = () => {
      setImageUri(null)
    }

    const data = []
    
    for(const item of behaviour){
      let temp = {}
      temp.label = item.behaviourName
      temp.value = item.behaviourId
      data.push(temp)
    }
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
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
              <Text style = {{fontSize: 20,color:'white'}}>Edit Details</Text>
            }
            rightComponent = {
              <Icon 
                name="trash-can"
                type = 'material-community'
                size = {20} 
                style = {{marginRight: 15}} 
                onPress = {()=>setAlert(true)}
                reverse
                reverseColor = {theme.colors.primary}
                color = 'white'
              />
            }
            containerStyle = {{height:100, backgroundColor:theme.colors.primary}}
          />


          <View style = {styles.borderStyle}>
            <View style={styles.rowStyle}>
                <Icon name='content-paste' containerStyle = {styles.iconStyle}/>
                <Text style={styles.textStyle}>{recordDetails.behaviourName}</Text>
            </View>
            <View style={styles.rowStyle}>
                <Icon name='account' type = 'material-community' containerStyle = {styles.iconStyle}/>
                <Text style={styles.textStyle}>{recordDetails.fullName}</Text>
            </View>
            <View style={styles.rowStyle}>
                <Icon name='google-classroom' type = 'material-community' containerStyle = {styles.iconStyle}/>
                <Text style={styles.textStyle}>{recordDetails.className }</Text>
            </View>
            <View style={styles.rowStyle}>
                <Icon name='calendar-range' type = 'material-community' containerStyle = {styles.iconStyle}/>
                <Text style={styles.textStyle}>{recordDetails.dateGiven}</Text>
            </View>
          </View>

          <View style={styles.dropdownView}>
            <Text style={{marginLeft:30, fontSize:15}}>Change Behaviour</Text>
            <RNPickerSelect
              placeholder = {
              {label:'Select Behaviour',value:null,color: '#9EA0A4'}
              }
              items = {data}
              onValueChange = {value => setSelectedBehaviour(value)}
              value = {selectedBehaviour}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          {imageUri ? 
          <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:20,borderRadius:20,elevation:2,marginTop:25,marginHorizontal:10,backgroundColor:''}}>
            <TouchableOpacity onPress = {()=>toggleModal()} style={{backgroundColor:''}}>
              <Image
                source = {{uri:imageUri, isStatic:true}}
                style = {{width:100,height:100}}
              />
              <Text style={{width:100,fontSize:13,color:'grey'}}>View full image</Text>
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'center'}}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon
                      name = 'camera'
                      type = 'material-community'
                      reverse
                      reverseColor = {theme.colors.primary}
                      color = 'white'
                      containerStyle = {{backgroundColor:theme.colors.primary}}
                      size = {30}
                      onPress = {()=>navigation.navigate('ChangePhoto')}
                />
                <Text>Change Photo</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon 
                    name="trash-can"
                    type = 'material-community'
                    reverse
                    reverseColor = {theme.colors.primary}
                    color = 'white'
                    containerStyle = {{backgroundColor:theme.colors.primary}}
                    size = {30}
                    onPress = {()=>deleteImage()}
                />
                <Text>
                  Delete Photo
                </Text>
              </View>
            </View>
            <Modal
              isVisible={isModalVisible}
              onBackdropPress={() => setModalVisible(false)}
              style = {{margin:0}}
              onSwipeComplete={() => setModalVisible(false)}
              swipeDirection="right"
            >
              <View style={styles.imageContainer}>
                <Image
                  source = {{uri:imageUri}}
                  style = {styles.image}
                />
              </View>
            </Modal>
          </View>
          
          :
          <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:20,borderRadius:20,elevation:2,marginTop:25,marginHorizontal:10,backgroundColor:''}}>
            
            <View style={{flex:1,alignItems:'center'}}>
              <View style={{alignItems:'center',padding:15}}>
                <Icon
                      name = 'camera'
                      type = 'material-community'
                      reverse
                      reverseColor = {theme.colors.primary}
                      color = 'white'
                      containerStyle = {{backgroundColor:theme.colors.primary}}
                      size = {30}
                      onPress = {()=>navigation.navigate('ChangePhoto')}
                />
                <Text>Add Photo</Text>
              </View>
            </View>
            
          </View>
          }

        
            
          
          
          <View style={{flex:1,justifyContent:'flex-end'}}>
            <Button
              title = 'Edit'
              buttonStyle = {{backgroundColor:theme.colors.primary}}
              containerStyle = {{borderRadius:10,margin:5}}
              onPress = {()=>updateRecord()}
              
            />
          </View>

          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Delete All?"
            message="Once you delete the record, you can't undo it."
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, delete it"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
                setAlert(false)
              }}
            onConfirmPressed={() => {
              setAlert(false)
              deleteRecord()
              setTimeout(()=>{
                navigation.goBack()
              },100)
            }}
          />  
        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    margin:20,
    width:180
  },
});

const styles = StyleSheet.create({
  borderStyle:{
    marginTop:20,
    margin:10,
    borderRadius:20,
    elevation: 2,
  },
  dropdownView:{
    height:80,
    flexDirection:'row',
    alignItems:'center',
    marginTop:15,
    marginHorizontal:10,
    borderRadius:20,
    // backgroundColor: 'white',
    elevation: 2,
    // position:'absolute',
    // left:0,
    // top:300,
    // right:0,
    // bottom:0,
    // zIndex:0
  },
  textStyle: {
    fontSize: 15,
    justifyContent: 'flex-end'
  },
  rowStyle: {
    flexDirection:'row',
    // marginLeft:10,
    // paddingLeft:30,
    paddingVertical:10,
    marginHorizontal:30
    // justifyContent:'space-evenly'
  },
  iconStyle:{
    marginRight:20
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  }
})

export default StudentActivityEditScreen;