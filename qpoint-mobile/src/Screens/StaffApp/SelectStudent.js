import React, { useContext,useState,useEffect } from 'react';
import { Text, View,FlatList,TouchableOpacity,StyleSheet} from 'react-native';
import {Context as ProcessFlowContext} from '../../Context/ProcessFlowContext'
import {NavigationEvents} from 'react-navigation'
import RNPickerSelect from 'react-native-picker-select';
import {ListItem, Button } from 'react-native-elements'

const SelectStudent = ({navigation}) => {
    const {state, fetchClasses} = useContext(ProcessFlowContext);
    const staffId = navigation.getParam('staffId')
    const [classes,setClasses] = useState('')
    const [students,setStudents] = useState([])
    const [studentList,setStudentList] = useState([])
    const [check,setCheck] = useState([])

    const classList = state.filter(item => item.teachers.find(teacher => teacher.staffId == staffId))
    console.log('classlist ',classList)


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
        // console.log('studentarray', studentArray)
        setStudentList(studentArray)
    }
    
    const checked = (item) => {
        if(!check.includes(item)){
            setCheck([...check, item])
        }
        else{
            setCheck(check.filter(a => a !== item))
        }
    }

    return(
        <View style={{ flex: 1 }}>
            <NavigationEvents onWillFocus={fetchClasses}/>
            <RNPickerSelect
                    onValueChange = {(value) => {
                        setClasses(value)
                        getStudentList(value)
                    }}
                    placeholder = {
                        {label:'Select Class'}
                    }
                    items = {classOption}
            />
                
            {students 
            ? 
            <FlatList
                data = {studentList}
                keyExtractor = {(item,studentId) => studentId.toString()}
                renderItem = {({item}) => {
                    return(
                        <ListItem
                            checkBox= {{ 
                                onPress: () => {
                                    checked(item)
                                    setStudents([...students,{studentId: item.studentId, fullName: item.fullName}])
                                },
                                checked: check.includes(item)
                            }}
                            title={item.fullName}
                        
                        />
                    )
                }}
            />
            : 
            null}
            <View style={styles.button}>
              <Button
                title = "Select Task"
                titleStyle = {{
                  color: 'black'
                }}
                buttonStyle={{
                  backgroundColor: "#ffe6cc",
                }}
                
                onPress = {() => navigation.navigate('Behavior')}
              />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
})

SelectStudent.navigationOptions = {
    title: 'Select Students',
    headerStyle: {
        backgroundColor: '#ffe6cc',
        
      },
    
      headerTitleAlign: 'center'
        
}

export default SelectStudent;