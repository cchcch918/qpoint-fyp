import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SigninScreen from './src/Screens/SigninScreen'
import {Provider as AuthProvider} from './src/Context/AuthContext'
import { Provider as PaperProvider } from 'react-native-paper';
import QrScanner from './src/Screens/StaffApp/QrScanner'
import ResolveAuthScreen from './src/Screens/ResolveAuthScreen'
import {setNavigator} from './src/navigationRef'
import StaffAccountScreen from './src/Screens/StaffApp/StaffAccountScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ParentHome from './src/Screens/ParentApp/Home'
import ParentAccountScreen from './src/Screens/ParentApp/ParentAccountScreen'
import changePasswordScreen from './src/Screens/changePasswordScreen'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import BehaviorScreen from './src/Screens/StaffApp/BehaviorScreen'
import FlashMessage from "react-native-flash-message";

console.disableYellowBox = true;

const StaffAccount = createStackNavigator({
  StaffAccountScreen,
  changePasswordScreen
})

//Staff

const StaffBottomTab = createBottomTabNavigator({
  ScanQR:{
    screen: QrScanner,
    navigationOptions: () => ({
      tabBarLabel: 'Scan Qr',
      tabBarIcon: <MaterialCommunityIcons name="qrcode" size={24} color="black" />
    })
  },
  StaffAccount:{
    screen: StaffAccountScreen,
    navigationOptions: () => ({
      tabBarLabel: 'Manage Account',
      tabBarIcon: <MaterialCommunityIcons name='account' size={20}/>
    })
  }
},{
    navigationOptions: ({navigation}) => ({
      headerTitle: getHeaderTitle(navigation)
    }),


    tabBarOptions:{
      activeTintColor: '#e91e63',
    }
})


const getHeaderTitle = (navigation) => {
  const currentIndex = navigation.state.index
  
  if(currentIndex === 0){
     return 'Scan QR'
  } else if (currentIndex === 1) {
      return 'Manage Account'
  }
}

//Parent
const ParentAccount = createStackNavigator({
  ParentAccountScreen,
  changePasswordScreen
})

ParentAccount.navigationOptions = {
  title: 'Manage Account',
  tabBarIcon: <MaterialCommunityIcons name='account' size={20}/>
}



const Switch = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Signin: SigninScreen,
  staffScreen: createStackNavigator({
    StaffBottomTab,
    Behavior: BehaviorScreen
  }),
  parentScreen: createBottomTabNavigator({
    Home: ParentHome,
    ParentAccount
  })
});

const App = createAppContainer(Switch)


export default () => {
  return(
    
        <AuthProvider>
            <PaperProvider>
              <App ref={(navigator)=> { setNavigator(navigator) }} />
              <FlashMessage position="top" />
            </PaperProvider>
        </AuthProvider>
      
  )
}