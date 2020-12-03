import React,{useEffect, useState} from 'react'
import {View, FlatList, Text, StyleSheet} from 'react-native'
import { ListItem,Avatar,Badge, } from 'react-native-elements'
import {theme} from '../../core/theme'
import qpointApi from '../../api/qpointApi'
import { abs } from 'react-native-reanimated'
import Leaderboard from 'react-native-leaderboard';

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
                // temp.imageUrl = item.profileImagePath
                temp.imageUrl = ''
                studentObj.push(temp)
            }
            studentObj.sort(function(a,b){
                return  b.totalBehaviourPoint - a.totalBehaviourPoint
            })
            setStudentsPoint(studentObj)
        }
        getStudentsPoint()
    },[])

    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            {studentsPoint ? 
                <View style={{flexDirection:'row', justifyContent:'space-between', padding:30}}>
                    {studentsPoint[1] ? 
                        <View style={{backgroundColor:'',marginTop:20, alignItems:'center'}}>
                            <Avatar
                                size = 'large'
                                rounded
                                source={require('../../assets/tracksuit_doge.jpg')} 
                            />
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.rankStyle}>2. {studentsPoint[1].name}</Text>
                            </View>
                            <Text style={styles.rankStyle}>{studentsPoint[1].totalBehaviourPoint}</Text>
                        </View>
                        :
                        <View style={{backgroundColor:'',marginTop:20}}>
                            <Avatar
                                size = 'large'
                                rounded
                                // source={require('../../assets/tracksuit_doge.jpg')} 
                            />
                        </View>
                    }
                    {studentsPoint[0] ?
                        <View style={{alignItems:"center"}}>
                            <Avatar
                                size = 'large'
                                rounded
                                source={require('../../assets/tracksuit_doge.jpg')} 
                            />
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.rankStyle}>1. {studentsPoint[0].name}</Text>
                            </View>
                            <Text style={styles.rankStyle}>{studentsPoint[0].totalBehaviourPoint}</Text>
                            {/* <Badge
                                status="success"
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                            /> */}
                        </View>
                        :
                        null
                    }
                    {studentsPoint[2] ? 
                        <View style={{backgroundColor:'',marginTop:20, alignItems:"center"}}>
                            <Avatar
                                size = 'large'
                                rounded
                                source={require('../../assets/tracksuit_doge.jpg')} 
                            />
                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.rankStyle}>3. {studentsPoint[2].name}</Text>
                            </View>
                            <Text style={styles.rankStyle}>{studentsPoint[2].totalBehaviourPoint}</Text>
                        </View>
                        :
                        <View style={{backgroundColor:'',marginTop:20}}>
                            <Avatar
                                size = 'large'
                                rounded
                                // source={require('../../assets/tracksuit_doge.jpg')} 
                            />
                        </View>
                    }
                </View>
                :
                null
            }
            
            <View style={{flex:1, backgroundColor:'white'}}>
                <Leaderboard
                    data = {studentsPoint}
                    sortBy = 'totalBehaviourPoint'
                    labelBy = 'name'
                    // icon =  "imageUrl"
                    // oddRowColor = {theme.colors.secondary}
                />
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    rankStyle: {
        fontSize: 17,
        marginRight: 5
    }
})

export default ClassLeaderboard