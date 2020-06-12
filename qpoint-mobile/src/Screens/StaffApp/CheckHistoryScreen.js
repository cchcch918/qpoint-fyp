import React, {useContext,useEffect, useState} from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import {Context as ProcessFlowContext} from '../../Context/ProcessFlowContext'
import {Context as AuthContext} from '../../Context/AuthContext'
import {NavigationEvents} from 'react-navigation'
import {ListItem,  Button} from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { Entypo } from '@expo/vector-icons'; 

const CheckHistoryScreen = ({navigation}) => {
    const {state, fetchClasses} = useContext(ProcessFlowContext)
    const {state:{staffId} } = useContext(AuthContext)
    const [studentList,setStudentList] = useState([])
    const classList = state.filter(item => item.teachers.find(teacher => teacher.staffId == staffId))

    useEffect(()=>{
        fetchClasses()
    },[])

    let classOption = []
    for (var i=0;i<classList.length;i++){
        let classObject = {}
        classObject.label = classList[i].className
        classObject.value = classList[i].classId
        classOption.push(classObject)
    }
    // console.log('classoption', classOption)

    const getStudentList = (value) => {
        const studentArray = classList.find(x => x.classId == value).students
        setStudentList(studentArray)
    }

    return(
        <View style={{ flex: 1 }}>
             <NavigationEvents
                onWillFocus={payload => {
                    // console.log("will focus", payload);
                    setIsFocused(true)
                }}
                onDidBlur={payload => {
                    // console.log('did leave',payload)
                    setIsFocused(false)
                }}
            />
            <RNPickerSelect
                    onValueChange = {(value) => {
                        if(value === null){
                            setStudentList(null)
                        } else {
                            getStudentList(value)
                        }  
                    }}
                    placeholder = {
                        {
                            label:'Select Class',
                            value: null
                        }
                    }
                    items = {classOption}
            />
                
            {studentList
            ? 
            <FlatList
                data = {studentList}
                keyExtractor = {(item,studentId) => studentId.toString()}
                renderItem = {({item}) => {
                    return(
                        <ListItem
                            title={item.fullName}
                            rightIcon = {
                                <TouchableOpacity>
                                    <Entypo name="edit" size={24} color="black" />
                                </TouchableOpacity>
                            }
                        />
                    )
                    
                }}
            />
            : 
            null}
        </View>
    )

    
}

const styles = StyleSheet.create({
   
})



export default CheckHistoryScreen;