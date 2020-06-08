import React, {useContext} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { Button } from 'react-native-elements'
import {Context as ProcessFlowContext} from '../../Context/ProcessFlowContext'

const SummaryScreen = ({navigation}) => {
    
    const behaviourList = navigation.getParam('behaviourList')
    const students = navigation.getParam('studentList')
    const studentList = students.map(item => item.studentId)
    const staffId = navigation.getParam('staffId')
    const {addBehaviours} = useContext(ProcessFlowContext)

    // console.log('record',behaviourList,studentList,staffId)

    return(
        <View>
            <Text>SummaryScreen</Text>
            <Button
                title='proceed'
                onPress = {() => {
                    addBehaviours(behaviourList,studentList,staffId)
                }}
            />
        </View>
    )
}

export default SummaryScreen