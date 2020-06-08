import React, {useContext,useEffect} from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import {Context as ProcessFlowContext} from '../../Context/ProcessFlowContext'
import {Context as AuthContext} from '../../Context/AuthContext'
import {NavigationEvents} from 'react-navigation'
import {ListItem} from 'react-native-elements'
import { Avatar } from 'react-native-elements';

const ChildrenDetails = ({navigation}) => {
    const {state,fetchBehaviourRecords} = useContext(ProcessFlowContext);
    const studentId = navigation.state.params.studentId
    const fullName = navigation.state.params.fullName

    useEffect(() => {
        fetchBehaviourRecords(studentId);
    },[])

    return (
        <View>
            <FlatList
                data = {state}
                keyExtractor = {(item,recordId) => recordId.toString()}
                renderItem = {({item}) => {
                    const d = new Date(item.dateGiven)
                    const date = d.getFullYear()+'-' + (d.getMonth()+1) + '-'+d.getDate()
                    // console.log(date)
                    return(
                        <ListItem
                            title = {item.behaviour.behaviourName}
                            subtitle = {date}
                            rightTitle = {`${item.behaviour.behaviourPoint} points`}
                        />

                    )
                }}
            />
            
        </View>
    )
}


ChildrenDetails.navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.fullName}'s Activities`,
    headerStyle: {
        backgroundColor: '#ffe6cc',
    }
})

const styles = StyleSheet.create({

})

export default ChildrenDetails