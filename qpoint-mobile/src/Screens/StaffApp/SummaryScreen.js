import React, {useContext} from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'
import { Button,ListItem } from 'react-native-elements'
import {Context as ProcessFlowContext} from '../../Context/ProcessFlowContext'
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const SummaryScreen = ({navigation}) => {
    // console.log(navigation.state)
    const behaviours = navigation.getParam('behaviourList')
    // console.log(behaviours)
    const behaviourList = behaviours.map(item => item.behaviourId)
    const behaviourPoints = behaviours.map(item => item.behaviourPoint)
    const totalPoints = behaviourPoints.reduce((a,b) => a + b, 0)
    // console.log(totalPoints)
    const behaviourNames = behaviours.map(item => item.behaviourName)
    // console.log(behaviourNames)
    // console.log(behaviourPoints)

    const students = navigation.getParam('studentList')
    // console.log(students)
    const studentNames = students.map(item => item.studentName)
    const studentList = students.map(item => item.studentId)

    const staffId = navigation.getParam('staffId')
    const {addBehaviours} = useContext(ProcessFlowContext)

    const summaryList = []
    for(var i=0;i<students.length;i++){
        const summary = {studentId: studentList[i],studentName: studentNames[i], behaviourName: behaviourNames, behaviourPoint: totalPoints}
        summaryList.push(summary)
        // console.log(summaryList)
    }
    // console.log('record',behaviourList,studentList,staffId)

    return(
        <View style={{ flex: 1 }}>
            <FlatList
                data = {summaryList}
                keyExtractor = {(item,studentId) => studentId.toString()}
                renderItem = {({item}) => {
                   return(
                    <ListItem
                        title = {item.studentName}
                        subtitle = {`${item.behaviourName}\n${item.behaviourPoint}`}
                        rightIcon = {
                            <TouchableOpacity
                                onPress = {() => navigation.navigate('SavePhoto')}
                            >
                                <AntDesign name="camera" size={24} color="black" />
                            </TouchableOpacity>
                        }
                    />
                   )
                }}
            />
            <Button
                title='proceed'
                buttonStyle = {{}}
                onPress = {() => {
                    addBehaviours(behaviourList,studentList,staffId)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
   
})

export default SummaryScreen