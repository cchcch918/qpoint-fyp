import React, { useContext,useState,useEffect } from 'react';
import { Text, View,FlatList,TouchableOpacity} from 'react-native';
import {Context as ProcessFlowContext} from '../../Context/ProcessFlowContext'
import {NavigationEvents} from 'react-navigation'
import RNPickerSelect from 'react-native-picker-select';

const SelectStudent = ({navigation}) => {
    const {state, fetchClasses} = useContext(ProcessFlowContext);
    const staffId = navigation.getParam('staffId')
    const [classes,setClasses] = useState([])
    
    const classList = state.filter(item => item.teachers.find(teacher => teacher.staffId == staffId))
    
    let classOption = []

    for (var i=0;i<classList.length;i++){
        let classObject = {}
        classObject.label = classList[i].className
        classObject.value = classList[i].classId
        classOption.push(classObject)
    }

    console.log(classOption)

    // const classOption = {label: classList.map(item => item.className), value: classList.map(item => item.classId) }
    // console.log(classOption)
    

    // useEffect(() => {
        
        
    //     // console.log(classList)
    // },[])
    
   
    return(
        <View>
            <NavigationEvents onWillFocus={fetchClasses}/>
            <RNPickerSelect
                    onValueChange = {(value) => setClasses(value)}
                    placeholder = {
                        {label:'Select login as'}
                    }
                    items = {classOption}
            />
            
        </View>
    )
}

SelectStudent.navigationOptions = {
    title: 'Select Students',
    headerStyle: {
        backgroundColor: '#ffe6cc',
        
      },
    
      headerTitleAlign: 'center'
        
}

export default SelectStudent;