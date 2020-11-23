import React , {useState,useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import { ListItem, Icon, Header,Text,SearchBar,Button,Avatar,Image, } from 'react-native-elements'
import {theme} from '../core/theme'
import qpointApi from '../api/qpointApi'
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from 'moment'

const NotificationDetailsScreen = ({navigation,route}) => {
    const {notification} = route.params;
    console.log(notification.dateCreated)
    const [showAlert,setAlert] = useState(false)

    const deleteNotifications = async () => {
        const response = await qpointApi.post('/notification/delete-notifications',{notificationsList:[notification.notificationId]})
        // console.log(response.data)
        navigation.goBack();
    }

    return(
        <View style={{flex:1, backgroundColor:'white'}}>
            <Header
                leftComponent = {
                    <Icon
                        name = 'arrow-left'
                        type = 'material-community'
                        size = {30}
                        iconStyle = {{color:'white'}}
                        onPress = {()=> navigation.goBack() }
                    />
                }
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
                
                containerStyle = {{height:100, backgroundColor:theme.colors.primary}}
            />
            <View style={{padding:24,alignItems:'center'}}> 
                <Text h4 h4Style={{fontWeight:'normal'}}>{notification.notificationTitle}</Text>
                <Text style={{fontSize:12}}>{moment(notification.dateCreated).format("dddd, MMM DD HH:mm a")}</Text>
            </View>
            <View style={{paddingHorizontal:24}}>
                <Text>{notification.notificationMessage}</Text>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Delete Notification?"
                message="Once you delete this notification, you can't undo it."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No, cancel"
                confirmText="Yes, delete it"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setAlert(false)
                  }}
                onConfirmPressed={() => {
                    setAlert(false)
                    deleteNotifications()
                }}
            />
        </View>
    )
}

export default NotificationDetailsScreen