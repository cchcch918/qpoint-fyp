import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View,ActivityIndicator,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackScreen from './src/screens/AuthStackScreen'
import StaffBottomTab from './src/screens/StaffBottomTab'
import AsyncStorage from '@react-native-community/async-storage';
import { restoreToken,restoreInfo } from './src/actions/auth';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import qpointApi from './src/api/qpointApi'
import StaffChangePassword from './src/screens/StaffChangePassword'
import StudentActivityEditScreen from './src/screens/StudentActivityEditScreen'
import {theme} from './src/core/theme'
import SelectBehaviourScreen from './src/screens/SelectBehaviourScreen'
import ConfirmBehaviourScreen from './src/screens/ConfirmBehaviourScreen'
import SelectStudentScreen from './src/screens/SelectStudentsScreen'
import TakePhotoScreen from './src/screens/TakePhotoScreen'
import ChangePhotoScreen from './src/screens/ChangePhotoScreen'
import ParentBottomTab from './src/screens/ParentBottomTab'
import ParentActivitiesScreen from './src/screens/ParentActivitiesScreen'
import LeaderboardScreen from './src/screens/LeaderboardScreen'
import NotificationDetailsScreen from './src/screens/NotificationDetailsScreen'
import messaging from '@react-native-firebase/messaging';

const staffStack = createStackNavigator();
const parentStack = createStackNavigator();


const App = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.authReducer)
  // console.log(data)
  const userToken = useSelector(state => state.authReducer.userToken);
  // console.log("token", userToken);
  const loadingState = useSelector(state => state.authReducer.isLoading)
  // console.log('isloading ',loadingState)
  const isStaff = useSelector(state => state.authReducer.isStaff)
  // console.log('isStaff ',isStaff)


  useEffect(()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // It will trigger when app was in quit mode
    messaging().getInitialNotification(remoteMessage => {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
    });

    // If App is in foreground mode
    messaging().onMessage(remoteMessage => {
      console.log('notification in foreground:',remoteMessage.notification);
    });

    const autoSignin = async () => {
      token = await AsyncStorage.getItem('userToken')
      status = await AsyncStorage.getItem('status')
      // console.log('status ',status)
      // console.log('token', token)
      if(status === 'staff'){
        if(token!=null){
          const response = await qpointApi.post(`/${status}/get-admin-account-details`,{token: `Bearer ${token}`});
          // console.log('bearer ',response.data)
          dispatch(restoreInfo(token,response.data,status))
        }else{
          dispatch(restoreToken(token,status))
        }
      }
      if(status === 'parent'){
        if(token!=null){
          const response = await qpointApi.post(`/${status}/get-parent-account-details`,{token: `Bearer ${token}`});
          // console.log('bearer ',response.data)
          dispatch(restoreInfo(token,response.data,status))
        }else{
          dispatch(restoreToken(token,status))
        }
      }
    }
  
    setTimeout(()=>{
      autoSignin()
    },1000)

  },[])


  if(loadingState){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
  }


  if(userToken !== null){
    return(
     <NavigationContainer>
       {isStaff 
       ? 
       (
        <staffStack.Navigator>
          <staffStack.Screen 
            name = "StaffHome" 
            component = {StaffBottomTab}
            options={({ route }) => ({
              headerShown: false
            })} 
          />
          <staffStack.Screen
            name = "StaffChangePassword"
            component = {StaffChangePassword}
          />
          <staffStack.Screen
            name = "StudentActivityEdit"
            component = {StudentActivityEditScreen}
            options = {{
              headerShown: false
            }}
          />
          <staffStack.Screen
            name = "SelectBehaviour"
            component = {SelectBehaviourScreen}
            options = {{
              headerShown: false
            }}
          />
          <staffStack.Screen
            name = "ConfirmBehaviour"
            component = {ConfirmBehaviourScreen}
            options = {{
              headerShown: false
            }}
          />
          <staffStack.Screen
            name = "SelectStudent"
            component = {SelectStudentScreen}
            options = {{
              headerShown: false
            }}
          />
          <staffStack.Screen
            name = "TakePhoto"
            component = {TakePhotoScreen}
            options = {{
              headerShown: false
            }}
          />
           <staffStack.Screen
            name = "ChangePhoto"
            component = {ChangePhotoScreen}
            options = {{
              headerShown: false
            }}
          />
          
        </staffStack.Navigator>
       )
       :
       (
        <parentStack.Navigator>
          <parentStack.Screen 
            name = "ParentHome" 
            component = {ParentBottomTab}
            options={({ route }) => ({
              headerShown: false
            })} 
          />
          <parentStack.Screen 
            name = "ParentActivities" 
            component = {ParentActivitiesScreen}
            options={({ route }) => ({
              headerShown: false
            })} 
          />
          <parentStack.Screen 
            name = "Leaderboard" 
            component = {LeaderboardScreen}
            options={({ route }) => ({
              headerShown: false
            })} 
          />
           <parentStack.Screen 
            name = "NotificationDetails" 
            component = {NotificationDetailsScreen}
            options={({ route }) => ({
              headerShown: false
            })} 
          />
        </parentStack.Navigator>
       )
      }
     </NavigationContainer>
    )
  }else{
    return(
      <NavigationContainer>
        <AuthStackScreen/>
      </NavigationContainer>
    )
  }
  
}

export default App;