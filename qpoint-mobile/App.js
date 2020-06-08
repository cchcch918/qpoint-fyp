import React from 'react'
import {TouchableOpacity} from 'react-native'
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
import SelectStudent from './src/Screens/StaffApp/SelectStudent'
import { FontAwesome5 } from '@expo/vector-icons'; 
import {Provider as ProcessFlowProvider} from './src/Context/ProcessFlowContext'
import SummaryScreen from './src/Screens/StaffApp/SummaryScreen'
import { FontAwesome } from '@expo/vector-icons'; 
import ChildrenDetails from './src/Screens/ParentApp/ChildrenDetails'

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
      headerTitle: getStaffHeaderTitle(navigation),
      headerStyle: {
        backgroundColor: '#ffe6cc',
      },
      
    }),
    tabBarOptions:{
      activeTintColor: '#e91e63',
    }
})


const getStaffHeaderTitle = (navigation) => {
  const currentIndex = navigation.state.index
  
  if(currentIndex === 0){
     return 'Scan QR'
  } else if (currentIndex === 1) {
      return 'Manage Account'
  }
}

//Parent
const getParentHeaderTitle = (navigation) => {
  const currentIndex = navigation.state.index
  
  if(currentIndex === 0){
     return 'Parent Home'
  } else if (currentIndex === 1) {
      return 'Manage Account'
  }
}

const ParentBottomTab = createBottomTabNavigator ({
  Home:{
    screen: ParentHome,
    navigationOptions: () => ({
      tabBarLabel: 'Home',
      tabBarIcon: <FontAwesome name="home" size={24} color="black" />
    })
  },
  ParentAccount:{
    screen: ParentAccountScreen,
    navigationOptions: () => ({
      tabBarLabel: 'Account',
      tabBarIcon: <MaterialCommunityIcons name='account' size={20}/>
    })
  }
},{
  navigationOptions: ({navigation}) => ({
    headerTitle: getParentHeaderTitle(navigation),
    headerStyle: {
      backgroundColor: '#ffe6cc',
    },
  }),
  tabBarOptions:{
    activeTintColor: '#e91e63',
  }

})

const Switch = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Signin: SigninScreen,
  staffScreen: createStackNavigator({
    StaffBottomTab,
    Behavior: BehaviorScreen,
    ManualSelect: SelectStudent,
    Summary: SummaryScreen,
    changePassword: changePasswordScreen
  }),
  parentScreen: createStackNavigator({
    ParentBottomTab,
    changePassword: changePasswordScreen,
    ChildrenDetails
  })
});

const App = createAppContainer(Switch)


export default () => {
  return(
        <ProcessFlowProvider>
          <AuthProvider>
              <PaperProvider>
                <App ref={(navigator)=> { setNavigator(navigator) }} />
                <FlashMessage position="top" />
              </PaperProvider>
          </AuthProvider>
        </ProcessFlowProvider>
      
  )
}