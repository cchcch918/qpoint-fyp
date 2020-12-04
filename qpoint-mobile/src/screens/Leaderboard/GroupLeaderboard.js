import React, {useState, useEffect} from 'react'
import {View, FlatList, StyleSheet} from 'react-native'
import { ListItem, Icon, Header,Text,SearchBar,Button,Avatar,Image, } from 'react-native-elements'
import {theme} from '../../core/theme'
import DropDownPicker from 'react-native-dropdown-picker';
import qpointApi from '../../api/qpointApi'

const GroupLeaderboard = ({studentId}) => {
    // console.log(studentId)
    const [studentsPoint,setStudentsPoint] = useState(null)
    const [pickerData, setPickerData] = useState([])
    const [filteredGroups, setFilteredGroups] = useState([])
    useEffect(()=>{
        const getGroups = async () => {
            const response = await qpointApi.post('/group/show-all-groups')
            const groups = response.data
            const res = await qpointApi.post('/student/show-students-with-id',{studentList:[studentId]})
            let locatedGroupIds = []
            for(const item of res.data[0].groups){
                locatedGroupIds.push(item.groupId)
            }  
            const filteredGroups = groups.filter(item => locatedGroupIds.includes(item.groupId))
            setFilteredGroups(filteredGroups)

            let data = []
            for(const item of filteredGroups){
                let temp = {}
                temp.label = item.groupName
                temp.value = item.groupId
                data.push(temp)
            }
            setPickerData(data)
        }
        getGroups()
    },[])

    const getStudentsPoints = async (groupId) => {
        const filteredStudents = filteredGroups.filter(item => item.groupId == groupId)
        // console.log(filteredStudents[0].students)
        let studentList = []
        for(const student of filteredStudents[0].students){
            // studentList.push(student.studentId)
            studentList.push(student.studentId)
        }
        // console.log(studentList)
        const response = await qpointApi.post('student-behaviour-record/get-students-point/',{studentList})
        // console.log(response.data)
        let studentObj = []
            for(const item of response.data){
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
    
    let studentIndex = null;
    {studentsPoint ? studentIndex = studentsPoint.findIndex(rank => rank.studentId == studentId) : null}

    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            <View style={{margin:20}}>
                <DropDownPicker
                    items={pickerData}
                    // defaultValue = {selectedChild}
                    placeholder="Select Groups"
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
                        getStudentsPoints(item.value)
                    }}
                />
            </View>
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

export default GroupLeaderboard