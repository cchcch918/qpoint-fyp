import React, {useContext,useEffect} from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import {Context as ProcessFlowContext} from '../../Context/ProcessFlowContext'
import {Context as AuthContext} from '../../Context/AuthContext'
import {NavigationEvents} from 'react-navigation'
import {ListItem} from 'react-native-elements'


const ParentHome = ({navigation}) => {
    const {state: {children}, fetchParentDetails} = useContext(ProcessFlowContext)
    const {state: {email} } = useContext(AuthContext)
    console.log(children)

    // useEffect(() => {
    //     fetchParentDetails(email)
    // },[])
    
    return(
        <View style= {{flex: 1}}>
            <NavigationEvents
                onWillFocus = {() => {
                    fetchParentDetails(email)
                    
                }}
            />
            <FlatList
                data = {children}
                keyExtractor = {(item,studentId) => studentId.toString()}
                renderItem = {({item}) => {
                    console.log(item.profileImagePath)
                    return (
                            <ListItem 
                                leftAvatar = {{source: {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTLFWP81FBdiOkM0isRUC9wlGECx3CenI_WPYa-cuCwz58CGywz&usqp=CAU'}}}
                                title = {item.fullName}
                                underlayColor = 'rgba(224, 224, 224, 1)'
                                titleStyle = {{textAlign: 'right'}} 
                                onPress = {() => navigation.navigate('ChildrenDetails',{fullName: item.fullName, studentId: item.studentId})}
                                containerStyle = {styles.listItemContainer}
                            />
                    
                            
                    
                    )
                }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        height: 100,
        margin: 20,
    }
})

export default ParentHome