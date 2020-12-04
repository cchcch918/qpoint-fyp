import React, {useState, useEffect} from 'react'
import {View, FlatList, StyleSheet} from 'react-native'
import { ListItem, Icon, Header,Text,SearchBar,Button,Avatar,Image, } from 'react-native-elements'
import {theme} from '../../core/theme'
import DropDownPicker from 'react-native-dropdown-picker';
import qpointApi from '../../api/qpointApi'

const GroupLeaderboard = ({studentId}) => {
    // console.log(studentId)
    const [studentsPoint,setStudentsPoint] = useState(null)
    const [pickerData,setPickerData] = useState(null)

    useEffect(()=>{
        const getStudentsPoint = async () => {
            const response = await qpointApi.post('/group/show-all-groups')
            const groups = response.data

            const locatedGroups = groups.filter(obj => {
                return obj.students.filter(student => student.studentId == studentId)
            })
            console.log(locatedGroups)
        }
        getStudentsPoint()
    })


    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            {/* <View style={{margin:20}}>
                <DropDownPicker
                    items={data}
                    defaultValue = {selectedChild}
                    placeholder="Select Child"
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    labelStyle={{
                        fontSize: 15,
                        textAlign: 'left',
                        color: '#000'
                    }}
                    placeholderStyle = {{color:'grey'}}
                    dropDownMaxHeight = {200}
                    containerStyle={{height: 40}}
                    style={{ backgroundColor: '#ffffff' }}
                    dropDownStyle={{ backgroundColor: 'white' }}
                    onChangeItem = {item => {
                        getChild(item.value)
                        setSelectedChild(item.value)
                    }}
                />
            </View> */}
        </View>
    )
}

export default GroupLeaderboard