import React,{useEffect, useState} from 'react'
import {View, FlatList, Text, StyleSheet} from 'react-native'
import { ListItem,Avatar,Badge, } from 'react-native-elements'
import {theme} from '../../core/theme'
import qpointApi from '../../api/qpointApi'

const ClassLeaderboard = ({classId, studentId}) => {
    // console.log('class leaderboard',classId)
    // console.log(studentId)
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
                temp.studentId = item.studentId
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

    let studentIndex = null;
    {studentsPoint ? studentIndex = studentsPoint.findIndex(rank => rank.studentId == studentId) : null}
    // console.log(studentIndex)

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
            <FlatList
                    data = {studentsPoint}
                    keyExtractor = {(item,index)=>index.toString()}
                    renderItem = {({item,index}) => {
                        // console.log(item)
                        return(
                            <ListItem
                                leftElement = {() => (
                                    <Text
                                        style = {{fontSize:17, fontWeight:'bold',}}
                                    >
                                        {parseInt(index) + 1}
                                    </Text>
                                )}
                                // title = {(index+1).toString()}
                                title = {item.name}
                                titleStyle = {{fontSize:17,}}
                                topDivider = {true}
                                bottomDivider = {true}
                                rightTitle = {(item.totalBehaviourPoint).toString()}
                                rightTitleStyle = {{fontSize:20,fontWeight:"bold", color:'black'}}
                                containerStyle = {{backgroundColor: index == studentIndex ? theme.colors.secondary : index % 2 === 0 ? 'white' : '#f2f5f7'}}
                            />
                        )
                    }}
                />
                {/* <Leaderboard
                    data = {studentsPoint}
                    sortBy = 'totalBehaviourPoint'
                    labelBy = 'name'
                    // icon =  "imageUrl"
                    // oddRowColor = {theme.colors.secondary}
                /> */}
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