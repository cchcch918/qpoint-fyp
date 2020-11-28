import React,{useEffect, useState} from 'react'
import {View, FlatList} from 'react-native'
import { ListItem, Icon, Header,Text,SearchBar,Button,Avatar,Image, } from 'react-native-elements'
import {theme} from '../../core/theme'
import qpointApi from '../../api/qpointApi'

const ClassLeaderboard = ({classId}) => {
    // console.log('class leaderboard',classId)
    const [studentsPoint,setStudentsPoint] = useState(null)
    // console.log(studentsPoint)
    useEffect(()=>{
        const getStudentsPoint = async () => {
            const response = await qpointApi.post('/class/show-class-students',{classId})
            // console.log(response.data.students)
            const students = response.data.students
            let studentsId = students.map(item => item.studentId)
            // setStudentsId(studentsId)
            const res = await qpointApi.post('/student-behaviour-record/get-students-point',{studentList: studentsId})
            // console.log(res.data) 
            let studentObj = []
            for(const item of res.data){
                let temp = {}
                temp.name = item.fullName
                temp.totalBehaviourPoint = item.totalBehaviourPoint
                studentObj.push(temp)
            }
            setStudentsPoint(studentObj)
        }
        getStudentsPoint()
    },[])

    return(
        <View style={{flex:1}}>
            
            <View style={{backgroundColor:'white'}}>
                <Text>images</Text>
            </View>
            
            <View>
            <FlatList
                data = {studentsPoint}
                keyExtractor = {(item,index)=>index.toString()}
                renderItem = {({item}) => {
                    // console.log(item)
                    return(
                        <ListItem
                            title = {item.name}
                            subtitle = {(item.totalBehaviourPoint).toString()}
                            containerStyle = {{margin:10,borderRadius:20,shadowColor: "#000", elevation: 2, }}
                        />
                    )
                }}
            />
            </View>
        </View>
        
    )
}

export default ClassLeaderboard