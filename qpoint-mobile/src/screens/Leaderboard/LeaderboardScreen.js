import React,{useEffect,useState} from 'react'
import {View,StyleSheet} from 'react-native'
import { ListItem, Icon, Header,Text,SearchBar,Button,Avatar,Image, } from 'react-native-elements'
import {theme} from '../../core/theme'
import qpointApi from '../../api/qpointApi'

const LeaderboardScreen = ({navigation, route}) => {
    const {classId} = route.params
    const [studentsId, setStudentsId] = useState(null);
    const [studentsPoint,setStudentsPoint] = useState(null)
    // console.log('id',classId)

    useEffect(()=>{
        const getStudentsPoint = async () => {
            const response = await qpointApi.post('/class/show-class-students',{classId})
            // console.log(response.data.students)
            const students = response.data.students
            let studentsId = students.map(item => item.studentId)
            // setStudentsId(studentsId)
            const res = await qpointApi.post('/student-behaviour-record/get-students-point',{studentList: studentsId})
            // console.log(res.data) 
            setStudentsPoint(res.data)
        }
        getStudentsPoint()
    },[])

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
                    <Text style = {{fontSize: 20,color:'white'}}>Leaderboard</Text>
                }
                containerStyle = {{height:100, backgroundColor:theme.colors.primary}}
            />
        </View>
    )
}

export default LeaderboardScreen;