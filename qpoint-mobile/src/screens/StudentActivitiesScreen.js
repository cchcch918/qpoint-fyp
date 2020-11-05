import React,{useEffect,useState,useLayoutEffect} from 'react'
import {View,Text,FlatList,Button} from 'react-native'
import qpointApi from '../api/qpointApi'
import { ListItem,Icon } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { RangeCalendar } from '@ui-kitten/components';

const StudentActivitiesScreen = ({navigation,route}) => {
    const {studentId} = route.params
    const {studentName} = route.params
    const [studentRecords,setStudentRecords] = useState([])
    const [showAlert,setAlert] = useState(false)
    const [recordId,setRecordId] = useState([])
    const [range, setRange] = React.useState({});


    // console.log('studentId',studentId)
    // console.log(recordId)
    useEffect(()=>{
        const getStudentRecords = async () => {
            const response = await qpointApi.post('student-behaviour-record/get-student-behaviour-records',{studentId})
            // console.log(response.data)
            setStudentRecords(response.data)
            let allRecordsId = []
            // for(let i=0;i<response.data.length;i++){
            //     console.log(response.data[i].recordId)
            // }
            allRecordsId = response.data.map(item=>item.recordId)
            setRecordId(allRecordsId)
        }
        const unsubscribe = navigation.addListener('focus', () => {
            getStudentRecords()
          });
        
        return unsubscribe
    },[navigation])

    const filterRecords = () => {

    }

    //update delete multiple records api
    const deleteAllRecords = async () => {
        console.log(recordId)
        const response = await qpointApi.post('/student-behaviour-record/delete-student-behaviour-records',{recordId})
        console.log(response.data)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <MaterialCommunityIcons name="trash-can" 
                size = {30} 
                style = {{marginRight: 15}} 
                onPress = {()=>setAlert(true)} 
            />
          ),
          title: `${studentName}'s Activities`
          
        },);
      }, [navigation]);
    
    //add filter records function
      return(
        <View>
            <View>
               <Text>Filter</Text>
              
            </View>
            <FlatList
                data = {studentRecords}
                keyExtractor = {(item,studentId) => studentId.toString()}
                renderItem = {({item}) => {
                    return(
                        <ListItem
                        title={item.behaviour.behaviourName}
                        subtitle = {item.behaviour.dateCreated.substring(0, 10)}
                        rightTitle = {item.behaviour.behaviourPoint}
                        bottomDivider
                        onPress = {()=> navigation.navigate('StudentActivityEdit',{recordId: item.recordId})}
                        style = {{margin:1}}
                    />
                    )
                }}
            />
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Delete All?"
                message="Once you delete all records, you can't undo it."
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
                deleteAllRecords()
                setAlert(false)
                navigation.goBack()
                }}
            />
        </View>
    )
}



export default StudentActivitiesScreen