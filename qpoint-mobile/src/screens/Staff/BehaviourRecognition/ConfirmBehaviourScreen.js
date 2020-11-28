import React,{useState,useEffect} from 'react'
import {View,FlatList,Image} from 'react-native'
import { Card, ListItem, Button, Icon, Header,Text,SearchBar } from 'react-native-elements'
import {theme} from '../../../core/theme'
import qpointApi from '../../../api/qpointApi'
import {useSelector} from 'react-redux'


const ConfirmBehaviourScreen = ({navigation,route}) => {
    const {record} = route.params  
    const [behaviourRecord,setBehaviourRecord] = useState([])
    const staffId = useSelector(state => state.authReducer.staffId)
    const [imageUri,setImageUri] = useState('')

    useEffect(()=>{
        if (route.params?.imageUri) {
            // console.log('true')
            const newbehaviourRecord = route.params.imageUri
            // console.log(newbehaviourRecord)
            for(const item of record){
                if(item.studentId === newbehaviourRecord.studentId && item.behaviourId === newbehaviourRecord.behaviourId){
                    item.imageUri = newbehaviourRecord.imageUri
                }
                // console.log('item ',item)
            }
          }
      
        const setBehaviourRecordObject = () => {
            // console.log('hi')
            // console.log(record)
            let records = []
            for(const item of record){
                let obj = {}
                if(item.imageUri){
                    obj.behaviourId = item.behaviourId
                    obj.studentId = item.studentId
                    obj.staffId = staffId
                    obj.imageUri = item.imageUri
                    records.push(obj)
                    setBehaviourRecord(records)
                }
                else{
                    obj.behaviourId = item.behaviourId
                    obj.studentId = item.studentId
                    obj.staffId = staffId
                    records.push(obj)
                    setBehaviourRecord(records)
                }
            }
        }
        setBehaviourRecordObject()
    },[route.params?.imageUri])
    
    // console.log(imageUri)
    // console.log('record ',record)

    const addBehaviour = async (item) => {
        const response = await qpointApi.post('/student-behaviour-record/add-behaviours-to-students',item)
        console.log(response.data)
    }
    
    const onButtonPressed = () => {
        for(const record of behaviourRecord){
           addBehaviour(record)
        }
        navigation.navigate('StaffHome')

    }
    console.log('behaviourerecord ',behaviourRecord)

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
                    <Text style={{fontSize:20,color:'white'}}>Confirm Behaviour</Text>
                }
               
                containerStyle = {{height:100, backgroundColor:theme.colors.primary}}
            />
            <FlatList
                data = {record}
                keyExtractor={(item, index) => index.toString()}
                renderItem = {({item}) => {
                    // console.log(item)
                    return(
                        <ListItem
                            leftElement = {() => (
                                <View>
                                    <View style={{flexDirection:'row',margin:5}}>
                                        <Icon name='account' type = 'material-community' containerStyle = {{marginRight:5}}/>
                                        <Text>{item.fullName}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',margin:5}}>
                                        <Icon name='google-classroom' type = 'material-community' containerStyle = {{marginRight:5}}/>
                                        <Text>{item.className }</Text>
                                    </View>
                                    <View style={{flexDirection:'row',margin:5}}>
                                        <Icon name='content-paste' containerStyle = {{marginRight:5}}/>
                                        <Text>{item.behaviour} </Text>
                                        <Text style={{color:'grey'}}> {item.behaviourPoint}</Text>
                                    </View>
                                    {item.imageUri?
                                    <View>
                                       
                                    </View> 
                                    :
                                    null
                                    }
                                </View>
                            )}
                             
                            rightElement = {()=>(
                                <View>
                                    {item.imageUri?
                                    <Image
                                        source ={{uri:item.imageUri ,isStatic:true}}
                                        style = {{width:100,height:100}}    
                                    />
                                    :
                                    <Icon
                                        name = 'camera'
                                        type = 'material-community'
                                        reverse
                                        reverseColor = {theme.colors.primary}
                                        color = 'white'
                                        containerStyle = {{backgroundColor:theme.colors.primary}}
                                        size = {30}
                                        onPress = {()=>navigation.navigate('TakePhoto',{
                                            record: {studentId:item.studentId,behaviourId:item.behaviourId,staffId}
                                        })}
                                    />
                                    }
                                </View>
                            )}

                                
                            
                            containerStyle = {{margin:10,borderRadius:20,shadowColor: "#000", elevation: 4, }}
                        />
                    )
                }}
            
            />
            <View style={{justifyContent:'flex-end',backgroundColor:'white'}}>
                <Button
                    title = 'Proceed'
                    buttonStyle = {{backgroundColor:theme.colors.primary}}
                    containerStyle = {{borderRadius:10,margin:5}}
                    onPress = {()=>onButtonPressed()}
                />
           </View>
            {/* <View style = {{flexDirection:'row',backgroundColor:'white',height:60}}>
                <Button
                    title = 'Proceed'
                    containerStyle = {{backgroundColor:'red',position:'absolute', left:310,top:10}}
                    buttonStyle = {{backgroundColor:theme.colors.primary}}
                    onPress = {()=>onButtonPressed()}
                />
            </View >*/}
        </View>
    )
}

export default ConfirmBehaviourScreen

