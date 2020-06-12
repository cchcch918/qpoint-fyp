import React, {useState, useContext} from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Context as ProcessFlowContext} from '../../Context/ProcessFlowContext'
import {NavigationEvents} from 'react-navigation'
import {Card,ListItem, Button } from 'react-native-elements'


          
const BehaviorScreen = ({navigation}) => {
    const {state, fetchBehaviours} = useContext(ProcessFlowContext)
    const staffId = navigation.getParam('staffId')
    const studentList = navigation.getParam('student')
    const [behaviourList, setBehaviourList] = useState([])

    return(
        <View style = {styles.container}>
            <NavigationEvents onWillFocus={fetchBehaviours}/>
            <FlatList
                data = {state}
                keyExtractor = { (item, behaviourId) => behaviourId.toString() }
                renderItem = {({item}) => {
                    return(
                        <TouchableOpacity
                            onPress = {() => {
                                setBehaviourList([...behaviourList, {behaviourName: item.behaviourName, behaviourId: item.behaviourId, behaviourPoint: item.behaviourPoint}])
                            }}
                        >
                            <Card title={item.behaviourName}>
                                <View >
                                    <Text>{`${item.behaviourPoint} points`}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                }}
            />
                <Button
                    style = {styles.button}
                    title='proceed'
                    onPress = {() => {
                        navigation.navigate('Summary',{behaviourList, studentList: studentList, staffId})
                    }}
                />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        // alignItems: 'center'
    },
    card: {
        // width: '100%' // is 50% of container width
    },
    button: {
        flex: 1
    }
})

export default BehaviorScreen;