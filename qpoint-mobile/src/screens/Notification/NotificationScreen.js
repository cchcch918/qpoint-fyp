import React, {useState,useEffect} from 'react'
import {View,FlatList} from 'react-native'
import { ListItem, Icon, Header,Text,SearchBar,Button,Avatar,Image } from 'react-native-elements'
import {theme} from '../../core/theme'
import AwesomeAlert from 'react-native-awesome-alerts';
import qpointApi from '../../api/qpointApi'


const NotificationScreen = ({navigation}) => {
    const [notifications,setNotifications] = useState(null);
    const [allNotificationID,setAllNotificationID] = useState(null)
    const [showAlert,setAlert] = useState(false)

    useEffect(()=>{
        const getNotifications = async () => {
            const response = await qpointApi.post('/notification/show-all-notifications')
            // console.log(response.data)
            setNotifications(response.data)
            setAllNotificationID(response.data.map(item=>item.notificationId))
        }
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('focus')
            getNotifications();
          });

        return unsubscribe
    },[navigation])

    const deleteAllNotifications = async () => {
        const response = await qpointApi.post('/notification/delete-notifications',{notificationsList:allNotificationID})
        // console.log(response.data)
        setNotifications(null)
    }

    return(
        <View style={{flex:1}}>
            <Header
                centerComponent = {
                    <Text style={{fontSize:20,color:'white'}}>Notifications</Text>
                }
                containerStyle = {{height:90, backgroundColor:theme.colors.primary, borderBottomColor:'transparent'}}

                rightComponent = {
                    <Icon 
                        name="trash-can"
                        type = 'material-community'
                        size = {20} 
                        style = {{marginRight: 15}} 
                        onPress = {()=>setAlert(true)}
                        reverse
                        reverseColor = {theme.colors.primary}
                        color = 'white'
                        
                    />
                }
            />
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Delete All Notifications?"
                message="Once you delete all notification, you can't undo it."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No, cancel"
                confirmText="Yes, delete all"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setAlert(false)
                  }}
                onConfirmPressed={() => {
                    setAlert(false)
                    deleteAllNotifications()
                }}
            />
            <FlatList
                data = {notifications}
                keyExtractor = {(item,index)=>index.toString()}
                renderItem = {({item}) => {
                    // console.log(item)
                    return(
                        <ListItem
                            title = {item.notificationTitle}
                            subtitle = {item.notificationMessage}
                            containerStyle = {{margin:10,borderRadius:20,shadowColor: "#000", elevation: 2, }}
                            onPress = {()=>navigation.navigate('NotificationDetails',{notification:item})}
                        />
                    )
                }}
            />
        </View>
    )
}

export default NotificationScreen